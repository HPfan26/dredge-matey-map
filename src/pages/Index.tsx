import { useState, useMemo } from "react";
import { TabBar, type TabId } from "@/components/TabBar";
import { ProgressRing } from "@/components/ProgressRing";
import { ChecklistSection } from "@/components/ChecklistSection";
import { useChecklist } from "@/hooks/useChecklist";
import { fishData, pursuitsData, collectiblesData, upgradesData } from "@/data/dredgeData";
import { RotateCcw, Fish, ClipboardList, Gem, Anchor } from "lucide-react";

export default function Index() {
  const [tab, setTab] = useState<TabId>("overview");
  const { toggle, isChecked, getProgress, resetAll } = useChecklist();

  const allIds = useMemo(() => {
    const ids: string[] = [];
    fishData.forEach((r) => r.items.forEach((i) => ids.push(i.id)));
    pursuitsData.items.forEach((i) => ids.push(i.id));
    collectiblesData.forEach((c) => c.items.forEach((i) => ids.push(i.id)));
    upgradesData.items.forEach((i) => ids.push(i.id));
    return ids;
  }, []);

  const fishIds = useMemo(() => fishData.flatMap((r) => r.items.map((i) => i.id)), []);
  const pursuitIds = useMemo(() => pursuitsData.items.map((i) => i.id), []);
  const collectibleIds = useMemo(() => collectiblesData.flatMap((c) => c.items.map((i) => i.id)), []);
  const upgradeIds = useMemo(() => upgradesData.items.map((i) => i.id), []);

  const overall = getProgress(allIds);
  const fishProgress = getProgress(fishIds);
  const pursuitProgress = getProgress(pursuitIds);
  const collectibleProgress = getProgress(collectibleIds);
  const upgradeProgress = getProgress(upgradeIds);

  const [showReset, setShowReset] = useState(false);

  const categoryCards = [
  { label: "Fish", progress: fishProgress, tab: "fish" as TabId, icon: <Fish className="w-5 h-5 text-primary" /> },
  { label: "Pursuits", progress: pursuitProgress, tab: "pursuits" as TabId, icon: <ClipboardList className="w-5 h-5 text-primary" /> },
  { label: "Collectibles", progress: collectibleProgress, tab: "collectibles" as TabId, icon: <Gem className="w-5 h-5 text-primary" /> },
  { label: "Upgrades", progress: upgradeProgress, tab: "upgrades" as TabId, icon: <Anchor className="w-5 h-5 text-primary" /> }];


  return (
    <div className="min-h-screen bg-background pb-24">
      {/* iOS-style large title header */}
      <header className="sticky top-0 z-40 glass" style={{ paddingTop: "env(safe-area-inset-top, 8px)" }}>
        <div className="max-w-lg mx-auto flex items-center justify-between px-5 py-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">DREDGE</h1>
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">100% Checklist</p>
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
              title="Reset progress">
              
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Reset confirmation - iOS alert style */}
      {showReset &&
      <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="glass-card rounded-3xl p-0 max-w-[280px] w-full overflow-hidden text-center">
            <div className="px-6 pt-6 pb-4">
              <h2 className="text-[17px] font-semibold text-foreground">Reset All Progress?</h2>
              <p className="text-[13px] text-muted-foreground mt-2">This will clear all checked items. This action cannot be undone.</p>
            </div>
            <div className="border-t border-border/50">
              <div className="grid grid-cols-2 divide-x divide-border/50">
                <button
                onClick={() => setShowReset(false)}
                className="py-3.5 text-[17px] font-medium text-primary active:bg-secondary/30 transition-colors">
                
                  Cancel
                </button>
                <button
                onClick={() => {resetAll();setShowReset(false);}}
                className="py-3.5 text-[17px] font-medium text-destructive active:bg-secondary/30 transition-colors">
                
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <main className="max-w-lg mx-auto px-4 py-5 space-y-5">
        {tab === "overview" &&
        <div className="space-y-6">
            {/* Hero progress */}
            <div className="glass-card rounded-3xl p-6 flex flex-col items-center">
              <ProgressRing percent={overall.percent} size={130} strokeWidth={7} />
              <p className="mt-4 text-sm text-muted-foreground font-medium">
                {overall.done} of {overall.total} completed
              </p>
            </div>

            {/* Category grid */}
            <div className="grid grid-cols-2 gap-3">
              {categoryCards.map((cat) =>
            <button
              key={cat.label}
              onClick={() => setTab(cat.tab)}
              className="glass-card rounded-2xl p-4 flex flex-col items-center gap-3 active:scale-[0.97] ios-spring">
              
                  <div className="flex items-center gap-2">
                    {cat.icon}
                    <span className="text-[13px] font-semibold text-foreground">{cat.label}</span>
                  </div>
                  <ProgressRing percent={cat.progress.percent} size={52} strokeWidth={4} />
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {cat.progress.done}/{cat.progress.total}
                  </span>
                </button>
            )}
            </div>
          </div>
        }

        {tab === "fish" &&
        <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground px-1">Fish</h2>
            <p className="text-sm text-muted-foreground px-1 -mt-1">By region • {fishProgress.done}/{fishProgress.total}</p>
            {fishData.map((region) =>
          <ChecklistSection
            key={region.id}
            title={region.name}
            icon={region.icon}
            items={region.items}
            isChecked={isChecked}
            toggle={toggle}
            progress={getProgress(region.items.map((i) => i.id))} />

          )}
          </div>
        }

        {tab === "pursuits" &&
        <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground px-1">Pursuits</h2>
            <p className="text-sm text-muted-foreground px-1 -mt-1">{pursuitProgress.done}/{pursuitProgress.total} completed</p>
            <ChecklistSection
            title={pursuitsData.name}
            icon={pursuitsData.icon}
            items={pursuitsData.items}
            isChecked={isChecked}
            toggle={toggle}
            progress={pursuitProgress} />
          
          </div>
        }

        {tab === "collectibles" &&
        <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground px-1">Collectibles</h2>
            <p className="text-sm text-muted-foreground px-1 -mt-1">{collectibleProgress.done}/{collectibleProgress.total} found</p>
            {collectiblesData.map((cat) =>
          <ChecklistSection
            key={cat.id}
            title={cat.name}
            icon={cat.icon}
            items={cat.items}
            isChecked={isChecked}
            toggle={toggle}
            progress={getProgress(cat.items.map((i) => i.id))} />

          )}
          </div>
        }

        {tab === "upgrades" &&
        <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground px-1">Upgrades</h2>
            <p className="text-sm text-muted-foreground px-1 -mt-1">{upgradeProgress.done}/{upgradeProgress.total} unlocked</p>
            <ChecklistSection
            title={upgradesData.name}
            icon={upgradesData.icon}
            items={upgradesData.items}
            isChecked={isChecked}
            toggle={toggle}
            progress={upgradeProgress} />
          
          </div>
        }
      </main>

      <TabBar active={tab} onChange={setTab} />
    </div>);

}