import { Fish, ClipboardList, Gem, Anchor, LayoutDashboard } from "lucide-react";

export type TabId = "overview" | "fish" | "pursuits" | "collectibles" | "upgrades";

interface TabBarProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-[22px] h-[22px]" /> },
  { id: "fish", label: "Fish", icon: <Fish className="w-[22px] h-[22px]" /> },
  { id: "pursuits", label: "Pursuits", icon: <ClipboardList className="w-[22px] h-[22px]" /> },
  { id: "collectibles", label: "Items", icon: <Gem className="w-[22px] h-[22px]" /> },
  { id: "upgrades", label: "Upgrades", icon: <Anchor className="w-[22px] h-[22px]" /> },
];

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-tab z-50" style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}>
      <div className="flex justify-around items-end h-14 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex flex-col items-center gap-0.5 px-3 pt-1.5 pb-1 relative ios-spring active:scale-90"
            >
              <div className={`relative transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {tab.icon}
                {isActive && (
                  <div className="absolute -inset-2 rounded-full bg-primary/10 blur-md -z-10" />
                )}
              </div>
              <span className={`text-[10px] font-medium transition-colors duration-200 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
