import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStudio } from "@/context/StudioContext";

const days = [
  "Mar 01",
  "Mar 04",
  "Mar 07",
  "Mar 10",
  "Mar 13",
  "Mar 16",
  "Mar 19",
  "Mar 22",
  "Mar 25",
  "Mar 28",
  "Mar 31",
];

type Platform = "Instagram" | "LinkedIn" | "TikTok";
const platforms: Platform[] = ["Instagram", "LinkedIn", "TikTok"];

export function EngagementChart() {
  const { currentWorkspace } = useStudio();
  const [active, setActive] = useState<Platform>("Instagram");

  const seed = currentWorkspace.chartData;
  const series = days.map((d, i) => ({ day: d, value: seed[active]?.[i] || 0 }));

  return (
    <div className="glass-panel flex h-[420px] flex-col rounded-3xl p-6 md:p-8 animate-in fade-in duration-300">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
            Engagement Over Time
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Interactions across primary nodes — last 30 days
          </p>
        </div>
        <div className="flex rounded-xl border border-glass-border bg-glass p-1">
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setActive(p)}
              className={[
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
                active === p
                  ? "bg-white/10 text-foreground shadow-[0_0_0_1px_oklch(1_0_0/0.1)]"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ left: -10, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="oklch(0.66 0.02 250)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="oklch(0.66 0.02 250)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip
              cursor={{ stroke: "oklch(1 0 0 / 0.1)", strokeWidth: 1 }}
              contentStyle={{
                background: "oklch(0.21 0.03 265)",
                border: "1px solid oklch(1 0 0 / 0.1)",
                borderRadius: 12,
                fontSize: 12,
                color: "oklch(0.96 0.005 240)",
              }}
              labelStyle={{ color: "oklch(0.66 0.02 250)" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--accent-blue)"
              strokeWidth={2.5}
              fill="url(#engGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
