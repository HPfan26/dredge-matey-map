import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 glass" style={{ paddingTop: "env(safe-area-inset-top, 8px)" }}>
        <div className="max-w-lg mx-auto flex items-center gap-3 px-5 py-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full active:bg-secondary/30 ios-spring">
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5 py-6 space-y-5 text-[14px] text-foreground leading-relaxed">
        <p className="text-muted-foreground text-[13px]">Last updated: March 2026</p>

        <section className="space-y-2">
          <h2 className="text-[16px] font-semibold">1. Information We Collect</h2>
          <p className="text-muted-foreground">The Dredge Completion Tracker app stores your progress data locally on your device. We do not collect, transmit, or store any personal information on external servers.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[16px] font-semibold">2. Data Storage</h2>
          <p className="text-muted-foreground">All checklist progress and preferences are saved to your device's local storage. This data never leaves your device and is not accessible to us or any third parties.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[16px] font-semibold">3. Third-Party Services</h2>
          <p className="text-muted-foreground">This app does not integrate with any third-party analytics, advertising, or tracking services. No cookies or tracking pixels are used.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[16px] font-semibold">4. Children's Privacy</h2>
          <p className="text-muted-foreground">This app does not knowingly collect any information from children under the age of 13. The app is a game companion tool that stores data locally only.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[16px] font-semibold">5. Changes to This Policy</h2>
          <p className="text-muted-foreground">We may update this Privacy Policy from time to time. Any changes will be reflected within the app. Continued use of the app constitutes acceptance of the updated policy.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[16px] font-semibold">6. Contact Us</h2>
          <p className="text-muted-foreground">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:fabio@thecosygamers.com" className="text-primary underline">fabio@thecosygamers.com</a>.</p>
        </section>
      </main>
    </div>
  );
}
