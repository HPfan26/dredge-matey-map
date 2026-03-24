import { ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { guides } from "@/data/guidesData";

export default function GuidesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="sticky top-0 z-40 glass" style={{ paddingTop: "env(safe-area-inset-top, 8px)" }}>
        <div className="max-w-lg mx-auto flex items-center gap-3 px-5 py-3">
          <button onClick={() => navigate("/")} className="p-2 rounded-full glass-pill active:scale-90 ios-spring">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Guides</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5 space-y-3">
        <p className="text-base font-semibold text-muted-foreground px-1">
          Walkthroughs and tips from The Cozy Gamers
        </p>
        {guides.map((guide) => (
          <a
            key={guide.id}
            href={guide.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl overflow-hidden block active:scale-[0.98] ios-spring transition-all"
          >
            <img
              src={guide.imageUrl}
              alt={guide.title}
              className="w-full h-44 object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[15px] font-semibold text-foreground">{guide.title}</h3>
                <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </div>
              <p className="text-[13px] text-muted-foreground mt-1 leading-snug">{guide.description}</p>
            </div>
          </a>
        ))}
      </main>
    </div>
  );
}
