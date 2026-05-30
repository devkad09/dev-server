import React, { useState } from "react";
import { Heart, MessageCircle, Repeat2, Plus, X, Sparkles } from "lucide-react";
import { useStudio } from "@/context/StudioContext";
import { toast } from "sonner";
import post1 from "@/assets/post-1.jpg";
import post2 from "@/assets/post-2.jpg";
import post3 from "@/assets/post-3.jpg";
import post4 from "@/assets/post-4.jpg";

type Score = "HIGH" | "MED" | "LOW";

const scoreClass: Record<Score, string> = {
  HIGH: "bg-success/10 text-success",
  MED: "bg-accent-blue/10 text-accent-blue",
  LOW: "bg-danger/10 text-danger",
};

const defaultImages = [
  { name: "Post 1", src: post1 },
  { name: "Post 2", src: post2 },
  { name: "Post 3", src: post3 },
  { name: "Post 4", src: post4 },
];

export function TopPosts() {
  const { currentWorkspace, addPost } = useStudio();
  const posts = currentWorkspace.posts;

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState<"Instagram" | "LinkedIn" | "TikTok">("Instagram");
  const [selectedImg, setSelectedImg] = useState(post1);

  // Live simulation variables derived from title/caption length
  const captionLength = title.trim().length;
  const simulatedReach = captionLength > 0 ? `${(captionLength * 1.5 + 10).toFixed(1)}k` : "0.0k";
  const simulatedEngagement =
    captionLength > 0 ? `${(3.2 + (captionLength % 7) * 0.8).toFixed(1)}%` : "0.0%";
  const simulatedLikes = captionLength > 0 ? `${Math.floor(captionLength * 88 + 120)}` : "0";
  const simulatedComments = captionLength > 0 ? `${Math.floor(captionLength * 12 + 15)}` : "0";
  const simulatedShares = captionLength > 0 ? `${Math.floor(captionLength * 16 + 8)}` : "0";
  const simulatedScore: Score = captionLength > 30 ? "HIGH" : captionLength > 10 ? "MED" : "LOW";

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a post caption.");
      return;
    }

    addPost({
      title: title.trim(),
      platform,
      reach: simulatedReach,
      engagement: simulatedEngagement,
      likes: simulatedLikes,
      comments: simulatedComments,
      shares: simulatedShares,
      score: simulatedScore,
      img: selectedImg,
    });

    toast.success("Post published successfully!", {
      description: `Your update was pushed to ${platform}.`,
    });

    // Reset fields
    setTitle("");
    setPlatform("Instagram");
    setSelectedImg(post1);
    setIsCreateOpen(false);
  };

  return (
    <>
      <div className="glass-panel overflow-hidden rounded-3xl animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-glass-border p-6">
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
              Top Performing Posts
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Ranked by composite engagement score
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCreateOpen(true)}
              className="text-xs font-semibold text-accent-blue hover:text-accent-blue/80 transition-colors cursor-pointer flex items-center gap-1 bg-accent-blue/10 px-3 py-1.5 rounded-lg border border-accent-blue/20"
            >
              <Plus className="size-3.5" />
              <span>Create Post</span>
            </button>
            <button className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
              View all →
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="px-6 py-4 font-semibold">Post</th>
                <th className="px-6 py-4 font-semibold">Reach</th>
                <th className="px-6 py-4 font-semibold">Engagement</th>
                <th className="px-6 py-4 font-semibold">Breakdown</th>
                <th className="px-6 py-4 font-semibold">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {posts.map((p, idx) => (
                <tr key={`${p.title}-${idx}`} className="transition-colors hover:bg-white/[0.025]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={p.img}
                        alt={p.title}
                        width={48}
                        height={48}
                        loading="lazy"
                        className="size-12 shrink-0 rounded-xl object-cover ring-1 ring-glass-border"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate max-w-[240px]">
                          {p.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{p.meta}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-display text-sm tabular-nums text-foreground">
                    {p.reach}
                  </td>
                  <td className="px-6 py-4 font-display text-sm tabular-nums text-foreground">
                    {p.engagement}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="size-3.5" strokeWidth={1.75} />
                        {p.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="size-3.5" strokeWidth={1.75} />
                        {p.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Repeat2 className="size-3.5" strokeWidth={1.75} />
                        {p.shares}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-bold ${scoreClass[p.score]}`}
                    >
                      {p.score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE POST MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 px-4 py-6 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="glass-panel relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#161224]/90 p-6 md:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
            style={{
              boxShadow: "0 0 80px -10px oklch(0.78 0.16 230 / 0.25)",
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-glass-border/40 pb-4">
              <div>
                <h3 className="font-display text-xl font-extrabold text-foreground">
                  Create Update
                </h3>
                <p className="text-xs text-muted-foreground">
                  Simulate and publish a new post to the workspace feeds
                </p>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-muted-foreground transition-all hover:bg-white/10 hover:text-foreground cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleCreatePost} className="mt-6 space-y-5">
              {/* Platform Selector */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Select Channel / Platform
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Instagram", "LinkedIn", "TikTok"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlatform(p)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        platform === p
                          ? "bg-white/10 text-foreground border-white/20 shadow-md"
                          : "border-glass-border text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Caption Input */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Caption / Post Text
                </label>
                <textarea
                  placeholder="What is this update about? e.g. Typography trends to watch in 2026..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  rows={3}
                  className="w-full rounded-xl border border-glass-border bg-white/5 px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-accent-purple focus:bg-white/10 focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Image Selector */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Select Visual Asset
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {defaultImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImg(img.src)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                        selectedImg === img.src ? "border-accent-purple" : "border-transparent"
                      }`}
                    >
                      <img src={img.src} alt={img.name} className="object-cover w-full h-full" />
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Simulation Widget */}
              <div className="rounded-2xl border border-glass-border/60 bg-white/[0.02] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-accent-purple uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="size-3.5" />
                    AI Engagement Predictor
                  </span>
                  {captionLength > 0 && (
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${scoreClass[simulatedScore]}`}
                    >
                      Score: {simulatedScore}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-1.5 border-t border-glass-border/30">
                  <div>
                    <span className="block text-[10px] text-muted-foreground">Estimated Reach</span>
                    <span className="font-display font-semibold text-foreground text-sm">
                      {simulatedReach}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted-foreground">Avg. Engagement</span>
                    <span className="font-display font-semibold text-foreground text-sm">
                      {simulatedEngagement}
                    </span>
                  </div>
                </div>

                {captionLength > 0 && (
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground/60 border-t border-glass-border/30 pt-2 font-mono">
                    <span className="flex items-center gap-1">
                      <Heart className="size-3" /> {simulatedLikes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="size-3" /> {simulatedComments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Repeat2 className="size-3" /> {simulatedShares}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2.5 pt-3 border-t border-glass-border/40">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl border border-glass-border bg-white/5 text-xs font-semibold text-foreground transition-all hover:bg-white/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-xs font-semibold text-background transition-all hover:brightness-110 cursor-pointer"
                >
                  Publish Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
