import type { VehicleModel, VehicleSpecs } from "@/data/vehicle-models";

/**
 * Bulk import of the client's technical specification sheet.
 *
 * The sheet is maintained in Excel / Google Sheets with one row per model:
 *
 *   Vehicle Type | OEM | Model | Engine / Displacement | Max Power |
 *   Max Torque | Transmission | GVW / Payload / Key Weight
 *
 * Copying those cells and pasting them into the import box gives tab-separated
 * text; saving the sheet as CSV gives comma-separated text with quoted cells.
 * Both are accepted, and so is any column order — the header row is matched by
 * name. A sheet pasted without its header row falls back to the column order
 * above, which is the order the client's sheet uses.
 *
 * Nothing here writes: parsing produces rows, the admin matches them against
 * the schedule and shows what would change, and only then does a save happen.
 */

/** Fields a sheet column can map onto. */
type Column = "segment" | "oem" | "model" | keyof VehicleSpecs;

export type SpecSheetRow = {
  /** 1-based line number in the pasted text, for error messages. */
  line: number;
  oem: string;
  model: string;
  segment?: string;
  specs: VehicleSpecs;
};

export type SpecSheetParse = {
  rows: SpecSheetRow[];
  /** Problems with individual lines. The rest of the sheet still imports. */
  errors: string[];
  /** True when a header row was recognised rather than assumed. */
  headerFound: boolean;
};

/** Header labels, normalised to letters and digits, in priority order. */
const HEADER_RULES: { match: (header: string) => boolean; column: Column }[] = [
  { match: (h) => h.includes("vehicletype") || h === "type" || h === "segment", column: "segment" },
  { match: (h) => h === "oem" || h.includes("make") || h.includes("brand"), column: "oem" },
  { match: (h) => h === "model" || h.includes("modelname"), column: "model" },
  { match: (h) => h.includes("engine") || h.includes("displacement"), column: "engine" },
  { match: (h) => h.includes("power"), column: "maxPower" },
  { match: (h) => h.includes("torque"), column: "maxTorque" },
  { match: (h) => h.includes("transmission") || h.includes("gearbox"), column: "transmission" },
  { match: (h) => h.includes("gvw") || h.includes("payload") || h.includes("weight"), column: "weights" },
];

/** Column order of the client's sheet, used when there is no header row. */
const POSITIONAL: Column[] = [
  "segment",
  "oem",
  "model",
  "engine",
  "maxPower",
  "maxTorque",
  "transmission",
  "weights",
];

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

function headerColumn(header: string): Column | null {
  const key = normalise(header);
  if (!key) return null;
  return HEADER_RULES.find((rule) => rule.match(key))?.column ?? null;
}

/**
 * Split one line into cells. Handles quoted CSV cells (including doubled
 * quotes inside them); tab-separated text needs none of that but costs nothing
 * to run through the same path.
 */
function splitLine(line: string, delimiter: string): string[] {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (quoted) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"' && !cell.trim()) {
      quoted = true;
    } else if (char === delimiter) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += char;
    }
  }

  cells.push(cell.trim());
  return cells;
}

export function parseSpecSheet(text: string): SpecSheetParse {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.trim().length > 0);

  if (!lines.length) return { rows: [], errors: [], headerFound: false };

  // Tabs win: a pasted spreadsheet is tab-separated, and its cells routinely
  // contain commas ("103 kW / 140 PS @ 4,000 rpm").
  const delimiter = lines.some((line) => line.includes("\t")) ? "\t" : ",";
  const table = lines.map((line) => splitLine(line, delimiter));

  const headerCells = table[0] ?? [];
  const mapped = headerCells.map(headerColumn);
  const headerFound = mapped.includes("oem") && mapped.includes("model");

  const columns = headerFound ? mapped : headerCells.map((_, index) => POSITIONAL[index] ?? null);
  const body = headerFound ? table.slice(1) : table;
  const firstBodyLine = headerFound ? 2 : 1;

  const rows: SpecSheetRow[] = [];
  const errors: string[] = [];

  body.forEach((cells, index) => {
    const line = firstBodyLine + index;
    const picked: Partial<Record<Column, string>> = {};

    cells.forEach((cellValue, cellIndex) => {
      const column = columns[cellIndex];
      if (column && cellValue) picked[column] = cellValue;
    });

    if (!picked.oem || !picked.model) {
      errors.push(`Line ${line}: skipped — it has no OEM and model to match on.`);
      return;
    }

    rows.push({
      line,
      oem: picked.oem,
      model: picked.model,
      segment: picked.segment,
      specs: {
        engine: picked.engine,
        maxPower: picked.maxPower,
        maxTorque: picked.maxTorque,
        transmission: picked.transmission,
        weights: picked.weights,
      },
    });
  });

  return { rows, errors, headerFound };
}

export type SpecMatch = {
  model: VehicleModel;
  /** True when the names differ and the row was matched on a variant name. */
  approximate: boolean;
};

/**
 * Find the schedule entry a sheet row refers to.
 *
 * Matching is on OEM and model together, ignoring case, spacing and
 * punctuation, so an en dash in the sheet and a hyphen in the schedule are the
 * same name. Failing that, the sheet's name is allowed to be a longer variant
 * of a schedule name from the same OEM — the sheet says "Ultra T.7 - Export"
 * where the schedule says "Ultra T.7". That is reported as an approximate
 * match, and only accepted when exactly one model could be meant.
 *
 * A row that matches nothing is reported rather than creating a model: a spec
 * sheet carries none of the parts, markets or photograph a model page needs,
 * so new models are added through the form.
 */
export function matchSpecRow(models: VehicleModel[], row: SpecSheetRow): SpecMatch | null {
  const fullName = normalise(`${row.oem} ${row.model}`);
  const modelName = normalise(row.model);

  const exact =
    models.find((item) => normalise(`${item.oem} ${item.model}`) === fullName) ??
    models.find((item) => normalise(item.model) === modelName);
  if (exact) return { model: exact, approximate: false };

  const oem = normalise(row.oem);
  const variants = models.filter((item) => {
    if (normalise(item.oem) !== oem) return false;
    const candidate = normalise(item.model);
    return candidate.startsWith(modelName) || modelName.startsWith(candidate);
  });

  // Two candidates means the sheet name is genuinely ambiguous — say so
  // rather than writing the specification onto a guess.
  return variants.length === 1 ? { model: variants[0]!, approximate: true } : null;
}

/** True when applying this row would leave the model's specs unchanged. */
export function specsEqual(a: VehicleSpecs | undefined, b: VehicleSpecs) {
  const keys: (keyof VehicleSpecs)[] = [
    "engine",
    "maxPower",
    "maxTorque",
    "transmission",
    "weights",
  ];
  return keys.every((key) => (a?.[key] ?? "") === (b[key] ?? ""));
}
