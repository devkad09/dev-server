import { useState, useRef, useEffect } from "react";
import { Bell, Calendar, Search, Trash2 } from "lucide-react";
import { useStudio } from "@/context/StudioContext";
import { toast } from "sonner";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";

export function Topbar() {
  const { currentWorkspace, notifications, clearNotifications, addNotification } = useStudio();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExport = () => {
    toast.info(`Exporting report for "${currentWorkspace.name}"...`);

    try {
      // Build CSV Content
      const csvLines = [
        `Report: ${currentWorkspace.name}`,
        `Generated: ${new Date().toLocaleString()}`,
        "",
        "METRIC,VALUE,TREND",
        ...currentWorkspace.kpiData.map((kpi) => `"${kpi.label}","${kpi.value}",${kpi.delta}%`),
        "",
        "POST TITLE,CHANNEL & DATE,REACH,ENGAGEMENT,LIKES,COMMENTS,SHARES,ENGAGEMENT GRADE",
        ...currentWorkspace.posts.map(
          (p) =>
            `"${p.title.replace(/"/g, '""')}","${p.meta.replace(/"/g, '""')}","${p.reach}","${p.engagement}","${p.likes}","${p.comments}","${p.shares}","${p.score}"`,
        ),
      ];

      const csvContent = csvLines.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `${currentWorkspace.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-performance-report.csv`,
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Report downloaded!", {
        description: `${currentWorkspace.name}-performance-report.csv has been saved to your downloads.`,
      });

      addNotification(
        `Exported performance report for workspace "${currentWorkspace.name}".`,
        "📊",
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate report.");
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-glass-border bg-background/30 px-6 backdrop-blur-md md:px-10">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Welcome back, Alex
        </p>
        <h1 className="font-display text-lg font-semibold text-foreground">
          Performance Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="hidden items-center gap-2 rounded-xl border border-glass-border bg-glass px-3 py-2 md:flex">
          <Search className="size-4 text-muted-foreground" strokeWidth={1.75} />
          <input
            placeholder="Search posts, audience, campaigns…"
            className="w-64 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="rounded border border-glass-border bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-glass-border bg-glass px-3 py-2 text-xs font-medium text-foreground transition-all hover:bg-white/5">
          <Calendar className="size-4 text-muted-foreground" strokeWidth={1.75} />
          Last 30 days
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative grid size-10 place-items-center rounded-xl border border-glass-border bg-glass transition-all hover:bg-white/5 cursor-pointer"
          >
            <Bell className="size-4 text-foreground" strokeWidth={1.75} />
            {notifications.length > 0 && (
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-accent-pink" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-glass-border bg-[#171424]/95 p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-glass-border/40 mb-3">
                <span className="text-xs font-bold text-foreground">Recent Updates</span>
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="text-[10px] text-muted-foreground hover:text-foreground cursor-pointer flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="size-3" />
                    <span>Clear all</span>
                  </button>
                )}
              </div>
              <div className="space-y-3.5 max-h-[250px] overflow-y-auto pr-1">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="flex gap-3 text-xs text-muted-foreground hover:text-foreground transition-all pb-2.5 border-b border-white/[0.02] last:border-0 last:pb-0"
                    >
                      <span className="text-base shrink-0 select-none">{n.icon}</span>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground leading-relaxed">{n.message}</p>
                        <p className="text-[9px] text-muted-foreground/50 mt-1 font-mono">
                          {n.time}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground/80">All caught up!</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-1">
                      No new updates or alerts.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex -space-x-2">
          <img
            src={avatar1}
            alt="Alex"
            width={32}
            height={32}
            loading="lazy"
            className="size-9 rounded-full object-cover outline-2 outline-background ring-1 ring-glass-border"
          />
          <img
            src={avatar2}
            alt="Team"
            width={32}
            height={32}
            loading="lazy"
            className="size-9 rounded-full object-cover outline-2 outline-background ring-1 ring-glass-border"
          />
        </div>

        <button
          onClick={handleExport}
          className="rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-background shadow-[0_0_0_1px_oklch(1_0_0/0.1)] transition-all hover:brightness-110 cursor-pointer"
        >
          Export
        </button>
      </div>
    </header>
  );
}
