export interface ChecklistItem {
  id: string;
  name: string;
  category?: string;
  region?: string;
  description?: string;
}

export interface ChecklistCategory {
  id: string;
  name: string;
  icon: string;
  items: ChecklistItem[];
}

export const fishData: ChecklistCategory[] = [
  {
    id: "marrows",
    name: "The Marrows",
    icon: "🏠",
    items: [
      { id: "m1", name: "Cod", description: "Coastal" },
      { id: "m2", name: "Mackerel", description: "Coastal" },
      { id: "m3", name: "Flounder", description: "Shallow" },
      { id: "m4", name: "Perch", description: "Shallow" },
      { id: "m5", name: "Bass", description: "Coastal" },
      { id: "m6", name: "Herring", description: "Coastal" },
      { id: "m7", name: "Eel", description: "Mangrove" },
      { id: "m8", name: "Catfish", description: "Shallow" },
      { id: "m9", name: "Crab", description: "Hadal" },
      { id: "m10", name: "Squid", description: "Oceanic" },
      { id: "m_ab1", name: "Fanged Cod", description: "Aberration", category: "aberration" },
      { id: "m_ab2", name: "Bristlemouth", description: "Aberration", category: "aberration" },
      { id: "m_ab3", name: "All-Seeing Flounder", description: "Aberration", category: "aberration" },
      { id: "m_ab4", name: "Grotesque Mackerel", description: "Aberration", category: "aberration" },
    ],
  },
  {
    id: "gale-cliffs",
    name: "Gale Cliffs",
    icon: "🌊",
    items: [
      { id: "g1", name: "Salmon", description: "Coastal" },
      { id: "g2", name: "Tuna", description: "Oceanic" },
      { id: "g3", name: "Swordfish", description: "Oceanic" },
      { id: "g4", name: "Sailfish", description: "Oceanic" },
      { id: "g5", name: "Blue Crab", description: "Hadal" },
      { id: "g6", name: "Rock Fish", description: "Volcanic" },
      { id: "g7", name: "Hammerhead Shark", description: "Oceanic" },
      { id: "g8", name: "Blackmouth Shark", description: "Oceanic" },
      { id: "g_ab1", name: "Tusked Salmon", description: "Aberration", category: "aberration" },
      { id: "g_ab2", name: "Cyclopean Tuna", description: "Aberration", category: "aberration" },
      { id: "g_ab3", name: "Withered Sailfish", description: "Aberration", category: "aberration" },
    ],
  },
  {
    id: "stellar-basin",
    name: "Stellar Basin",
    icon: "⭐",
    items: [
      { id: "s1", name: "Conger Eel", description: "Mangrove" },
      { id: "s2", name: "Moray Eel", description: "Mangrove" },
      { id: "s3", name: "Pufferfish", description: "Shallow" },
      { id: "s4", name: "Stingray", description: "Shallow" },
      { id: "s5", name: "Barracuda", description: "Oceanic" },
      { id: "s6", name: "Jellyfish", description: "Oceanic" },
      { id: "s7", name: "Anglerfish", description: "Hadal" },
      { id: "s8", name: "Stargazer", description: "Hadal" },
      { id: "s_ab1", name: "Thorned Conger", description: "Aberration", category: "aberration" },
      { id: "s_ab2", name: "Infernal Eel", description: "Aberration", category: "aberration" },
      { id: "s_ab3", name: "Bloated Pufferfish", description: "Aberration", category: "aberration" },
    ],
  },
  {
    id: "twisted-strand",
    name: "Twisted Strand",
    icon: "🌿",
    items: [
      { id: "t1", name: "Piranha", description: "Mangrove" },
      { id: "t2", name: "Arapaima", description: "Mangrove" },
      { id: "t3", name: "Electric Eel", description: "Mangrove" },
      { id: "t4", name: "Arowana", description: "Mangrove" },
      { id: "t5", name: "Snapping Turtle", description: "Shallow" },
      { id: "t6", name: "Mudskipper", description: "Shallow" },
      { id: "t7", name: "Giant Catfish", description: "Hadal" },
      { id: "t8", name: "Paddlefish", description: "Hadal" },
      { id: "t_ab1", name: "Ravenous Piranha", description: "Aberration", category: "aberration" },
      { id: "t_ab2", name: "Colossal Arapaima", description: "Aberration", category: "aberration" },
      { id: "t_ab3", name: "Voltaic Eel", description: "Aberration", category: "aberration" },
    ],
  },
  {
    id: "devils-spine",
    name: "Devil's Spine",
    icon: "🔥",
    items: [
      { id: "d1", name: "Viperfish", description: "Hadal" },
      { id: "d2", name: "Gulper Eel", description: "Hadal" },
      { id: "d3", name: "Fangtooth", description: "Hadal" },
      { id: "d4", name: "Dragonfish", description: "Hadal" },
      { id: "d5", name: "Oarfish", description: "Abyssal" },
      { id: "d6", name: "Giant Isopod", description: "Abyssal" },
      { id: "d7", name: "Barrel Eye", description: "Abyssal" },
      { id: "d8", name: "Coelacanth", description: "Abyssal" },
      { id: "d_ab1", name: "Maw Viperfish", description: "Aberration", category: "aberration" },
      { id: "d_ab2", name: "Devouring Gulper", description: "Aberration", category: "aberration" },
      { id: "d_ab3", name: "Abyssal Dragonfish", description: "Aberration", category: "aberration" },
    ],
  },
];

