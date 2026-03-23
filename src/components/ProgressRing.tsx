interface ProgressRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function ProgressRing({ percent, size = 80, strokeWidth = 5, label }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const isComplete = percent === 100;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(220 15% 20% / 0.5)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isComplete ? "hsl(var(--completion))" : "hsl(var(--primary))"}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
            style={{
              filter: isComplete
                ? "drop-shadow(0 0 6px hsl(var(--completion) / 0.5))"
                : "drop-shadow(0 0 4px hsl(var(--primary) / 0.3))",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-semibold ${size > 100 ? "text-2xl" : size > 60 ? "text-sm" : "text-xs"} ${
            isComplete ? "text-completion" : "text-foreground"
          }`}>
            {percent}%
          </span>
        </div>
      </div>
      {label && <span className="text-xs text-muted-foreground text-center font-medium">{label}</span>}
    </div>
  );
}
