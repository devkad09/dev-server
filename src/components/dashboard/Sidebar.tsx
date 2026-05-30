import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  Megaphone,
  BarChart3,
  Settings,
  LifeBuoy,
  ChevronDown,
  Plus,
  Check,
  Lock,
  RotateCcw,
} from "lucide-react";
import { useStudio } from "@/context/StudioContext";

const mainNav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Audience", icon: Users },
  { label: "Content Strategy", icon: Sparkles },
  { label: "Ad Performance", icon: Megaphone },
  { label: "Reports", icon: BarChart3 },
];

const bottomNav = [
  { label: "Settings", icon: Settings },
  { label: "Support", icon: LifeBuoy },
];

const emojis = ["🚀", "🏢", "🎨", "📈", "👥", "🛍️", "🌟"];
const colors = [
  { name: "Purple", value: "var(--accent-purple)" },
  { name: "Blue", value: "var(--accent-blue)" },
  { name: "Pink", value: "var(--accent-pink)" },
  { name: "Emerald", value: "var(--success)" },
];

export function Sidebar() {
  const {
    isStudio,
    workspaces,
    currentWorkspace,
    setActiveWorkspaceId,
    addWorkspace,
    setUpgradeModalOpen,
    downgradeFromStudio,
    currentView,
    setCurrentView,
  } = useStudio();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("🚀");
  const [newColor, setNewColor] = useState("var(--accent-purple)");

  const handleWorkspaceSelect = (id: string) => {
    if (!isStudio && id !== "personal-brand") {
      setUpgradeModalOpen(true);
    } else {
      setActiveWorkspaceId(id);
    }
    setDropdownOpen(false);
  };

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const success = addWorkspace(newName.trim(), newColor, newIcon);
    if (success) {
      setNewName("");
      setIsCreating(false);
      setDropdownOpen(false);
    }
  };

  const handleCreateClick = () => {
    if (!isStudio) {
      setUpgradeModalOpen(true);
      setDropdownOpen(false);
    } else {
      setIsCreating(true);
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-full w-64 flex-col border-r border-glass-border bg-background/40 backdrop-blur-2xl lg:flex">
      {/* Brand Header */}
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple shadow-[0_0_24px_-4px_oklch(0.78_0.16_230/0.6)]">
            <div className="size-4 rounded-full border-2 border-white/90" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Connect
          </span>
        </div>
      </div>

      {/* Workspace Switcher */}
      <div className="relative px-6 pb-6 border-b border-glass-border/40 mb-6">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center justify-between gap-3 rounded-xl border border-glass-border bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-white/10 cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-base shrink-0">{currentWorkspace.icon}</span>
            <span className="truncate text-foreground font-semibold">{currentWorkspace.name}</span>
          </div>
          <ChevronDown
            className="size-4 text-muted-foreground shrink-0 transition-transform duration-200"
            style={{ transform: dropdownOpen ? "rotate(180deg)" : "none" }}
          />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute left-6 right-6 mt-2 rounded-2xl border border-glass-border bg-[#171424] p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            {!isCreating ? (
              <>
                <p className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                  Select Workspace
                </p>
                <div className="space-y-0.5 max-h-[180px] overflow-y-auto">
                  {workspaces.map((w) => {
                    const isSelected = w.id === currentWorkspace.id;
                    const isLocked = !isStudio && w.id !== "personal-brand";
                    return (
                      <button
                        key={w.id}
                        onClick={() => handleWorkspaceSelect(w.id)}
                        className={[
                          "w-full flex items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-xs transition-all text-left",
                          isSelected
                            ? "bg-white/10 text-foreground font-medium"
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground cursor-pointer",
                        ].join(" ")}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-sm shrink-0">{w.icon}</span>
                          <span className="truncate">{w.name}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {isSelected && (
                            <Check className="size-3 text-accent-blue" strokeWidth={3} />
                          )}
                          {isLocked && <Lock className="size-3 text-muted-foreground/60" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="h-[1px] bg-glass-border/40 my-2" />

                <button
                  onClick={handleCreateClick}
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-glass-border py-2 text-xs font-semibold text-muted-foreground transition-all hover:border-white/30 hover:text-foreground cursor-pointer"
                >
                  <Plus className="size-3.5" />
                  <span>Add Workspace</span>
                  {!isStudio && <Lock className="size-3 text-muted-foreground/60 ml-0.5" />}
                </button>
              </>
            ) : (
              <form onSubmit={handleCreateWorkspace} className="p-3 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                    New Workspace
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="text-[10px] text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Workspace name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-glass-border bg-white/5 px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-accent-purple focus:outline-none"
                  />
                </div>

                {/* Emojis list */}
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Select Icon
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {emojis.map((e) => (
                      <button
                        key={e}
                        type="button"
                        onClick={() => setNewIcon(e)}
                        className={`size-6 flex items-center justify-center text-xs rounded transition-all hover:bg-white/10 ${newIcon === e ? "bg-white/15 scale-110" : ""}`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors list */}
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Select Color
                  </p>
                  <div className="flex gap-1.5">
                    {colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setNewColor(c.value)}
                        className="size-5 rounded-full border border-white/10 flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: c.value }}
                      >
                        {newColor === c.value && <div className="size-2 rounded-full bg-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple py-1.5 text-xs font-bold text-background transition-all hover:brightness-110 cursor-pointer"
                >
                  Create Workspace
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4">
        <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Views
        </p>
        <div className="space-y-1">
          {mainNav.map((item) => {
            const isActive = item.label === currentView;
            return (
              <a
                key={item.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentView(item.label);
                }}
                className={[
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all cursor-pointer",
                  isActive
                    ? "border border-glass-border bg-white/5 text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                ].join(" ")}
              >
                <item.icon className="size-4" strokeWidth={1.75} />
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Bottom Profile and Upgrade Panel */}
      <div className="px-4 pb-4">
        <div className="space-y-1">
          {bottomNav.map((item) => {
            const isActive = item.label === currentView;
            return (
              <a
                key={item.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentView(item.label);
                }}
                className={[
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all cursor-pointer",
                  isActive
                    ? "border border-glass-border bg-white/5 text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                ].join(" ")}
              >
                <item.icon className="size-4" strokeWidth={1.75} />
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Upgrade Card / Studio Badge */}
        {!isStudio ? (
          <div className="mt-4 overflow-hidden rounded-2xl border border-glass-border bg-gradient-to-br from-accent-purple/20 to-accent-blue/10 p-4">
            <p className="font-display text-sm font-semibold text-foreground">Upgrade to Studio</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Unlock AI audits and unlimited workspaces.
            </p>
            <button
              onClick={() => setUpgradeModalOpen(true)}
              className="mt-3 w-full rounded-lg bg-foreground py-1.5 text-xs font-semibold text-background transition-all hover:brightness-110 cursor-pointer"
            >
              See plans
            </button>
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-2xl border border-glass-border bg-gradient-to-br from-success/15 to-accent-blue/5 p-4">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-4 text-success animate-pulse" />
              <p className="font-display text-sm font-semibold text-foreground">Studio Active</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Unlimited workspaces and AI audits unlocked.
            </p>
            <button
              onClick={downgradeFromStudio}
              className="mt-3 w-full rounded-lg border border-glass-border bg-white/5 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-white/10 cursor-pointer flex items-center justify-center gap-1"
            >
              <RotateCcw className="size-3" />
              <span>Reset to Free</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
