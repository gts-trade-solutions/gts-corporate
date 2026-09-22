import { componentSetIds, vehicleModelGroups } from "@/data/vehicle-models";

/** Select options for the two fields that are closed sets. */

export const groupOptions = vehicleModelGroups.map((group) => ({
  value: group.id,
  label: group.title,
}));

const COMPONENT_LABELS: Record<(typeof componentSetIds)[number], string> = {
  commercial: "Commercial vehicle components",
  passenger: "Passenger car components",
  motorcycle: "Motorcycle components",
  "three-wheeler": "Three-wheeler components",
};

export const componentOptions = componentSetIds.map((id) => ({
  value: id,
  label: COMPONENT_LABELS[id],
}));
