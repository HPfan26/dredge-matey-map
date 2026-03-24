export interface ChecklistItem {
  id: string;
  name: string;
  category?: string;
  region?: string;
  description?: string;
}

export const pursuitsData = {
  id: "pursuits",
  name: "Pursuits",
  icon: "📋",
  items: [
    { id: "p1", name: "Best Catch", description: "Catch a trophy fish" },
    { id: "p2", name: "Research Assistant", description: "Complete research for the Collector" },
    { id: "p3", name: "Hermit's Request", description: "Help the hermit" },
    { id: "p4", name: "Lost at Sea", description: "Find lost items" },
    { id: "p5", name: "Book of Astral Symbols", description: "Collect all symbols" },
    { id: "p6", name: "The Pale Reach", description: "Explore the frozen expanse" },
    { id: "p7", name: "What Lies Below", description: "Discover the deep secrets" },
    { id: "p8", name: "A Fish Called Steroids", description: "Catch an aberration" },
    { id: "p9", name: "The Iron Rig", description: "Visit the Iron Rig" },
    { id: "p10", name: "Mushroom Research", description: "Collect mushroom samples" },
    { id: "p11", name: "Doomed Expedition", description: "Follow the expedition trail" },
    { id: "p12", name: "Photography", description: "Photograph unique species" },
    { id: "p13", name: "Grotesque Fish", description: "Catch all aberrations" },
    { id: "p14", name: "Explorer", description: "Discover all locations" },
    { id: "p15", name: "Rock Slab Collector", description: "Find all rock slabs" },
  ] as ChecklistItem[],
};
