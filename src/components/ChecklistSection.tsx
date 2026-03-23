import { useState } from "react";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import type { ChecklistItem } from "@/data/dredgeData";

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
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-surface hover:bg-secondary transition-colors"
      >
        <span className="text-lg">{icon}</span>
        <span className="font-medium text-surface-foreground flex-1 text-left">{title}</span>
        <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
          progress.percent === 100
            ? "bg-completion/20 text-completion"
            : "bg-muted text-muted-foreground"
        }`}>
          {progress.done}/{progress.total}
        </span>
        {open ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {open && (
        <div className="divide-y divide-border">
          {items.map((item) => {
            const checked = isChecked(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left ${
                  checked
                    ? "bg-completion/5"
                    : "hover:bg-muted/50"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    checked
                      ? "bg-completion border-completion animate-check-pop"
                      : "border-muted-foreground/40"
                  }`}
                >
                  {checked && <Check className="w-3 h-3 text-completion-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-sm ${
                      checked ? "line-through text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.description && (
                    <span className={`text-xs ml-2 ${
                      item.category === "aberration" ? "text-destructive" : "text-muted-foreground"
                    }`}>
                      {item.description}
                    </span>
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
