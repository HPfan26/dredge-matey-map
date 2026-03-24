import { Check } from "lucide-react";
import type { AchievementItem as AchievementType } from "@/data/dredgeData";

interface AchievementItemProps {
  achievement: AchievementType;
  checked: boolean;
  onToggle: () => void;
}

const levelColors: Record<string, string> = {
  Platinum: "text-foreground",
  Gold: "text-yellow-400",
  Silver: "text-muted-foreground",
  Bronze: "text-orange-400",
};

export function AchievementCard({ achievement, checked, onToggle }: AchievementItemProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-3 px-4 py-3 active:bg-secondary/20 text-left transition-all ${
        checked ? "opacity-60" : ""
      }`}
    >
      <div
        className={`w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
          checked ? "bg-primary ios-spring" : "border-2 border-muted-foreground/30"
        }`}
      >
        {checked && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`text-[15px] font-medium transition-colors ${
              checked ? "text-muted-foreground line-through" : "text-foreground"
            }`}
          >
            {achievement.name}
          </span>
          <span className={`text-[10px] font-bold ${levelColors[achievement.level] || "text-muted-foreground"}`}>
            {achievement.level}
          </span>
        </div>
        <p className="text-[12px] text-muted-foreground mt-0.5">{achievement.description}</p>
      </div>
    </button>
  );
}
