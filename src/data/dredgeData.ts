// Types
export interface FishItem {
  id: string;
  name: string;
  region: string;
  aberrant: boolean;
  time: string;
  location_type: string;
  exotic: boolean;
  dlc: string | null;
  image: string;
  price?: number;
  variant_of?: string;
}

export interface AchievementItem {
  id: string;
  name: string;
  description: string;
  order: number;
  category: string;
  difficulty: string;
  icon: string;
  level: string;
}

export interface CollectibleItem {
  id: string;
  name: string;
  category: "book" | "note";
  region: string;
  location: string | null;
  dlc: string;
  buff: string | null;
  how_to_unlock: string | null;
  spoiler: boolean;
}

// Import JSON data
import fishDataRaw from "./fishData.json";
import achievementsDataRaw from "./achievementsData.json";
import collectiblesDataRaw from "./collectiblesData.json";

export const allFish: FishItem[] = fishDataRaw as FishItem[];
export const allAchievements: AchievementItem[] = achievementsDataRaw as AchievementItem[];
export const allCollectibles: CollectibleItem[] = collectiblesDataRaw as CollectibleItem[];

// Fish grouped by region
export const fishRegions = [
  "The Marrows",
  "Gale Cliffs",
  "Twisted Strand",
  "Stellar Basin",
  "Devil's Spine",
  "The Ocean",
  "The Pale Reach",
] as const;

export const regionIcons: Record<string, string> = {
  "The Marrows": "🏠",
  "Gale Cliffs": "🌊",
  "Twisted Strand": "🌿",
  "Stellar Basin": "⭐",
  "Devil's Spine": "🔥",
  "The Ocean": "🌐",
  "The Pale Reach": "❄️",
};

export function getFishByRegion(region: string): FishItem[] {
  return allFish.filter((f) => f.region === region);
}

// Collectibles split
export const books = allCollectibles.filter((c) => c.category === "book");
export const notes = allCollectibles.filter((c) => c.category === "note");

// Achievement categories
export const achievementCategories = ["Base game", "The Pale Reach", "The Iron Rig"] as const;

export function getAchievementsByCategory(category: string): AchievementItem[] {
  return allAchievements.filter((a) => a.category === category);
}
