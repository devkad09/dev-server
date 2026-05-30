import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useStudio } from "@/context/StudioContext";

export function PlatformSplit() {
  const { currentWorkspace } = useStudio();
  const splits = currentWorkspace.platformSplit;

  return (
    <div className="glass-panel flex h-[420px] flex-col rounded-3xl p-6 md:p-8 animate-in fade-in duration-300">
      <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
        Platform Split
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">Share of total engagement</p>

      <div className="relative mx-auto mt-4 h-44 w-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={splits}
              dataKey="value"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={3}
              stroke="none"
            >
              {splits.map((s) => (
                <Cell key={s.name} fill={s.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-bold text-foreground">100%</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            audience
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {splits.map((s) => (
          <div key={s.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-foreground">
                <span className="size-2 rounded-full" style={{ background: s.color }} />
                {s.name}
              </span>
              <span className="font-display font-semibold tabular-nums text-foreground">
                {s.value}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full"
                style={{ width: `${s.value}%`, background: s.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
