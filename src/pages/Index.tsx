import { useState, useMemo } from "react";
import { TabBar, type TabId } from "@/components/TabBar";
import { ProgressRing } from "@/components/ProgressRing";
import { ChecklistSection } from "@/components/ChecklistSection";
import { FishCard } from "@/components/FishCard";
import { AchievementCard } from "@/components/AchievementItem";
import { useChecklist } from "@/hooks/useChecklist";
import {
  allFish,
  allAchievements,
  books,
  notes,
  fishRegions,
  regionIcons,
  getFishByRegion,
  achievementCategories,
  getAchievementsByCategory,
} from "@/data/dredgeData";
import { pursuitsData } from "@/data/pursuitsData";
import { RotateCcw, Fish, ClipboardList, BookOpen, Trophy } from "lucide-react";
import { ChevronRight } from "lucide-react";

export default function Index() {
  const [tab, setTab] = useState<TabId>("overview");
  const { toggle, isChecked, getProgress, resetAll } = useChecklist();

  // All IDs
  const fishIds = useMemo(() => allFish.map((f) => f.id), []);
  const pursuitIds = useMemo(() => pursuitsData.items.map((i) => i.id), []);
  const bookIds = useMemo(() => books.map((b) => b.id), []);
  const noteIds = useMemo(() => notes.map((n) => n.id), []);
  const collectibleIds = useMemo(() => [...bookIds, ...noteIds], [bookIds, noteIds]);
  const achievementIds = useMemo(() => allAchievements.map((a) => a.id), []);

  const allIds = useMemo(
    () => [...fishIds, ...pursuitIds, ...collectibleIds, ...achievementIds],
    [fishIds, pursuitIds, collectibleIds, achievementIds]
  );

  const overall = getProgress(allIds);
  const fishProgress = getProgress(fishIds);
  const pursuitProgress = getProgress(pursuitIds);
  const collectibleProgress = getProgress(collectibleIds);
  const achievementProgress = getProgress(achievementIds);

  const [showReset, setShowReset] = useState(false);

  const categoryCards = [
    { label: "Fish", progress: fishProgress, tab: "fish" as TabId, icon: <Fish className="w-5 h-5 text-primary" /> },
    { label: "Pursuits", progress: pursuitProgress, tab: "pursuits" as TabId, icon: <ClipboardList className="w-5 h-5 text-primary" /> },
    { label: "Items", progress: collectibleProgress, tab: "collectibles" as TabId, icon: <BookOpen className="w-5 h-5 text-primary" /> },
    { label: "Trophies", progress: achievementProgress, tab: "achievements" as TabId, icon: <Trophy className="w-5 h-5 text-primary" /> },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 glass" style={{ paddingTop: "env(safe-area-inset-top, 8px)" }}>
        <div className="max-w-lg mx-auto flex items-center justify-between px-5 py-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">DREDGE</h1>
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Completion Tracker</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-pill rounded-full px-3 py-1.5">
              <span className={`text-sm font-semibold ${overall.percent === 100 ? "text-completion" : "text-primary"}`}>
                {overall.percent}%
              </span>
            </div>
            <button
              onClick={() => setShowReset(true)}
              className="p-2.5 rounded-full glass-pill active:scale-90 ios-spring text-muted-foreground"
              title="Reset progress"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {showReset && (
        <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="glass-card rounded-3xl p-0 max-w-[280px] w-full overflow-hidden text-center">
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-[17px] font-semibold text-foreground">Reset All Progress?</h2>
              <p className="text-[13px] text-muted-foreground mt-2">This will clear all checked items. This action cannot be undone.</p>
            </div>
            <div className="border-t border-border/50">
              <div className="grid grid-cols-2 divide-x divide-border/50">
                <button onClick={() => setShowReset(false)} className="py-3.5 text-[17px] font-medium text-primary active:bg-secondary/30 transition-colors">Cancel</button>
                <button onClick={() => { resetAll(); setShowReset(false); }} className="py-3.5 text-[17px] font-medium text-destructive active:bg-secondary/30 transition-colors">Reset</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-lg mx-auto px-4 py-5 space-y-5">
        {tab === "overview" && (
          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-6 flex flex-col items-center">
              <ProgressRing percent={overall.percent} size={130} strokeWidth={7} />
              <p className="mt-4 text-sm text-muted-foreground font-medium">
                {overall.done} of {overall.total} completed
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {categoryCards.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setTab(cat.tab)}
                  className="glass-card rounded-2xl p-4 flex flex-col items-center gap-3 active:scale-[0.97] ios-spring"
                >
                  <div className="flex items-center gap-2">
                    {cat.icon}
                    <span className="text-[13px] font-semibold text-foreground">{cat.label}</span>
                  </div>
                  <ProgressRing percent={cat.progress.percent} size={52} strokeWidth={4} />
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {cat.progress.done}/{cat.progress.total}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "fish" && (
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground px-1">Fish</h2>
            <p className="text-sm text-muted-foreground px-1 -mt-1">By region • {fishProgress.done}/{fishProgress.total}</p>
            {fishRegions.map((region) => {
              const regionFish = getFishByRegion(region);
              const regionProgress = getProgress(regionFish.map((f) => f.id));
              return (
                <FishRegionSection
                  key={region}
                  region={region}
                  icon={regionIcons[region]}
                  fish={regionFish}
                  isChecked={isChecked}
                  toggle={toggle}
                  progress={regionProgress}
                />
              );
            })}
          </div>
        )}

        {tab === "pursuits" && (
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground px-1">Pursuits</h2>
            <p className="text-sm text-muted-foreground px-1 -mt-1">{pursuitProgress.done}/{pursuitProgress.total} completed</p>
            <ChecklistSection
              title={pursuitsData.name}
              icon={pursuitsData.icon}
              items={pursuitsData.items}
              isChecked={isChecked}
              toggle={toggle}
              progress={pursuitProgress}
            />
          </div>
        )}

        {tab === "collectibles" && (
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground px-1">Collectibles</h2>
            <p className="text-sm text-muted-foreground px-1 -mt-1">{collectibleProgress.done}/{collectibleProgress.total} found</p>
            <ChecklistSection
              title="Books"
              icon="📖"
              items={books.map((b) => ({ id: b.id, name: b.name, description: b.buff || b.how_to_unlock || undefined }))}
              isChecked={isChecked}
              toggle={toggle}
              progress={getProgress(bookIds)}
            />
            <ChecklistSection
              title="Notes & Messages"
              icon="📝"
              items={notes.map((n) => ({ id: n.id, name: n.name, description: n.location ? `Location: ${n.location}` : undefined }))}
              isChecked={isChecked}
              toggle={toggle}
              progress={getProgress(noteIds)}
            />
          </div>
        )}

        {tab === "achievements" && (
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground px-1">Achievements</h2>
            <p className="text-sm text-muted-foreground px-1 -mt-1">{achievementProgress.done}/{achievementProgress.total} unlocked</p>
            {achievementCategories.map((cat) => {
              const catAchievements = getAchievementsByCategory(cat);
              const catProgress = getProgress(catAchievements.map((a) => a.id));
              return (
                <AchievementSection
                  key={cat}
                  category={cat}
                  achievements={catAchievements}
                  isChecked={isChecked}
                  toggle={toggle}
                  progress={catProgress}
                />
              );
            })}
          </div>
        )}
      </main>

      <TabBar active={tab} onChange={setTab} />
    </div>
  );
}

// Fish region collapsible
function FishRegionSection({
  region,
  icon,
  fish,
  isChecked,
  toggle,
  progress,
}: {
  region: string;
  icon: string;
  fish: import("@/data/dredgeData").FishItem[];
  isChecked: (id: string) => boolean;
  toggle: (id: string) => void;
  progress: { done: number; total: number; percent: number };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-secondary/30 transition-colors"
      >
        <span className="text-lg">{icon}</span>
        <span className="font-semibold text-[15px] text-foreground flex-1 text-left">{region}</span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          progress.percent === 100 ? "bg-completion/20 text-completion" : "glass-pill text-muted-foreground"
        }`}>
          {progress.done}/{progress.total}
        </span>
        <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-border/50 p-2 space-y-2">
          {fish.map((f) => (
            <FishCard key={f.id} fish={f} checked={isChecked(f.id)} onToggle={() => toggle(f.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

// Achievement category collapsible
function AchievementSection({
  category,
  achievements,
  isChecked,
  toggle,
  progress,
}: {
  category: string;
  achievements: import("@/data/dredgeData").AchievementItem[];
  isChecked: (id: string) => boolean;
  toggle: (id: string) => void;
  progress: { done: number; total: number; percent: number };
}) {
  const [open, setOpen] = useState(false);
  const catIcon = category === "The Pale Reach" ? "❄️" : category === "The Iron Rig" ? "⚙️" : "🏆";

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-secondary/30 transition-colors"
      >
        <span className="text-lg">{catIcon}</span>
        <span className="font-semibold text-[15px] text-foreground flex-1 text-left">{category}</span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          progress.percent === 100 ? "bg-completion/20 text-completion" : "glass-pill text-muted-foreground"
        }`}>
          {progress.done}/{progress.total}
        </span>
        <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-border/50 divide-y divide-border/30">
          {achievements.map((a) => (
            <AchievementCard key={a.id} achievement={a} checked={isChecked(a.id)} onToggle={() => toggle(a.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
