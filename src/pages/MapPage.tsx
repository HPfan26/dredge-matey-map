import { useState } from "react";
import { Filter, X } from "lucide-react";

const filterGroups = [
  {
    label: "Pursuits",
    items: ["Main", "Side", "The Pale Reach", "The Iron Rig"],
  },
  {
    label: "Locations",
    items: ["Docks", "Shipwrecks", "Shrine Puzzles", "Fathomless Flame Shrines", "Old Mayor Camps"],
  },
  {
    label: "Resources",
    items: ["Cloth", "Refined Metal", "Lumber", "Research Parts", "Metal Scrap"],
  },
  {
    label: "Collectibles",
    items: ["Notes", "Books", "Relics", "Dog Tags", "Exotic Fish", "Stone Tablets"],
  },
];

export default function MapPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const toggleFilter = (item: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const clearFilters = () => setActiveFilters(new Set());

  return (
    <div className="relative w-full h-full flex-1 overflow-hidden">
      {/* Map container */}
      <div className="w-full h-full overflow-auto">
        <img
          src="/assets/dredge-map.png"
          alt="Dredge game map"
          className="w-full min-h-full object-contain"
          draggable={false}
        />
      </div>

      {/* Filter button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="absolute top-4 right-4 z-20 glass-pill rounded-full p-3 active:scale-90 ios-spring"
        style={{ marginTop: "env(safe-area-inset-top, 0px)" }}
      >
        <Filter className="w-5 h-5 text-primary" />
      </button>

      {/* Filter panel - full overlay, no scroll */}
      {showFilters && (
        <div className="absolute inset-0 z-30 bg-background/80 backdrop-blur-xl flex flex-col">
          <div className="max-w-lg mx-auto px-5 py-4 flex-1 flex flex-col" style={{ paddingTop: "calc(env(safe-area-inset-top, 8px) + 12px)" }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-foreground">Map Filters</h2>
              <button onClick={() => setShowFilters(false)} className="p-2 rounded-full active:bg-secondary/30">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {activeFilters.size > 0 && (
              <button onClick={clearFilters} className="text-[13px] text-primary font-medium mb-2">
                Clear all filters
              </button>
            )}

            <div className="space-y-3">
              {filterGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{group.label}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => {
                      const active = activeFilters.has(item);
                      return (
                        <button
                          key={item}
                          onClick={() => toggleFilter(item)}
                          className={`px-2.5 py-1 rounded-full text-[12px] font-medium transition-all ios-spring active:scale-95 ${
                            active
                              ? "bg-primary text-primary-foreground"
                              : "glass-pill text-foreground"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
