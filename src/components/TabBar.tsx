import { Fish, ClipboardList, Gem, Anchor, LayoutDashboard } from "lucide-react";

export type TabId = "overview" | "fish" | "pursuits" | "collectibles" | "upgrades";

interface TabBarProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: "fish", label: "Fish", icon: <Fish className="w-5 h-5" /> },
  { id: "pursuits", label: "Pursuits", icon: <ClipboardList className="w-5 h-5" /> },
  { id: "collectibles", label: "Items", icon: <Gem className="w-5 h-5" /> },
  { id: "upgrades", label: "Upgrades", icon: <Anchor className="w-5 h-5" /> },
];

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
              active === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon}
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
