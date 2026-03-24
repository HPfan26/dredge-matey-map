import { Fish, ClipboardList, BookOpen, Trophy, LayoutDashboard } from "lucide-react";

export type TabId = "overview" | "fish" | "pursuits" | "collectibles" | "achievements";

interface TabBarProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-[22px] h-[22px]" /> },
  { id: "fish", label: "Fish", icon: <Fish className="w-[22px] h-[22px]" /> },
  { id: "pursuits", label: "Pursuits", icon: <ClipboardList className="w-[22px] h-[22px]" /> },
  { id: "collectibles", label: "Items", icon: <BookOpen className="w-[22px] h-[22px]" /> },
  { id: "achievements", label: "Trophies", icon: <Trophy className="w-[22px] h-[22px]" /> },
];

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center" style={{ paddingBottom: "max(env(safe-area-inset-bottom, 12px), 12px)" }}>
      <nav
        className="flex items-center gap-1 px-3 py-2 rounded-full"
        style={{
          background: "linear-gradient(135deg, hsla(220, 20%, 18%, 0.55), hsla(220, 20%, 12%, 0.45))",
          backdropFilter: "blur(50px) saturate(2.2) brightness(1.1)",
          WebkitBackdropFilter: "blur(50px) saturate(2.2) brightness(1.1)",
          border: "1px solid hsla(220, 15%, 35%, 0.35)",
          boxShadow: "inset 0 1px 0 0 hsla(0, 0%, 100%, 0.08), inset 0 -0.5px 0 0 hsla(0, 0%, 0%, 0.1), 0 8px 40px -8px hsla(0, 0%, 0%, 0.5), 0 2px 12px -2px hsla(0, 0%, 0%, 0.3)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-full ios-spring active:scale-90 transition-all duration-200"
              style={isActive ? {
                background: "hsla(var(--primary), 0.15)",
                boxShadow: "inset 0 0.5px 0 0 hsla(0, 0%, 100%, 0.1)",
              } : {}}
            >
              <div className={`transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {tab.icon}
              </div>
              <span className={`text-[9px] font-semibold transition-colors duration-200 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
