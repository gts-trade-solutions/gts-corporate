import type { VehicleModel } from "../vehicle-models";
import { agriculturalEquipment } from "./agricultural-equipment";
import { buses } from "./buses";
import { commercialVehicles } from "./commercial-vehicles";
import { constructionEquipment } from "./construction-equipment";
import { electricVehicles } from "./electric-vehicles";
import { passengerVehicles } from "./passenger-vehicles";
import { specialPurposeVehicles } from "./special-purpose-vehicles";
import { threeWheelers } from "./three-wheelers";
import { twoWheelers } from "./two-wheelers";
import { segmentPath, type VehicleSegment } from "./types";

/**
 * The vehicle-segment pages: /import-export/vehicle-trade/<id>, one per
 * category on the Vehicle Trade page, with one file per category here.
 *
 * Each page explains its category type by type: what the type is for, how it
 * is built, the figures that matter when specifying one, what it is used for,
 * and the models in the export schedule that belong to it.
 *
 * Content rules, as for the rest of the site:
 *   - Nothing here claims stock, an OEM appointment or an approval. Figures
 *     are typical ranges for the class, hedged as such. The only exact
 *     figures are the ones the client recorded for a model in its spec sheet
 *     (see `specs` in vehicle-models.ts), and they name that model.
 *   - The photographs illustrate each type in service in India and in export
 *     markets. They are not GTS shipments, and the pages say so.
 *
 * Photographs. The type photographs and most banners come from Wikimedia
 * Commons. Most are CC BY or CC BY-SA, which require the photographer and the
 * licence to be shown with the picture, so every one carries a `credit` (or,
 * for a banner, `heroCredit`) that the page prints. Replace one with a GTS
 * photograph and drop its credit. Catalogue cut-outs (`fit: "contain"`) are
 * the client's own and carry none.
 */

export * from "./types";

/** In the order of the categories on the Vehicle Trade page. */
export const vehicleSegments: VehicleSegment[] = [
  passengerVehicles,
  twoWheelers,
  threeWheelers,
  commercialVehicles,
  buses,
  electricVehicles,
  specialPurposeVehicles,
  agriculturalEquipment,
  constructionEquipment,
];

export const findVehicleSegment = (id: string) => vehicleSegments.find((segment) => segment.id === id);

export const vehicleSegmentHref = segmentPath;

/**
 * The schedule's models for each type of a segment. A model goes under the
 * first type that accepts it, so it is listed once per page.
 */
export function modelsByType(segment: VehicleSegment, models: VehicleModel[]) {
  const byType = new Map<string, VehicleModel[]>(segment.types.map((type) => [type.id, []]));
  for (const model of models) {
    const name = `${model.oem} ${model.model}`;
    const type = segment.types.find((candidate) => {
      const groups = candidate.groups ?? (segment.group ? [segment.group] : []);
      if (!groups.includes(model.group)) return false;
      const matched = candidate.match?.test(model.segment) || candidate.matchName?.test(name);
      const vetoed = candidate.exclude?.test(model.segment) || candidate.exclude?.test(name);
      return Boolean(matched) && !vetoed;
    });
    if (type) byType.get(type.id)!.push(model);
  }
  return byType;
}
