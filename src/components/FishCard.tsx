import { Check, MapPin, Clock, DollarSign, Puzzle } from "lucide-react";
import type { FishItem } from "@/data/dredgeData";

interface FishCardProps {
  fish: FishItem;
  checked: boolean;
  onToggle: () => void;
}

export function FishCard({ fish, checked, onToggle }: FishCardProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-full glass-card rounded-2xl p-3 flex gap-3 items-start active:scale-[0.98] ios-spring text-left transition-all ${
        checked ? "opacity-60" : ""
      }`}
    >
      {/* Checkbox - left of image */}
      <div
        className={`w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 mt-5 transition-all duration-200 ${
          checked ? "bg-primary ios-spring" : "border-2 border-muted-foreground/30"
        }`}
      >
        {checked && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
      </div>

      {/* Fish image */}
      <div className="w-16 h-16 rounded-xl bg-secondary/30 flex-shrink-0 flex items-center justify-center overflow-hidden relative">
        <img
          src={`/${fish.image}`}
          alt={fish.name}
          className="w-14 h-14 object-contain"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <span
          className={`text-[15px] font-semibold truncate block transition-colors ${
            checked ? "text-muted-foreground line-through" : "text-foreground"
          } ${fish.aberrant ? "text-destructive" : ""}`}
        >
          {fish.name}
        </span>

        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span className="text-[11px] text-muted-foreground truncate">{fish.location_type}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span className="text-[11px] text-muted-foreground truncate">{fish.time}</span>
          </div>
          {fish.price != null && (
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              <span className="text-[11px] text-muted-foreground">${fish.price}</span>
            </div>
          )}
          {fish.dlc && (
            <div className="flex items-center gap-1.5">
              <Puzzle className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              <span className="text-[11px] text-muted-foreground truncate">{fish.dlc}</span>
            </div>
          )}
        </div>

        {(fish.exotic || fish.aberrant) && (
          <div className="flex gap-1.5 mt-0.5">
            {fish.aberrant && (
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-destructive/20 text-destructive">
                Aberrant
              </span>
            )}
            {fish.exotic && (
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">
                Exotic
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}
