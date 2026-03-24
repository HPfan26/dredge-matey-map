import { Check } from "lucide-react";
import type { AchievementItem as AchievementType } from "@/data/dredgeData";

interface AchievementItemProps {
  achievement: AchievementType;
  checked: boolean;
  onToggle: () => void;
}

const levelColors: Record<string, string> = {
  Platinum: "bg-foreground text-primary-foreground",
  Gold: "bg-yellow-400 text-yellow-900",
  Silver: "bg-muted-foreground text-primary-foreground",
  Bronze: "bg-orange-400 text-orange-900",
};

const levelBg: Record<string, string> = {
  Platinum: "bg-gradient-to-br from-muted to-muted-foreground/20",
  Gold: "bg-gradient-to-br from-yellow-100 to-yellow-200",
  Silver: "bg-gradient-to-br from-muted to-muted/80",
  Bronze: "bg-gradient-to-br from-orange-100 to-orange-200",
};

export function AchievementCard({ achievement, checked, onToggle }: AchievementItemProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-3 p-2 active:bg-secondary/20 text-left transition-all ${
        checked ? "opacity-60" : ""
      }`}
    >
      {/* Checkbox - left of image */}
      <div
        className={`w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
          checked ? "bg-primary ios-spring" : "border-2 border-muted-foreground/30"
        }`}
      >
        {checked && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
      </div>

      {/* Image box */}
      <div className={`w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center ${levelBg[achievement.level] || "bg-muted"}`}>
        <img
          src={`/${achievement.icon}`}
          alt={achievement.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-2xl">🏆</span>`;
          }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-[15px] font-semibold transition-colors ${
            checked ? "text-muted-foreground line-through" : "text-foreground"
          }`}>
            {achievement.name}
          </span>
        </div>
        <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-full mt-0.5 ${
          levelColors[achievement.level] || "bg-muted text-muted-foreground"
        }`}>
          {achievement.level}
        </span>
        <p className="text-[12px] text-muted-foreground mt-0.5 line-clamp-2">{achievement.description}</p>
      </div>
    </button>
  );
}
