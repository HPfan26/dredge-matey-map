import { useState, useMemo } from "react";
import { TabBar, type TabId } from "@/components/TabBar";
import { ProgressRing } from "@/components/ProgressRing";
import { ChecklistSection } from "@/components/ChecklistSection";
import { useChecklist } from "@/hooks/useChecklist";
import { fishData, pursuitsData, collectiblesData, upgradesData } from "@/data/dredgeData";
import { RotateCcw } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-logbook tracking-wide text-primary">DREDGE</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Completion Tracker</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-mono font-bold ${overall.percent === 100 ? "text-completion" : "text-foreground"}`}>
              {overall.percent}%
            </span>
            <button
              onClick={() => setShowReset(true)}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
              title="Reset progress"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Reset confirmation */}
      {showReset && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-6 max-w-xs w-full space-y-4">
            <h2 className="font-logbook text-lg text-foreground">Reset All Progress?</h2>
            <p className="text-sm text-muted-foreground">This will clear all checked items. This cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReset(false)}
                className="flex-1 py-2 rounded-lg bg-muted text-muted-foreground text-sm hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { resetAll(); setShowReset(false); }}
                className="flex-1 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm hover:bg-destructive/80 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {tab === "overview" && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <ProgressRing percent={overall.percent} size={120} strokeWidth={8} />
              <p className="mt-3 text-sm text-muted-foreground">
                {overall.done} / {overall.total} completed
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Fish", progress: fishProgress, tab: "fish" as TabId },
                { label: "Pursuits", progress: pursuitProgress, tab: "pursuits" as TabId },
                { label: "Collectibles", progress: collectibleProgress, tab: "collectibles" as TabId },
                { label: "Upgrades", progress: upgradeProgress, tab: "upgrades" as TabId },
              ].map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setTab(cat.tab)}
                  className="bg-surface border border-border rounded-xl p-4 flex flex-col items-center gap-2 hover:border-primary/30 transition-colors"
                >
                  <ProgressRing percent={cat.progress.percent} size={56} strokeWidth={4} />
                  <span className="text-xs font-medium text-surface-foreground">{cat.label}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {cat.progress.done}/{cat.progress.total}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === "fish" && (
          <div className="space-y-3">
            <h2 className="font-logbook text-xl text-primary">Fish Encyclopedia</h2>
            {fishData.map((region) => (
              <ChecklistSection
                key={region.id}
                title={region.name}
                icon={region.icon}
                items={region.items}
                isChecked={isChecked}
                toggle={toggle}
                progress={getProgress(region.items.map((i) => i.id))}
              />
            ))}
          </div>
        )}

        {tab === "pursuits" && (
          <div className="space-y-3">
            <h2 className="font-logbook text-xl text-primary">Pursuits</h2>
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
            <h2 className="font-logbook text-xl text-primary">Collectibles</h2>
            {collectiblesData.map((cat) => (
              <ChecklistSection
                key={cat.id}
                title={cat.name}
                icon={cat.icon}
                items={cat.items}
                isChecked={isChecked}
                toggle={toggle}
                progress={getProgress(cat.items.map((i) => i.id))}
              />
            ))}
          </div>
        )}

        {tab === "upgrades" && (
          <div className="space-y-3">
            <h2 className="font-logbook text-xl text-primary">Boat Upgrades</h2>
            <ChecklistSection
              title={upgradesData.name}
              icon={upgradesData.icon}
              items={upgradesData.items}
              isChecked={isChecked}
              toggle={toggle}
              progress={upgradeProgress}
            />
          </div>
        )}
      </main>

      <TabBar active={tab} onChange={setTab} />
    </div>
  );
}
