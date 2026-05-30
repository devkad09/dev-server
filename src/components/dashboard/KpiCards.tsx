import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useStudio } from "@/context/StudioContext";

type Kpi = {
  label: string;
  value: string;
  delta: number;
  series: number[];
  tone: "blue" | "purple" | "pink" | "emerald";
};

const toneMap: Record<Kpi["tone"], { stroke: string; fill: string }> = {
  blue: { stroke: "var(--accent-blue)", fill: "var(--accent-blue)" },
  purple: { stroke: "var(--accent-purple)", fill: "var(--accent-purple)" },
  pink: { stroke: "var(--accent-pink)", fill: "var(--accent-pink)" },
  emerald: { stroke: "var(--success)", fill: "var(--success)" },
};

export function KpiCards() {
  const { currentWorkspace } = useStudio();
  const data = currentWorkspace.kpiData;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {data.map((kpi) => {
        const positive = kpi.delta >= 0;
        const tone = toneMap[kpi.tone];
        const chartData = kpi.series.map((v, i) => ({ i, v }));
        const gradId = `g-${kpi.label.replace(/\s+/g, "")}-${currentWorkspace.id}`;
        return (
          <div
            key={kpi.label}
            className="glass-panel group relative overflow-hidden rounded-3xl p-6 transition-all hover:border-white/15 animate-in fade-in duration-300"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <span
                className={[
                  "flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium",
                  positive ? "bg-success/10 text-success" : "bg-danger/10 text-danger",
                ].join(" ")}
              >
                {positive ? (
                  <ArrowUpRight className="size-3" />
                ) : (
                  <ArrowDownRight className="size-3" />
                )}
                {Math.abs(kpi.delta).toFixed(1)}%
              </span>
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground">
              {kpi.value}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">vs last month</p>

            <div className="mt-4 h-12 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={tone.fill} stopOpacity={0.5} />
                      <stop offset="100%" stopColor={tone.fill} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={tone.stroke}
                    strokeWidth={2}
                    fill={`url(#${gradId})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}
