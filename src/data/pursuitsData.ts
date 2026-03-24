export interface PursuitItem {
  id: string;
  name: string;
  type: string;
  dlc: string;
  order: number;
  region: string;
  notes: string;
}

import pursuitsRaw from "./pursuitsData.json";

export const allPursuits: PursuitItem[] = pursuitsRaw as PursuitItem[];

export const pursuitCategories = ["Main", "Side", "The Pale Reach", "The Iron Rig"] as const;

export function getPursuitsByCategory(category: string): PursuitItem[] {
  if (category === "Main") {
    return allPursuits.filter((p) => p.type === "Main" && p.dlc === "Base game").sort((a, b) => a.order - b.order);
  }
  if (category === "Side") {
    return allPursuits.filter((p) => p.type === "Side" && p.dlc === "Base game").sort((a, b) => a.order - b.order);
  }
  if (category === "The Pale Reach") {
    return allPursuits.filter((p) => p.dlc === "The Pale Reach").sort((a, b) => a.order - b.order);
  }
  if (category === "The Iron Rig") {
    return allPursuits.filter((p) => p.dlc === "The Iron Rig").sort((a, b) => a.order - b.order);
  }
  return [];
}

export const pursuitCategoryIcons: Record<string, string> = {
  "Main": "⚓",
  "Side": "📋",
  "The Pale Reach": "❄️",
  "The Iron Rig": "⚙️",
};
