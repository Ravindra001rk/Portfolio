import React from "react";
import {
  Layout,
  CheckCircle2,
  Smartphone,
  Shield,
  Database,
  Search,
} from "lucide-react";

export type ProjectFeature = {
  icon: JSX.Element;
  color: string;
  title: string;
  desc: string;
};

export type StackItem = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  slug: string;
  category: string;
  title: string;
  shortDesc: string;
  tags: string[];
  liveUrl?: string;
  heroImage: string;
  features: ProjectFeature[];
  stack: StackItem[];
};

export const projects: Project[] = [
  {
    id: "1",
    slug: "id-card-system",
    category: "Featured Case Study",
    title: "A complete system for ID cards, photo retrieval and workflows.",
    shortDesc:
      "A full-stack platform handling thousands of Office & School ID card applications with bilingual forms, real-time tracking, and automated SMS notifications.",
    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "Sparrow SMS",
      "Cloudinary",
      "Vercel",
    ],
    liveUrl: "https://www.kritisublimation.com.np/",
    heroImage: "/download.png",
    features: [
      {
        icon: <Layout className="w-5 h-5" />,
        color: "from-blue-500 to-cyan-400",
        title: "Product Showcase",
        desc: "Slug-based product routing with multi-image upload, rich descriptions, and full admin controls.",
      },
      {
        icon: <CheckCircle2 className="w-5 h-5" />,
        color: "from-emerald-500 to-teal-400",
        title: "Status Tracking",
        desc: "Real-time pipeline: Pending → Approved → Printing → Ready. Shareable per-application URLs.",
      },
      {
        icon: <Smartphone className="w-5 h-5" />,
        color: "from-orange-500 to-amber-400",
        title: "Sparrow SMS",
        desc: "Auto-SMS alerts via Sparrow API on approval, rejection, and readiness — in Nepali with direct links.",
      },
      {
        icon: <Shield className="w-5 h-5" />,
        color: "from-purple-500 to-violet-400",
        title: "User Accounts",
        desc: "Customer dashboards with submission history, live status, and revision portals for rejected apps.",
      },
      {
        icon: <Search className="w-5 h-5" />,
        color: "from-zinc-400 to-zinc-200",
        title: "Photo Retrieval",
        desc: "Admin-uploaded photos tagged by phone number. Customers download their own photos instantly.",
      },
      {
        icon: <Database className="w-5 h-5" />,
        color: "from-cyan-500 to-blue-400",
        title: "Admin Panel",
        desc: "Hidden-URL dashboard with school/office grouping, Excel export, SMS override, and status control.",
      },
    ],
    stack: [
      { label: "Frontend", value: "React + Vite + Tailwind CSS" },
      { label: "Animations", value: "Framer Motion" },
      { label: "Backend", value: "Node.js + Express (Render)" },
      { label: "Database", value: "MongoDB Atlas" },
      { label: "Images", value: "Cloudinary" },
      { label: "SMS", value: "Sparrow SMS API" },
      { label: "Hosting", value: "Vercel + Render" },
      { label: "Domain", value: ".com.np custom domain" },
    ],
  },
];
