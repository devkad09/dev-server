import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { EngagementChart } from "@/components/dashboard/EngagementChart";
import { PlatformSplit } from "@/components/dashboard/PlatformSplit";
import { TopPosts } from "@/components/dashboard/TopPosts";
import { AuditPanel } from "@/components/dashboard/AuditPanel";
import { useStudio } from "@/context/StudioContext";
import { toast } from "sonner";
import { MapPin, Bot, Sparkles, Lock, Plus, FileText, Download, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Connect Analytics — Multi-platform social dashboard" },
      {
        name: "description",
        content:
          "Track engagement, audience, and post performance across Instagram, LinkedIn and TikTok with a real-time glassmorphism dashboard.",
      },
      { property: "og:title", content: "Connect Analytics — Multi-platform social dashboard" },
      {
        property: "og:description",
        content:
          "Track engagement, audience, and post performance across Instagram, LinkedIn and TikTok.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: DashboardPage,
});

function AudienceView() {
  const { currentWorkspace } = useStudio();
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Audience Insights
        </h2>
        <p className="text-xs text-muted-foreground">
          Detailed demographics and growth tracking for {currentWorkspace.name}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="glass-panel p-6 rounded-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Audience
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-foreground">84.2k</p>
          <span className="mt-1 inline-block text-[10px] text-success font-semibold">
            +12.4% this month
          </span>
        </div>
        <div className="glass-panel p-6 rounded-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Active Window
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-foreground">6 PM - 9 PM</p>
          <span className="mt-1 inline-block text-[10px] text-muted-foreground">
            Local timezone
          </span>
        </div>
        <div className="glass-panel p-6 rounded-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Retention Rate
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-foreground">68.4%</p>
          <span className="mt-1 inline-block text-[10px] text-success font-semibold">
            High engagement tone
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="glass-panel p-6 rounded-3xl xl:col-span-8">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">
            Age & Gender Split
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">18-24 Years</span>
                <span className="text-foreground font-semibold">32%</span>
              </div>
              <div className="w-full h-2 rounded bg-white/5 overflow-hidden">
                <div className="h-full bg-accent-blue rounded" style={{ width: "32%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">25-34 Years</span>
                <span className="text-foreground font-semibold">45%</span>
              </div>
              <div className="w-full h-2 rounded bg-white/5 overflow-hidden">
                <div className="h-full bg-accent-purple rounded" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">35-44 Years</span>
                <span className="text-foreground font-semibold">18%</span>
              </div>
              <div className="w-full h-2 rounded bg-white/5 overflow-hidden">
                <div className="h-full bg-accent-pink rounded" style={{ width: "18%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl xl:col-span-4">
          <h3 className="font-display text-lg font-bold text-foreground mb-4">Top Regions</h3>
          <div className="space-y-3">
            {[
              { country: "United States", pct: "42%", count: "35.3k" },
              { country: "United Kingdom", pct: "18%", count: "15.1k" },
              { country: "Germany", pct: "12%", count: "10.1k" },
              { country: "Canada", pct: "8%", count: "6.7k" },
            ].map((region, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-xs pb-2 border-b border-glass-border last:border-0 last:pb-0"
              >
                <span className="text-foreground font-medium flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-muted-foreground" />
                  {region.country}
                </span>
                <span className="text-muted-foreground font-mono">
                  {region.pct} ({region.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentStrategyView() {
  const { currentWorkspace } = useStudio();
  const [prompt, setPrompt] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateStrategy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setAiOutput(
        `🤖 Connect AI Recommendation for "${prompt}":\n\n` +
          `1. Platform: Focus on LinkedIn for long-form updates and Instagram for visually rich stories.\n` +
          `2. Strategy Theme: Highlight user testimonials coupled with glassmorphic visuals showing data charts.\n` +
          `3. Content Plan: Run a 3-part series demonstrating how studio workspaces save hours of manual data export.\n` +
          `4. Key Hashtags: #Productivity #Analytics #DesignSystems #TechTrends`,
      );
      setIsGenerating(false);
      toast.success("AI Content Strategy Generated!");
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Content Strategy
        </h2>
        <p className="text-xs text-muted-foreground">
          Plan campaigns and generate outline ideas with AI
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="glass-panel p-6 rounded-3xl xl:col-span-6 space-y-4">
          <div className="flex items-center gap-2 text-accent-purple font-semibold text-sm">
            <Bot className="size-5 animate-pulse" />
            <span>AI Content Ideator</span>
          </div>

          <form onSubmit={generateStrategy} className="space-y-3">
            <textarea
              placeholder="Describe your goals (e.g. Launching a new premium layout, promoting our studio subscription tier...)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              required
              className="w-full rounded-xl border border-glass-border bg-white/5 px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-accent-purple focus:outline-none transition-all resize-none"
            />
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue py-2.5 text-xs font-semibold text-background transition-all hover:brightness-110 disabled:brightness-50 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="size-4" />
              <span>{isGenerating ? "Analyzing..." : "Generate AI Outline"}</span>
            </button>
          </form>

          {aiOutput && (
            <div className="rounded-xl border border-accent-purple/20 bg-accent-purple/5 p-4 text-xs text-foreground/90 whitespace-pre-wrap leading-relaxed">
              {aiOutput}
            </div>
          )}
        </div>

        <div className="glass-panel p-6 rounded-3xl xl:col-span-6 space-y-4">
          <h3 className="font-display text-lg font-bold text-foreground">Upcoming Content Queue</h3>
          <div className="space-y-3">
            {[
              {
                title: "SaaS Launch Announcement",
                date: "June 2, 2026",
                type: "Instagram Story",
                status: "Ready",
              },
              {
                title: "Glassmorphism CSS Tutorial",
                date: "June 5, 2026",
                type: "LinkedIn Post",
                status: "Draft",
              },
              {
                title: "Workspace Switcher Demo Video",
                date: "June 9, 2026",
                type: "TikTok Video",
                status: "Scheduled",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-glass-border/30"
              >
                <div>
                  <h4 className="text-xs font-semibold text-foreground">{item.title}</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {item.type} • {item.date}
                  </p>
                </div>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    item.status === "Ready"
                      ? "bg-success/15 text-success"
                      : item.status === "Scheduled"
                        ? "bg-accent-blue/15 text-accent-blue"
                        : "bg-white/10 text-muted-foreground"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdPerformanceView() {
  const { currentWorkspace } = useStudio();
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Ad Performance
        </h2>
        <p className="text-xs text-muted-foreground">
          Paid campaign statistics and conversion rates for {currentWorkspace.name}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Ad Spend
          </span>
          <p className="text-2xl font-bold text-foreground mt-1">$4,850.00</p>
        </div>
        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Impressions
          </span>
          <p className="text-2xl font-bold text-foreground mt-1">285.2k</p>
        </div>
        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Avg. CPC
          </span>
          <p className="text-2xl font-bold text-foreground mt-1">$0.45</p>
        </div>
        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            ROI Multiplier
          </span>
          <p className="text-2xl font-bold text-foreground mt-1">3.4x</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl">
        <h3 className="font-display text-lg font-bold text-foreground mb-4">Active Campaigns</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] uppercase text-muted-foreground border-b border-glass-border pb-2">
                <th className="py-2.5">Campaign Name</th>
                <th className="py-2.5">Budget</th>
                <th className="py-2.5">Clicks</th>
                <th className="py-2.5">CTR</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {[
                {
                  name: "Brand Promotion Summer 2026",
                  budget: "$2,000",
                  clicks: "4,250",
                  ctr: "2.1%",
                  status: "Active",
                },
                {
                  name: "Connect Studio Upgrade Hook",
                  budget: "$1,500",
                  clicks: "3,800",
                  ctr: "3.4%",
                  status: "Active",
                },
                {
                  name: "Developer Tools Retargeting",
                  budget: "$1,350",
                  clicks: "1,120",
                  ctr: "1.8%",
                  status: "Paused",
                },
              ].map((c, i) => (
                <tr key={i} className="hover:bg-white/[0.01]">
                  <td className="py-3 font-semibold text-foreground">{c.name}</td>
                  <td className="py-3 text-muted-foreground">{c.budget}</td>
                  <td className="py-3 text-muted-foreground font-mono">{c.clicks}</td>
                  <td className="py-3 text-foreground font-semibold font-mono">{c.ctr}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.status === "Active" ? "bg-success/10 text-success" : "bg-white/10 text-muted-foreground"}`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ReportsView() {
  const { currentWorkspace, addNotification } = useStudio();
  const [reports, setReports] = useState<
    Array<{ id: string; name: string; date: string; size: string }>
  >([
    { id: "rep-1", name: "May Monthly Growth Report", date: "May 28, 2026", size: "142 KB" },
    { id: "rep-2", name: "Q2 Audience Demographic Scan", date: "May 15, 2026", size: "385 KB" },
  ]);

  const handleGenerateReport = () => {
    const toastId = toast.loading("Generating analytics PDF report...");
    setTimeout(() => {
      const newReport = {
        id: `rep-${Date.now()}`,
        name: `${currentWorkspace.name} - Performance Strategy Scan`,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        size: "245 KB",
      };
      setReports((prev) => [newReport, ...prev]);
      toast.success("Analytics PDF generated and saved!", { id: toastId });
      addNotification(`New Analytics Report generated: "${newReport.name}".`, "📊");
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Custom Performance Reports
          </h2>
          <p className="text-xs text-muted-foreground">
            Download and generate PDF growth scans for {currentWorkspace.name}
          </p>
        </div>
        <button
          onClick={handleGenerateReport}
          className="mt-3 md:mt-0 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-4 py-2.5 text-xs font-semibold text-background hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Generate Performance Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="glass-panel p-6 rounded-3xl">
          <h3 className="font-display text-base font-bold text-foreground mb-4">
            Export History & Scans
          </h3>
          <div className="space-y-3.5">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-glass-border/30 hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent-pink/15 text-accent-pink">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-foreground">{report.name}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {report.date} • {report.size}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toast.success(`Initiated download for ${report.name}`)}
                  className="p-2 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Download className="size-4.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  const { currentWorkspace, isStudio, setUpgradeModalOpen } = useStudio();
  const [integrations, setIntegrations] = useState({
    instagram: true,
    linkedin: false,
    tiktok: false,
  });

  const toggleIntegration = (platform: "instagram" | "linkedin" | "tiktok") => {
    if (!isStudio && platform !== "instagram") {
      setUpgradeModalOpen(true);
      return;
    }
    setIntegrations((prev) => ({ ...prev, [platform]: !prev[platform] }));
    toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} connection updated!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Settings & Integrations
        </h2>
        <p className="text-xs text-muted-foreground">
          Configure API integrations and credentials for {currentWorkspace.name}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="glass-panel p-6 rounded-3xl xl:col-span-7 space-y-4">
          <h3 className="font-display text-base font-bold text-foreground">Workspace Profile</h3>
          <div className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Workspace Name
              </label>
              <input
                type="text"
                defaultValue={currentWorkspace.name}
                className="w-full rounded-xl border border-glass-border bg-white/5 px-4 py-2.5 text-xs text-foreground focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Timezone
              </label>
              <select className="w-full rounded-xl border border-glass-border bg-[#181424] px-4 py-2.5 text-xs text-foreground focus:outline-none">
                <option>UTC -05:00 (Eastern Standard Time)</option>
                <option>UTC +00:00 (Greenwich Mean Time)</option>
                <option>UTC +08:00 (Singapore Standard Time)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl xl:col-span-5 space-y-4">
          <h3 className="font-display text-base font-bold text-foreground">
            Social Channel Connections
          </h3>
          <div className="space-y-3.5">
            {[
              {
                key: "instagram",
                name: "Instagram Business",
                desc: "Sync posts and demographics",
                locked: false,
              },
              {
                key: "linkedin",
                name: "LinkedIn Organization",
                desc: "Sync company page posts",
                locked: !isStudio,
              },
              {
                key: "tiktok",
                name: "TikTok Business Account",
                desc: "Sync video impressions",
                locked: !isStudio,
              },
            ].map((channel) => {
              const active = integrations[channel.key as keyof typeof integrations];
              return (
                <div
                  key={channel.key}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.01] border border-glass-border/30"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-foreground">{channel.name}</span>
                      {channel.locked && <Lock className="size-3 text-muted-foreground/60" />}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{channel.desc}</p>
                  </div>
                  <button
                    onClick={() =>
                      toggleIntegration(channel.key as "instagram" | "linkedin" | "tiktok")
                    }
                    className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      active
                        ? "bg-success/15 text-success hover:bg-success/20"
                        : "bg-white/5 border border-glass-border text-foreground hover:bg-white/10"
                    }`}
                  >
                    {active ? "Connected" : "Connect"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportView() {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    {
      sender: "bot",
      text: "Hello! Welcome to Connect Premium Support. How can we help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");

    setTimeout(() => {
      let botResponse =
        "Our team will review your query and get back shortly! You can also consult our FAQs for instant answers.";
      if (userMsg.toLowerCase().includes("studio") || userMsg.toLowerCase().includes("price")) {
        botResponse =
          "Connect Studio is priced at $15/month ($144/year). You get unlimited workspaces and premium AI audits.";
      }
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Help & Support Center
        </h2>
        <p className="text-xs text-muted-foreground">
          Frequently asked questions and simulated agent support
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="glass-panel p-6 rounded-3xl xl:col-span-6 space-y-4">
          <h3 className="font-display text-base font-bold text-foreground">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3 text-xs">
            {[
              {
                q: "How do I upgrade to Studio?",
                a: "Click the 'Upgrade' button in the sidebar or active features modal to access checkout options.",
              },
              {
                q: "How many workspaces are allowed?",
                a: "The Free plan allows 1 Workspace (Personal Brand). Upgrading to Studio unlocks unlimited workspaces.",
              },
              {
                q: "Can I download raw report data?",
                a: "Yes, click the 'Export' button in the topbar to download a CSV summary report.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-white/[0.01] border border-glass-border/30"
              >
                <h4 className="font-semibold text-foreground flex items-center gap-1.5">
                  <HelpCircle className="size-4 text-accent-blue" />
                  {faq.q}
                </h4>
                <p className="text-muted-foreground mt-1.5 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl xl:col-span-6 flex flex-col h-[400px]">
          <h3 className="font-display text-base font-bold text-foreground mb-4">
            Connect Support Live Chat
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs mb-4 text-left">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    msg.sender === "user"
                      ? "bg-accent-blue text-background font-medium"
                      : "bg-white/5 border border-glass-border/40 text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-xl border border-glass-border bg-white/5 px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-foreground text-background font-semibold rounded-xl text-xs hover:brightness-110 cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  const { currentView } = useStudio();

  const renderContent = () => {
    switch (currentView) {
      case "Audience":
        return <AudienceView />;
      case "Content Strategy":
        return <ContentStrategyView />;
      case "Ad Performance":
        return <AdPerformanceView />;
      case "Reports":
        return <ReportsView />;
      case "Settings":
        return <SettingsView />;
      case "Support":
        return <SupportView />;
      default:
        return (
          <>
            <KpiCards />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
              <div className="xl:col-span-8">
                <EngagementChart />
              </div>
              <div className="xl:col-span-4">
                <PlatformSplit />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
              <div className="xl:col-span-8">
                <TopPosts />
              </div>
              <div className="xl:col-span-4">
                <AuditPanel />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="lg:pl-64">
        <Topbar />
        <div className="space-y-6 p-6 md:space-y-8 md:p-10">{renderContent()}</div>
      </main>
    </div>
  );
}
