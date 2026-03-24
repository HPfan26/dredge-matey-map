import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function TermsOfUse() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 glass" style={{ paddingTop: "env(safe-area-inset-top, 8px)" }}>
        <div className="max-w-lg mx-auto flex items-center gap-3 px-5 py-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full active:bg-secondary/30 ios-spring">
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Terms of Use</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5 py-6 space-y-5 text-[14px] text-foreground leading-relaxed">
        <p className="text-muted-foreground text-[13px]">Last updated: March 2026</p>

        <section className="space-y-2">
          <h2 className="text-[16px] font-semibold">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">By downloading, installing, or using the Dredge Completion Tracker app, you agree to be bound by these Terms of Use. If you do not agree, please do not use the app.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[16px] font-semibold">2. Unofficial App</h2>
          <p className="text-muted-foreground">This app is an unofficial companion tool for the game DREDGE. It is not endorsed by, directly affiliated with, maintained, authorised, or sponsored by Black Salt Games or Team17. All product names, trademarks, and registered trademarks are the property of their respective owners.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[16px] font-semibold">3. Intellectual Property</h2>
          <p className="text-muted-foreground">All game content, names, images, and data related to DREDGE are the intellectual property of Black Salt Games. This app uses such content for informational and reference purposes only under fair use principles.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[16px] font-semibold">4. Limitation of Liability</h2>
          <p className="text-muted-foreground">This app is provided "as is" without warranty of any kind, express or implied. The developer shall not be liable for any damages arising from the use or inability to use this app, including but not limited to data loss or inaccuracies in game information.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[16px] font-semibold">5. Data Accuracy</h2>
          <p className="text-muted-foreground">While we strive to provide accurate game data, we cannot guarantee that all information is complete, current, or error-free. Game updates by the developer may cause discrepancies.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[16px] font-semibold">6. Modifications</h2>
          <p className="text-muted-foreground">We reserve the right to modify these terms at any time. Continued use of the app after changes constitutes acceptance of the new terms.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[16px] font-semibold">7. Contact</h2>
          <p className="text-muted-foreground">For questions regarding these Terms of Use, please contact <a href="mailto:fabio@thecosygamers.com" className="text-primary underline">fabio@thecosygamers.com</a>.</p>
        </section>
      </main>
    </div>
  );
}
