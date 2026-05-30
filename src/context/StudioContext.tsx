import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Clock,
  TrendingUp,
  Hash,
  Sparkles,
  AlertCircle,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import post1 from "@/assets/post-1.jpg";
import post2 from "@/assets/post-2.jpg";
import post3 from "@/assets/post-3.jpg";
import post4 from "@/assets/post-4.jpg";

export interface Notification {
  id: string;
  message: string;
  time: string;
  icon: string;
}

export interface Workspace {
  id: string;
  name: string;
  color: string;
  icon: string;
  kpiData: Array<{
    label: string;
    value: string;
    delta: number;
    series: number[];
    tone: "blue" | "purple" | "pink" | "emerald";
  }>;
  posts: Array<{
    title: string;
    meta: string;
    reach: string;
    engagement: string;
    likes: string;
    comments: string;
    shares: string;
    score: "HIGH" | "MED" | "LOW";
    img: string;
  }>;
  chartData: {
    Instagram: number[];
    LinkedIn: number[];
    TikTok: number[];
  };
  platformSplit: Array<{ name: string; value: number; color: string }>;
  auditScore: number;
  auditInsights: Array<{ icon: LucideIcon; title: string; body: string }>;
}

interface StudioContextType {
  isStudio: boolean;
  upgradeToStudio: () => void;
  downgradeFromStudio: () => void;
  workspaces: Workspace[];
  currentWorkspace: Workspace;
  activeWorkspaceId: string;
  setActiveWorkspaceId: (id: string) => void;
  addWorkspace: (name: string, color: string, icon: string) => boolean;
  isUpgradeModalOpen: boolean;
  setUpgradeModalOpen: (open: boolean) => void;
  addPost: (post: {
    title: string;
    platform: "Instagram" | "LinkedIn" | "TikTok";
    reach: string;
    engagement: string;
    likes: string;
    comments: string;
    shares: string;
    score: "HIGH" | "MED" | "LOW";
    img: string;
  }) => void;
  notifications: Notification[];
  clearNotifications: () => void;
  addNotification: (message: string, icon: string) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const initialWorkspaces: Workspace[] = [
  {
    id: "personal-brand",
    name: "Personal Brand",
    color: "var(--accent-purple)",
    icon: "👤",
    kpiData: [
      {
        label: "Total Impressions",
        value: "2.84M",
        delta: 12.4,
        tone: "blue",
        series: [12, 18, 14, 22, 19, 28, 25, 32, 30, 38, 36, 44],
      },
      {
        label: "Avg. Engagement",
        value: "4.62%",
        delta: 3.1,
        tone: "purple",
        series: [8, 12, 10, 14, 16, 13, 18, 17, 22, 20, 24, 26],
      },
      {
        label: "Reach",
        value: "1.24M",
        delta: 8.7,
        tone: "pink",
        series: [20, 16, 22, 19, 26, 24, 30, 28, 34, 31, 38, 40],
      },
      {
        label: "Conversion",
        value: "0.94%",
        delta: -0.2,
        tone: "emerald",
        series: [22, 24, 21, 20, 22, 19, 18, 19, 17, 18, 16, 17],
      },
    ],
    posts: [
      {
        title: "The Future of AI in Design",
        meta: "2 days ago · Instagram",
        reach: "142.8k",
        engagement: "12.4k",
        likes: "9.2k",
        comments: "1.4k",
        shares: "1.8k",
        score: "HIGH",
        img: post1,
      },
      {
        title: "Q3 Strategy Roadmap Revealed",
        meta: "5 days ago · LinkedIn",
        reach: "89.2k",
        engagement: "4.1k",
        likes: "2.8k",
        comments: "612",
        shares: "688",
        score: "MED",
        img: post2,
      },
      {
        title: "Behind the lens: Studio reset",
        meta: "1 week ago · Instagram",
        reach: "76.1k",
        engagement: "3.2k",
        likes: "2.4k",
        comments: "402",
        shares: "398",
        score: "MED",
        img: post3,
      },
      {
        title: "Workspace rituals that scale",
        meta: "2 weeks ago · TikTok",
        reach: "212.4k",
        engagement: "18.7k",
        likes: "14.1k",
        comments: "2.2k",
        shares: "2.4k",
        score: "HIGH",
        img: post4,
      },
    ],
    chartData: {
      Instagram: [24, 38, 32, 46, 52, 41, 58, 64, 72, 68, 84],
      LinkedIn: [12, 18, 22, 19, 28, 32, 30, 38, 42, 40, 48],
      TikTok: [8, 14, 12, 22, 18, 28, 26, 34, 30, 42, 52],
    },
    platformSplit: [
      { name: "Instagram", value: 54, color: "var(--accent-purple)" },
      { name: "LinkedIn", value: 32, color: "var(--accent-blue)" },
      { name: "TikTok", value: 14, color: "var(--accent-pink)" },
    ],
    auditScore: 84,
    auditInsights: [
      {
        icon: Clock,
        title: "Peak posting window",
        body: "Audience is most active 8–10pm EST. Schedule next 3 posts in this slot.",
      },
      {
        icon: TrendingUp,
        title: "Video dominance",
        body: "Short-form video drives 3.1× the comments of static carousels.",
      },
      {
        icon: Hash,
        title: "Hashtag drift",
        body: "#design and #ai outperform branded tags by 42%. Mix them in.",
      },
    ],
  },
  {
    id: "acme-corp",
    name: "Acme Corp (Client)",
    color: "var(--accent-blue)",
    icon: "🏢",
    kpiData: [
      {
        label: "Total Impressions",
        value: "14.2M",
        delta: 24.1,
        tone: "blue",
        series: [30, 45, 38, 55, 62, 58, 74, 82, 90, 88, 98, 112],
      },
      {
        label: "Avg. Engagement",
        value: "3.15%",
        delta: -1.5,
        tone: "purple",
        series: [14, 12, 13, 11, 12, 10, 11, 9, 10, 8, 9, 7.5],
      },
      {
        label: "Reach",
        value: "8.92M",
        delta: 18.3,
        tone: "pink",
        series: [45, 52, 48, 62, 58, 70, 68, 78, 74, 88, 85, 96],
      },
      {
        label: "Conversion",
        value: "2.45%",
        delta: 5.8,
        tone: "emerald",
        series: [10, 11, 13, 14, 16, 17, 19, 21, 20, 22, 23, 25],
      },
    ],
    posts: [
      {
        title: "Why Cloud Infrastructure Matters in 2026",
        meta: "3 days ago · LinkedIn",
        reach: "412.5k",
        engagement: "24.8k",
        likes: "18.2k",
        comments: "2.4k",
        shares: "4.2k",
        score: "HIGH",
        img: post2,
      },
      {
        title: "How we scaled to 10M active users",
        meta: "1 week ago · LinkedIn",
        reach: "289.4k",
        engagement: "14.2k",
        likes: "9.8k",
        comments: "1.2k",
        shares: "3.2k",
        score: "HIGH",
        img: post1,
      },
      {
        title: "Announcing our Series B funding",
        meta: "2 weeks ago · LinkedIn",
        reach: "680.1k",
        engagement: "48.2k",
        likes: "35.1k",
        comments: "5.8k",
        shares: "7.3k",
        score: "HIGH",
        img: post4,
      },
      {
        title: "Behind the Scenes at AcmeHQ",
        meta: "3 weeks ago · Instagram",
        reach: "92.4k",
        engagement: "3.1k",
        likes: "2.2k",
        comments: "310",
        shares: "590",
        score: "MED",
        img: post3,
      },
    ],
    chartData: {
      Instagram: [18, 22, 25, 20, 28, 30, 32, 28, 34, 38, 42],
      LinkedIn: [60, 72, 85, 90, 105, 115, 125, 140, 155, 170, 190],
      TikTok: [10, 12, 15, 18, 14, 22, 20, 26, 24, 30, 32],
    },
    platformSplit: [
      { name: "Instagram", value: 15, color: "var(--accent-purple)" },
      { name: "LinkedIn", value: 72, color: "var(--accent-blue)" },
      { name: "TikTok", value: 13, color: "var(--accent-pink)" },
    ],
    auditScore: 92,
    auditInsights: [
      {
        icon: Clock,
        title: "Executive prime-time",
        body: "B2B decision makers engage highest around Tuesdays/Thursdays 8–10 AM.",
      },
      {
        icon: TrendingUp,
        title: "SaaS guide value",
        body: "Carousel slide infographics gain 3.4× higher bookmark rates.",
      },
      {
        icon: Hash,
        title: "Branded tag penalty",
        body: "Overusing #acme reduces algorithmic reach by 18%. Shift to industry topics.",
      },
    ],
  },
  {
    id: "design-studio",
    name: "Design Studio",
    color: "var(--accent-pink)",
    icon: "🎨",
    kpiData: [
      {
        label: "Total Impressions",
        value: "840K",
        delta: 4.2,
        tone: "blue",
        series: [10, 12, 11, 14, 13, 16, 15, 18, 17, 20, 19, 21],
      },
      {
        label: "Avg. Engagement",
        value: "6.88%",
        delta: 11.2,
        tone: "purple",
        series: [15, 18, 20, 24, 22, 26, 28, 32, 30, 35, 34, 38],
      },
      {
        label: "Reach",
        value: "310K",
        delta: 5.1,
        tone: "pink",
        series: [25, 28, 26, 30, 29, 32, 31, 35, 33, 38, 36, 40],
      },
      {
        label: "Conversion",
        value: "1.20%",
        delta: 0.8,
        tone: "emerald",
        series: [15, 16, 17, 18, 17, 19, 18, 20, 19, 21, 20, 22],
      },
    ],
    posts: [
      {
        title: "Typography trends to watch in 2026",
        meta: "4 days ago · Instagram",
        reach: "85.2k",
        engagement: "8.4k",
        likes: "6.2k",
        comments: "812",
        shares: "1.4k",
        score: "HIGH",
        img: post3,
      },
      {
        title: "Case Study: Connect Redesign",
        meta: "1 week ago · Instagram",
        reach: "112.4k",
        engagement: "9.2k",
        likes: "7.1k",
        comments: "920",
        shares: "1.2k",
        score: "HIGH",
        img: post1,
      },
      {
        title: "Building a fluid layout in CSS",
        meta: "2 weeks ago · TikTok",
        reach: "198.5k",
        engagement: "15.4k",
        likes: "12.1k",
        comments: "1.8k",
        shares: "1.5k",
        score: "HIGH",
        img: post4,
      },
      {
        title: "Our remote workspace philosophy",
        meta: "3 weeks ago · LinkedIn",
        reach: "42.1k",
        engagement: "1.8k",
        likes: "1.2k",
        comments: "210",
        shares: "390",
        score: "MED",
        img: post2,
      },
    ],
    chartData: {
      Instagram: [45, 55, 62, 70, 85, 95, 110, 120, 135, 145, 160],
      LinkedIn: [5, 8, 10, 12, 10, 15, 18, 14, 20, 22, 25],
      TikTok: [25, 32, 38, 48, 55, 68, 75, 90, 102, 115, 130],
    },
    platformSplit: [
      { name: "Instagram", value: 58, color: "var(--accent-purple)" },
      { name: "LinkedIn", value: 12, color: "var(--accent-blue)" },
      { name: "TikTok", value: 30, color: "var(--accent-pink)" },
    ],
    auditScore: 78,
    auditInsights: [
      {
        icon: Clock,
        title: "Aesthetic consistency",
        body: "Visual grid alignment has raised profile click-through rate by 28%.",
      },
      {
        icon: TrendingUp,
        title: "Process videos",
        body: "Behind-the-scenes UI design videos convert 2.1× better than polished renders.",
      },
      {
        icon: Hash,
        title: "Niche hashtags",
        body: "#minimalism and #uidesign gain 4x target-audience saves compared to general design tags.",
      },
    ],
  },
];

const StudioContext = createContext<StudioContextType | undefined>(undefined);

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isStudio, setIsStudio] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("connect_is_studio") === "true";
    }
    return false;
  });

  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("connect_workspaces");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Array<
            Omit<Workspace, "auditInsights"> & {
              auditInsights: Array<{ title: string; body: string }>;
            }
          >;
          // Restore Lucide icon components based on saved names if needed,
          // but here we just map icons back or keep them as string icons.
          return parsed.map((w) => ({
            ...w,
            auditInsights: w.auditInsights.map((ins) => {
              if (
                ins.title.toLowerCase().includes("posting") ||
                ins.title.toLowerCase().includes("time")
              ) {
                return { ...ins, icon: Clock };
              }
              if (
                ins.title.toLowerCase().includes("trend") ||
                ins.title.toLowerCase().includes("video") ||
                ins.title.toLowerCase().includes("value")
              ) {
                return { ...ins, icon: TrendingUp };
              }
              return { ...ins, icon: Hash };
            }),
          }));
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialWorkspaces;
  });

  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("connect_active_workspace") || "personal-brand";
    }
    return "personal-brand";
  });

  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<string>("Overview");

  useEffect(() => {
    localStorage.setItem("connect_is_studio", String(isStudio));
  }, [isStudio]);

  useEffect(() => {
    localStorage.setItem("connect_active_workspace", activeWorkspaceId);
  }, [activeWorkspaceId]);

  useEffect(() => {
    // Save workspaces state, replacing icon components with simple strings to serialize
    const serializable = workspaces.map((w) => ({
      ...w,
      auditInsights: w.auditInsights.map((ins) => ({
        title: ins.title,
        body: ins.body,
      })),
    }));
    localStorage.setItem("connect_workspaces", JSON.stringify(serializable));
  }, [workspaces]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      message: "Engagement is up 12% on Instagram compared to last week.",
      time: "2 hours ago",
      icon: "📈",
    },
    {
      id: "2",
      message: "AI audit recommends posting at 9:15 AM EST on Monday.",
      time: "4 hours ago",
      icon: "🤖",
    },
    {
      id: "3",
      message: "Typography trends case study was published successfully.",
      time: "2 days ago",
      icon: "🎨",
    },
  ]);

  const addNotification = (message: string, icon: string) => {
    const newNotif: Notification = {
      id: String(Date.now()),
      message,
      time: "Just now",
      icon,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const upgradeToStudio = () => {
    setIsStudio(true);
    addNotification("Welcome to Connect Studio! Premium features unlocked.", "✨");
  };

  const downgradeFromStudio = () => {
    setIsStudio(false);
    setActiveWorkspaceId("personal-brand");
    addNotification("Switched back to free tier. Premium access disabled.", "🔄");
  };

  const addPost = (post: {
    title: string;
    platform: "Instagram" | "LinkedIn" | "TikTok";
    reach: string;
    engagement: string;
    likes: string;
    comments: string;
    shares: string;
    score: "HIGH" | "MED" | "LOW";
    img: string;
  }) => {
    const meta = `Just now · ${post.platform}`;
    const newPost = {
      title: post.title,
      meta,
      reach: post.reach,
      engagement: post.engagement,
      likes: post.likes,
      comments: post.comments,
      shares: post.shares,
      score: post.score,
      img: post.img,
    };

    setWorkspaces((prev) =>
      prev.map((w) => {
        if (w.id === activeWorkspaceId) {
          return {
            ...w,
            posts: [newPost, ...w.posts],
          };
        }
        return w;
      }),
    );

    addNotification(`Post "${post.title}" published successfully to ${post.platform}.`, "🚀");
  };

  const addWorkspace = (name: string, color: string, icon: string): boolean => {
    if (!isStudio) {
      setUpgradeModalOpen(true);
      return false;
    }

    const newId = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (workspaces.some((w) => w.id === newId)) {
      return false;
    }

    // Generate random stats for the new workspace to keep it interactive and realistic
    const randomMultiplier = 0.5 + Math.random() * 1.5;
    const newWorkspace: Workspace = {
      id: newId,
      name,
      color,
      icon,
      kpiData: [
        {
          label: "Total Impressions",
          value: `${(randomMultiplier * 4.5).toFixed(2)}M`,
          delta: Number((Math.random() * 30 - 10).toFixed(1)),
          tone: "blue",
          series: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50 + 10)),
        },
        {
          label: "Avg. Engagement",
          value: `${(randomMultiplier * 3.8).toFixed(2)}%`,
          delta: Number((Math.random() * 8 - 2).toFixed(1)),
          tone: "purple",
          series: Array.from({ length: 12 }, () => Math.floor(Math.random() * 20 + 5)),
        },
        {
          label: "Reach",
          value: `${(randomMultiplier * 1.9).toFixed(2)}M`,
          delta: Number((Math.random() * 15 - 5).toFixed(1)),
          tone: "pink",
          series: Array.from({ length: 12 }, () => Math.floor(Math.random() * 40 + 10)),
        },
        {
          label: "Conversion",
          value: `${(randomMultiplier * 1.1).toFixed(2)}%`,
          delta: Number((Math.random() * 4 - 2).toFixed(1)),
          tone: "emerald",
          series: Array.from({ length: 12 }, () => Math.floor(Math.random() * 15 + 5)),
        },
      ],
      posts: [
        {
          title: `${name} Announcement`,
          meta: "Just now · LinkedIn",
          reach: "10.5k",
          engagement: "812",
          likes: "600",
          comments: "112",
          shares: "100",
          score: "HIGH",
          img: post1,
        },
        {
          title: `Creative showcase: ${name}`,
          meta: "3 days ago · Instagram",
          reach: "8.2k",
          engagement: "340",
          likes: "280",
          comments: "35",
          shares: "25",
          score: "MED",
          img: post3,
        },
      ],
      chartData: {
        Instagram: Array.from({ length: 11 }, () => Math.floor(Math.random() * 60 + 10)),
        LinkedIn: Array.from({ length: 11 }, () => Math.floor(Math.random() * 60 + 10)),
        TikTok: Array.from({ length: 11 }, () => Math.floor(Math.random() * 60 + 10)),
      },
      platformSplit: [
        { name: "Instagram", value: 40, color: "var(--accent-purple)" },
        { name: "LinkedIn", value: 35, color: "var(--accent-blue)" },
        { name: "TikTok", value: 25, color: "var(--accent-pink)" },
      ],
      auditScore: Math.floor(Math.random() * 30 + 65),
      auditInsights: [
        {
          icon: Clock,
          title: "Audience activity spike",
          body: "Posts made in the late afternoon gain 25% higher interaction rates.",
        },
        {
          icon: TrendingUp,
          title: "Dynamic media bonus",
          body: "Attaching short videos or interactive GIFs drives higher clicks.",
        },
        {
          icon: Hash,
          title: "Tag optimization",
          body: "Focusing on niche, sector-specific hashtags outperforms general branding.",
        },
      ],
    };

    setWorkspaces((prev) => [...prev, newWorkspace]);
    setActiveWorkspaceId(newId);
    addNotification(`Created new workspace "${name}".`, "🏢");
    return true;
  };

  const currentWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  return (
    <StudioContext.Provider
      value={{
        isStudio,
        upgradeToStudio,
        downgradeFromStudio,
        workspaces,
        currentWorkspace,
        activeWorkspaceId,
        setActiveWorkspaceId: (id) => {
          if (!isStudio && id !== "personal-brand") {
            setUpgradeModalOpen(true);
          } else {
            setActiveWorkspaceId(id);
          }
        },
        addWorkspace,
        isUpgradeModalOpen,
        setUpgradeModalOpen,
        addPost,
        notifications,
        clearNotifications,
        addNotification,
        currentView,
        setCurrentView,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (context === undefined) {
    throw new Error("useStudio must be used within a StudioProvider");
  }
  return context;
};
