import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "dredge-checklist-progress";

export function useChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const isChecked = useCallback((id: string) => !!checked[id], [checked]);

  const getProgress = useCallback(
    (ids: string[]) => {
      const done = ids.filter((id) => checked[id]).length;
      return { done, total: ids.length, percent: ids.length ? Math.round((done / ids.length) * 100) : 0 };
    },
    [checked]
  );

  const resetAll = useCallback(() => setChecked({}), []);

  return { toggle, isChecked, getProgress, resetAll, checked };
}
