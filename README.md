# Connect — Multi-Platform Social Analytics Dashboard

Connect is a premium, real-time analytics dashboard designed to monitor engagement, audience demographics, and campaign performance across Instagram, LinkedIn, and TikTok. Built with a sleek glassmorphic dark-mode design system, it delivers actionable insights and simulations for personal creators and enterprise studios.

---

## 🌟 Key Features

*   **Multi-Platform Synchronization**: Seamlessly track and aggregate analytics (impressions, conversion rates, reach) from Instagram, LinkedIn, and TikTok.
*   **Connect Studio Upgrade System**: Toggle between a free plan and a premium Studio subscription (\$15/mo or \$144/yr) to unlock unlimited workspaces, API connections, and advanced features.
*   **Workspace Switcher**: Easily manage multiple profiles and brands via the sidebar switcher, complete with custom emojis, colors, and live state hydration.
*   **AI Content Ideator & Simulator**: Draft posts and receive real-time engagement score predictions (estimated reach, likes, comments, and engagement grades) before publishing to the feed.
*   **Dynamic Views**: 
    *   **Overview**: Key KPI metrics, engagement charts, platform splits, and recent posts.
    *   **Audience**: Follower growth curves, active hour matrices, and geographic demographic heatmaps.
    *   **Content Strategy**: Calendar schedules and AI outline generators.
    *   **Ad Performance**: Active paid campaigns tracking with ROI calculations.
    *   **Reports**: Dynamic CSV exports and PDF growth scan reports generator.
*   **Real-time Notifications**: A global alert feed documenting new posts, billing updates, and report exports.

---

## 🛠️ Technology Stack

*   **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (featuring file-based routing)
*   **Core**: React 18 & TypeScript
*   **Styling**: Tailwind CSS & Glassmorphism design primitives
*   **Icons**: Lucide React
*   **Notifications**: Sonner (toasts) & global context state management
*   **Runtime / Package Manager**: [Bun](https://bun.sh/) (or Node/NPM)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Bun** (recommended) or **Node.js** installed.

### Setup Instructions

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/devkad09/dev-server.git
    cd dev-server
    ```

2.  **Install Dependencies**:
    ```bash
    bun install
    # or using npm
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    bun run dev
    # or using npm
    npm run dev
    ```

    The application will be running locally at `http://localhost:8080/`.

4.  **Format and Lint**:
    ```bash
    bun run format
    bun run lint
    ```

---

## 📂 Codebase Architecture

*   `src/routes/`: TanStack file-based routing files.
    *   `src/routes/__root.tsx`: Global application shell, providers, and layout wrapper.
    *   `src/routes/index.tsx`: Core dashboard containing Overview, Audience, Reports, and Strategy sub-views.
*   `src/context/`: Core state machine.
    *   `StudioContext.tsx`: Manages workspace state, subscription upgrades, post creation, notifications, and navigation history.
*   `src/components/`: Modular design items.
    *   `dashboard/Sidebar.tsx`: Switcher dropdown and views navigation.
    *   `dashboard/Topbar.tsx`: Interactive bell alerts, search, and CSV export.
    *   `dashboard/UpgradeModal.tsx`: Simulated premium payment and checkout.
