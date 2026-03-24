import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Crown, Mail, Star, FileText, Shield, Info, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useChecklist } from "@/hooks/useChecklist";

export default function Settings() {
  const navigate = useNavigate();
  const { resetAll } = useChecklist();
  const [showReset, setShowReset] = useState(false);

  const sections = [
    {
      items: [
        { icon: <Crown className="w-5 h-5 text-primary" />, label: "Upgrade to Pro", badge: "Coming Soon", onClick: () => {} },
      ],
    },
    {
      items: [
        { icon: <Mail className="w-5 h-5 text-primary" />, label: "Contact Support", onClick: () => window.open("mailto:fabio@thecosygamers.com") },
        { icon: <Star className="w-5 h-5 text-primary" />, label: "Rate the App", onClick: () => {} },
      ],
    },
    {
      items: [
        { icon: <FileText className="w-5 h-5 text-primary" />, label: "Privacy Policy", onClick: () => navigate("/privacy") },
        { icon: <Shield className="w-5 h-5 text-primary" />, label: "Terms of Use", onClick: () => navigate("/terms") },
      ],
    },
    {
      items: [
        { icon: <RotateCcw className="w-5 h-5 text-destructive" />, label: "Reset All Progress", destructive: true, onClick: () => setShowReset(true) },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 glass" style={{ paddingTop: "env(safe-area-inset-top, 8px)" }}>
        <div className="max-w-lg mx-auto flex items-center gap-3 px-5 py-3">
          <button onClick={() => navigate("/")} className="p-2 -ml-2 rounded-full active:bg-secondary/30 ios-spring">
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Settings</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5 space-y-4">
        {sections.map((section, si) => (
          <div key={si} className="glass-card rounded-2xl overflow-hidden divide-y divide-border/30">
            {section.items.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-secondary/30 transition-colors text-left"
              >
                {item.icon}
                <span className={`flex-1 text-[15px] font-medium ${item.destructive ? "text-destructive" : "text-foreground"}`}>
                  {item.label}
                </span>
                {item.badge && (
                  <span className="text-[11px] font-semibold text-primary glass-pill px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
                {!item.badge && !item.destructive && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </button>
            ))}
          </div>
        ))}

        {/* About */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-4 py-3.5 flex items-center gap-3">
            <Info className="w-5 h-5 text-primary" />
            <span className="text-[15px] font-medium text-foreground">About</span>
          </div>
          <div className="px-4 pb-4 text-[13px] text-muted-foreground leading-relaxed space-y-2">
            <p className="font-semibold text-foreground">Dredge Completion Tracker v0.1</p>
            <p>
              This is an unofficial companion app for DREDGE and is not endorsed by, directly affiliated with, maintained, authorised, or sponsored by Black Salt Games or Team17.
            </p>
            <p>
              All product and company names, trademarks, and registered trademarks are the property of their respective owners. All game content, images, and data are the intellectual property of Black Salt Games.
            </p>
            <p>
              This app is provided "as is" without warranty of any kind. Use at your own discretion.
            </p>
          </div>
        </div>
      </main>

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
    </div>
  );
}
