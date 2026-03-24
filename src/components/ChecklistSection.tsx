import { useState } from "react";
import { ChevronRight, Check } from "lucide-react";

interface ChecklistItem {
  id: string;
  name: string;
  description?: string;
  category?: string;
  region?: string;
}

interface ChecklistSectionProps {
  title: string;
  icon: string;
  items: ChecklistItem[];
  isChecked: (id: string) => boolean;
  toggle: (id: string) => void;
  progress: { done: number; total: number; percent: number };
}

export function ChecklistSection({ title, icon, items, isChecked, toggle, progress }: ChecklistSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-secondary/30 transition-colors"
      >
        <span className="text-lg">{icon}</span>
        <span className="font-semibold text-[15px] text-foreground flex-1 text-left">{title}</span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          progress.percent === 100
            ? "bg-completion/20 text-completion"
            : "glass-pill text-muted-foreground"
        }`}>
          {progress.done}/{progress.total}
        </span>
        <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-border/50">
          {items.map((item, idx) => {
            const checked = isChecked(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 transition-all active:bg-secondary/20 text-left ${
                  idx < items.length - 1 ? "border-b border-border/30" : ""
                }`}
              >
                <div
                  className={`w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    checked
                      ? "bg-primary ios-spring scale-100"
                      : "border-2 border-muted-foreground/30"
                  }`}
                >
                  {checked && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[15px] leading-tight transition-colors duration-200 ${
                    checked ? "text-muted-foreground line-through" : "text-foreground"
                  }`}>
                    {item.name}
                  </p>
                  {item.description && (
                    <p className="text-[12px] text-muted-foreground mt-0.5 leading-tight">
                      {item.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
