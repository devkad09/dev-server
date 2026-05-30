import React, { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Clock,
  Hash,
  Lock,
  CheckCircle,
  FileText,
  Download,
  Printer,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useStudio } from "@/context/StudioContext";
import { toast } from "sonner";

export function AuditPanel() {
  const { currentWorkspace, isStudio, setUpgradeModalOpen } = useStudio();
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState("");
  const [reportOpen, setReportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const score = currentWorkspace.auditScore;
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;

  const handleGenerateReport = () => {
    if (!isStudio) {
      setUpgradeModalOpen(true);
      return;
    }

    setIsScanning(true);
    setScanStep("Analyzing audience demographics...");

    setTimeout(() => {
      setScanStep("Evaluating past post performance...");
      setTimeout(() => {
        setScanStep("Benchmarking against industry top 10%...");
        setTimeout(() => {
          setScanStep("Compiling custom strategic recommendations...");
          setTimeout(() => {
            setIsScanning(false);
            setReportOpen(true);
            toast.success("AI Strategy Blueprint Generated!", {
              description: "Review detailed recommendations and scheduling matrix.",
            });
          }, 800);
        }, 900);
      }, 900);
    }, 900);
  };

  const handleExportPDF = () => {
    setExporting(true);
    toast.info("Preparing PDF Export...", {
      description: "Compressing vector graphs and high-definition audit metrics.",
    });

    setTimeout(() => {
      setExporting(false);
      toast.success("PDF Downloaded!", {
        description: `Connect_Studio_Blueprint_${currentWorkspace.id}.pdf has been saved.`,
      });
    }, 1800);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="glass-panel relative rounded-3xl p-6 md:p-8 animate-in fade-in duration-300 overflow-hidden">
        {/* Scanning Overlay */}
        {isScanning && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md p-6 text-center animate-in fade-in duration-200">
            <Loader2 className="size-10 text-accent-blue animate-spin" />
            <h4 className="mt-4 font-display text-lg font-bold text-foreground">
              AI Auditor Scanning
            </h4>
            <p className="mt-1.5 text-xs text-muted-foreground max-w-[200px]">{scanStep}</p>
            {/* Animated scanning bar */}
            <div className="mt-6 h-1 w-32 overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-gradient-to-r from-accent-blue to-accent-purple animate-infinite-loading" />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
            Performance Audit
          </h3>
          <span className="flex items-center gap-1 rounded-full bg-accent-purple/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-accent-purple">
            <Sparkles className="size-3 animate-pulse" />
            AI
          </span>
        </div>

        {/* Score Ring */}
        <div className="mt-6 flex items-center gap-6">
          <div className="relative size-32 shrink-0">
            <svg className="size-full -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="oklch(1 0 0 / 0.08)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="url(#auditGrad)"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="auditGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.16 230)" />
                  <stop offset="100%" stopColor="oklch(0.66 0.22 295)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-3xl font-bold text-foreground">{score}</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                / 100
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {score >= 90 ? "Excellent Performance" : "Above industry benchmark"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Your content quality is <span className="text-success">{score - 70}% higher</span>{" "}
              than the design/SaaS benchmark this month.
            </p>
          </div>
        </div>

        {/* Insights Section */}
        <div className="relative mt-6">
          <div
            className={`space-y-3 ${!isStudio ? "blur-md select-none pointer-events-none" : ""}`}
          >
            {currentWorkspace.auditInsights.map((i) => (
              <div
                key={i.title}
                className="flex gap-3 rounded-2xl border border-glass-border bg-white/[0.02] p-4"
              >
                <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20">
                  <i.icon className="size-4 text-accent-blue" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{i.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{i.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Lock Overlay for Free Tier */}
          {!isStudio && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/10 backdrop-blur-[2px] rounded-2xl p-4 text-center">
              <div className="size-10 rounded-full bg-accent-purple/10 flex items-center justify-center border border-accent-purple/20 shadow-lg">
                <Lock className="size-4 text-accent-purple" />
              </div>
              <p className="mt-3 text-xs font-bold text-foreground">Unlock detailed AI Insights</p>
              <p className="mt-1 text-[10px] text-muted-foreground max-w-[200px]">
                Upgrade to Connect Studio to activate complete posting window analytics and hashtag
                drift monitoring.
              </p>
              <button
                onClick={() => setUpgradeModalOpen(true)}
                className="mt-3 px-3 py-1.5 rounded-lg bg-accent-purple text-[10px] font-bold text-white transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1 shadow-md"
              >
                <span>Unlock with Studio</span>
                <ArrowRight className="size-3" />
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleGenerateReport}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple py-2.5 text-sm font-semibold text-background transition-all hover:brightness-110 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Sparkles className="size-4" />
          <span>Generate strategy report</span>
        </button>
      </div>

      {/* STRATEGY BLUEPRINT MODAL */}
      {reportOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 px-4 py-6 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="glass-panel relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#161224]/90 p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
            style={{
              boxShadow: "0 0 80px -10px oklch(0.78 0.16 230 / 0.25)",
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-glass-border/40 pb-6">
              <div>
                <span className="flex items-center gap-1 w-fit rounded-full bg-success/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-success">
                  <CheckCircle className="size-3" /> Ready
                </span>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-foreground">
                  AI Strategy Blueprint
                </h3>
                <p className="text-xs text-muted-foreground">
                  Generated dynamically for workspace:{" "}
                  <span className="font-semibold text-white">{currentWorkspace.name}</span>
                </p>
              </div>
              <button
                onClick={() => setReportOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-muted-foreground transition-all hover:bg-white/10 hover:text-foreground cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            <div className="mt-6 space-y-6">
              {/* Audit Summary Card */}
              <div className="grid grid-cols-3 gap-4 rounded-2xl bg-white/[0.02] border border-glass-border p-4">
                <div className="text-center border-r border-glass-border/40">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Audit Score
                  </span>
                  <div className="font-display text-3xl font-extrabold text-accent-blue mt-1">
                    {score}
                  </div>
                </div>
                <div className="text-center border-r border-glass-border/40">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Recommendations
                  </span>
                  <div className="font-display text-3xl font-extrabold text-accent-purple mt-1">
                    4 Key Pillars
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Competitor Rank
                  </span>
                  <div className="font-display text-3xl font-extrabold text-success mt-1">
                    Top 10%
                  </div>
                </div>
              </div>

              {/* Pillar 1: Posting Matrix */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-accent-blue uppercase tracking-widest flex items-center gap-1.5">
                  <Clock className="size-4" /> 1. Optimal Posting Schedule
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Based on machine-learning engagement clustering over the past 90 days, your target
                  audience exhibits maximum click-through rates and high-fidelity comments in the
                  following time zones:
                </p>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="rounded-lg bg-white/5 border border-glass-border p-2">
                    <span className="block text-muted-foreground">Monday</span>{" "}
                    <span className="font-bold text-foreground">9:15 AM EST</span>
                  </div>
                  <div className="rounded-lg bg-white/5 border border-glass-border p-2">
                    <span className="block text-muted-foreground">Wednesday</span>{" "}
                    <span className="font-bold text-foreground">2:30 PM EST</span>
                  </div>
                  <div className="rounded-lg bg-white/5 border border-glass-border p-2">
                    <span className="block text-muted-foreground">Friday</span>{" "}
                    <span className="font-bold text-foreground">8:00 PM EST</span>
                  </div>
                  <div className="rounded-lg bg-white/5 border border-glass-border p-2">
                    <span className="block text-muted-foreground">Sunday</span>{" "}
                    <span className="font-bold text-foreground">6:45 PM EST</span>
                  </div>
                </div>
              </div>

              {/* Pillar 2: Content Angle suggestions */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-accent-purple uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="size-4" /> 2. Content Angle Recommendations
                </h4>
                <ul className="space-y-2 text-xs">
                  <li className="rounded-xl bg-white/[0.01] border border-glass-border p-3 flex gap-2">
                    <div className="size-5 rounded-full bg-accent-purple/10 flex items-center justify-center shrink-0 text-accent-purple font-bold">
                      1
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">
                        Technical Behind-the-Scenes:
                      </span>{" "}
                      Reveal the architecture or iterative sketch process behind your latest
                      service. Audiences engage 3.1x more on transparent progress than polished
                      finishes.
                    </div>
                  </li>
                  <li className="rounded-xl bg-white/[0.01] border border-glass-border p-3 flex gap-2">
                    <div className="size-5 rounded-full bg-accent-blue/10 flex items-center justify-center shrink-0 text-accent-blue font-bold">
                      2
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">
                        Infographic Slide Carousels:
                      </span>{" "}
                      Present complex SaaS concepts as visual micro-guides. This format gains the
                      highest rate of bookmarks, extending post lifespan by 48 hours.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Pillar 3: Hashtags */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-accent-pink uppercase tracking-widest flex items-center gap-1.5">
                  <Hash className="size-4" /> 3. High-Conversion Hashtag Pool
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Mix this dynamic tag selection to optimize explore feed recommendations without
                  triggering spam suppression filters:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg bg-accent-blue/10 border border-accent-blue/20 px-2 py-1 text-[10px] font-mono text-accent-blue">
                    #designstrategy
                  </span>
                  <span className="rounded-lg bg-accent-purple/10 border border-accent-purple/20 px-2 py-1 text-[10px] font-mono text-accent-purple">
                    #saasmarketing
                  </span>
                  <span className="rounded-lg bg-accent-pink/10 border border-accent-pink/20 px-2 py-1 text-[10px] font-mono text-accent-pink">
                    #uishowcase
                  </span>
                  <span className="rounded-lg bg-success/10 border border-success/20 px-2 py-1 text-[10px] font-mono text-success">
                    #growthframework
                  </span>
                  <span className="rounded-lg bg-white/5 border border-glass-border px-2 py-1 text-[10px] font-mono text-muted-foreground">
                    #connectanalytics
                  </span>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="mt-8 border-t border-glass-border/40 pt-6 flex justify-between gap-4">
              <button
                onClick={handlePrint}
                className="rounded-xl border border-glass-border bg-white/5 px-4 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-white/10 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="size-3.5" />
                <span>Print Blueprint</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setReportOpen(false)}
                  className="rounded-xl border border-glass-border bg-white/5 px-4 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-white/10 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={handleExportPDF}
                  disabled={exporting}
                  className="rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-5 py-2.5 text-xs font-semibold text-background transition-all hover:brightness-110 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {exporting ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Download className="size-3.5" />
                  )}
                  <span>{exporting ? "Exporting..." : "Download PDF"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Simple helper for closing modal
const X = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
