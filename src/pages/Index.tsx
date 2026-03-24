import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import { allPursuits, pursuitCategories, getPursuitsByCategory, pursuitCategoryIcons } from "@/data/pursuitsData";
import { Settings, Fish, ClipboardList, BookOpen, Trophy, BookMarked } from "lucide-react";
import { ChevronRight } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>("overview");
  const { toggle, isChecked, getProgress } = useChecklist();

  const fishIds = useMemo(() => allFish.map((f) => f.id), []);
  const pursuitIds = useMemo(() => allPursuits.map((i) => i.id), []);
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

  const categoryCards = [
    { label: "Fish", progress: fishProgress, tab: "fish" as TabId, icon: <Fish className="w-5 h-5 text-primary" /> },
    { label: "Pursuits", progress: pursuitProgress, tab: "pursuits" as TabId, icon: <ClipboardList className="w-5 h-5 text-primary" /> },
    { label: "Collectibles", progress: collectibleProgress, tab: "collectibles" as TabId, icon: <BookOpen className="w-5 h-5 text-primary" /> },
    { label: "Trophies", progress: achievementProgress, tab: "achievements" as TabId, icon: <Trophy className="w-5 h-5 text-primary" /> },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-background" style={{ paddingTop: "env(safe-area-inset-top, 8px)" }}>
        <div className="max-w-lg mx-auto flex items-center justify-between px-5 py-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">DREDGE</h1>
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Completion Tracker</p>
          </div>
          <button
            onClick={() => navigate("/settings")}
            className="p-2.5 rounded-full active:scale-90 ios-spring text-foreground border border-border"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5 space-y-5">
        {tab === "overview" && (
          <div className="space-y-3">
            <div className="glass-card rounded-3xl p-6 flex flex-col items-center">
              <p className="text-sm font-semibold text-foreground mb-2">Game Progress</p>
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

            <button
              onClick={() => navigate("/guides")}
              className="w-full glass-card rounded-2xl p-4 flex items-center justify-center gap-2 active:scale-[0.97] ios-spring"
            >
              <BookMarked className="w-5 h-5 text-primary" />
              <span className="text-[15px] font-semibold text-foreground">More Guides</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
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
            {pursuitCategories.map((cat) => {
              const catPursuits = getPursuitsByCategory(cat);
              const catProgress = getProgress(catPursuits.map((p) => p.id));
              return (
                <ChecklistSection
                  key={cat}
                  title={cat}
                  icon={pursuitCategoryIcons[cat]}
                  items={catPursuits.map((p) => ({
                    id: p.id,
                    name: p.name,
                  }))}
                  isChecked={isChecked}
                  toggle={toggle}
                  progress={catProgress}
                />
              );
            })}
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

function FishRegionSection({
  region, icon, fish, isChecked, toggle, progress,
}: {
  region: string; icon: string;
  fish: import("@/data/dredgeData").FishItem[];
  isChecked: (id: string) => boolean; toggle: (id: string) => void;
  progress: { done: number; total: number; percent: number };
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-secondary/30 transition-colors">
        <span className="font-semibold text-[15px] text-foreground flex-1 text-left">{region}</span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${progress.percent === 100 ? "bg-completion/20 text-completion" : "glass-pill text-muted-foreground"}`}>
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

function AchievementSection({
  category, achievements, isChecked, toggle, progress,
}: {
  category: string;
  achievements: import("@/data/dredgeData").AchievementItem[];
  isChecked: (id: string) => boolean; toggle: (id: string) => void;
  progress: { done: number; total: number; percent: number };
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-secondary/30 transition-colors">
        <span className="font-semibold text-[15px] text-foreground flex-1 text-left">{category}</span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${progress.percent === 100 ? "bg-completion/20 text-completion" : "glass-pill text-muted-foreground"}`}>
          {progress.done}/{progress.total}
        </span>
        <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-border/50 p-2 space-y-1">
          {achievements.map((a) => (
            <AchievementCard key={a.id} achievement={a} checked={isChecked(a.id)} onToggle={() => toggle(a.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