export const pursuitsData: ChecklistCategory = {
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
  ],
};

export const collectiblesData: ChecklistCategory[] = [
  {
    id: "messages",
    name: "Messages in Bottles",
    icon: "🍾",
    items: Array.from({ length: 12 }, (_, i) => ({
      id: `msg${i + 1}`,
      name: `Message #${i + 1}`,
      description: "Found at sea",
    })),
  },
  {
    id: "relics",
    name: "Relics",
    icon: "🏺",
    items: [
      { id: "r1", name: "Ornate Key" },
      { id: "r2", name: "Rusted Music Box" },
      { id: "r3", name: "Tattered Banner" },
      { id: "r4", name: "Jeweled Goblet" },
      { id: "r5", name: "Ancient Compass" },
      { id: "r6", name: "Carved Figurehead" },
      { id: "r7", name: "Cracked Spyglass" },
      { id: "r8", name: "Faded Locket" },
    ],
  },
  {
    id: "research",
    name: "Research Parts",
    icon: "🔬",
    items: Array.from({ length: 8 }, (_, i) => ({
      id: `rp${i + 1}`,
      name: `Research Part #${i + 1}`,
    })),
  },
  {
    id: "rock-slabs",
    name: "Rock Slabs",
    icon: "🪨",
    items: Array.from({ length: 6 }, (_, i) => ({
      id: `rs${i + 1}`,
      name: `Rock Slab #${i + 1}`,
    })),
  },
];

export const upgradesData: ChecklistCategory = {
  id: "upgrades",
  name: "Boat Upgrades",
  icon: "⚓",
  items: [
    { id: "u1", name: "Rod - Improved", category: "Fishing" },
    { id: "u2", name: "Rod - Advanced", category: "Fishing" },
    { id: "u3", name: "Rod - Oceanic", category: "Fishing" },
    { id: "u4", name: "Rod - Hadal", category: "Fishing" },
    { id: "u5", name: "Rod - Abyssal", category: "Fishing" },
    { id: "u6", name: "Engine - Improved", category: "Engine" },
    { id: "u7", name: "Engine - Advanced", category: "Engine" },
    { id: "u8", name: "Engine - Fastest", category: "Engine" },
    { id: "u9", name: "Hull - Reinforced", category: "Hull" },
    { id: "u10", name: "Hull - Ironclad", category: "Hull" },
    { id: "u11", name: "Light - Improved", category: "Light" },
    { id: "u12", name: "Light - Advanced", category: "Light" },
    { id: "u13", name: "Light - Blazing", category: "Light" },
    { id: "u14", name: "Net - Trawl", category: "Net" },
    { id: "u15", name: "Net - Large Trawl", category: "Net" },
    { id: "u16", name: "Crab Pot - Improved", category: "Pot" },
    { id: "u17", name: "Crab Pot - Advanced", category: "Pot" },
  ],
};
