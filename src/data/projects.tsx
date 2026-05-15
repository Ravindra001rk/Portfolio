import React from "react";
import {
  Layout,
  CheckCircle2,
  Smartphone,
  Shield,
  Database,
  Search,
  ShoppingCart,
  Tag,
  Home,
  Settings,
  Sparkles,
  Trophy,
  Zap,
  MonitorSmartphone,
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
  categoryGroup?: string;
  title: string;
  shortDesc: string;
  tags: string[];
  liveUrl?: string;
  heroImage: string;
  features: ProjectFeature[];
  stack: StackItem[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "1",
    slug: "id-card-system",
    featured: true,
    category: "Featured Case Study",
    categoryGroup: "Printing",
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
  {
    id: "2",
    slug: "shabda-yatra-bookstore",
    featured: true,
    category: "Full Stack E-commerce",
    categoryGroup: "E-commerce",
    title: "MERN Stack E-commerce Book Store",
    shortDesc:
      "A comprehensive online bookstore for fiction, non-fiction, and novels with a dynamic shopping experience.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS"],
    liveUrl: "https://shabda-yatra-frontend.vercel.app/",
    heroImage: "/shabdayatra.png",
    features: [
      {
        icon: <ShoppingCart className="w-5 h-5" />,
        color: "from-blue-500 to-cyan-400",
        title: "Advanced Cart System",
        desc: "Seamless shopping cart with real-time updates and simplified checkout process.",
      },
      {
        icon: <Tag className="w-5 h-5" />,
        color: "from-emerald-500 to-teal-400",
        title: "Coupon Engine",
        desc: "Dynamic coupon application system integrated into both cart and checkout.",
      },
      {
        icon: <Home className="w-5 h-5" />,
        color: "from-orange-500 to-amber-400",
        title: "Dynamic Layouts",
        desc: "Customizable homepage with dynamic sections and flexible hero presentations.",
      },
      {
        icon: <Settings className="w-5 h-5" />,
        color: "from-purple-500 to-violet-400",
        title: "Admin Dashboard",
        desc: "Powerful administration tools to manage inventory, process orders, and control site content.",
      },
    ],
    stack: [
      { label: "Frontend", value: "React + Tailwind CSS" },
      { label: "Backend", value: "Node.js + Express" },
      { label: "Database", value: "MongoDB" },
      { label: "Hosting", value: "Vercel" },
    ],
  },
  {
    id: "3",
    slug: "vista-showcase",
    featured: false,
    category: "Award-Winning Frontend",
    categoryGroup: "Printing",
    title: "Vista - Premium Showcase Site",
    shortDesc:
      "An immersive, award-winning frontend experience crafted with React, GSAP, and Framer Motion for stunning visual storytelling.",
    tags: ["React", "GSAP", "Framer Motion", "Tailwind CSS", "Frontend"],
    liveUrl: "https://ravindra001rk.github.io/Vista/",
    heroImage: "/vista.png",
    features: [
      {
        icon: <Trophy className="w-5 h-5" />,
        color: "from-yellow-500 to-amber-400",
        title: "Award-Winning Design",
        desc: "Recognized for exceptional design, creativity, and innovative use of modern frontend web technologies.",
      },
      {
        icon: <Sparkles className="w-5 h-5" />,
        color: "from-purple-500 to-pink-400",
        title: "Immersive Animations",
        desc: "Complex, high-performance scroll and interaction animations powered by GSAP and Framer Motion.",
      },
      {
        icon: <MonitorSmartphone className="w-5 h-5" />,
        color: "from-blue-500 to-cyan-400",
        title: "Fluid Responsiveness",
        desc: "Flawless responsive layouts that maintain premium aesthetic quality across all device scales.",
      },
      {
        icon: <Zap className="w-5 h-5" />,
        color: "from-amber-500 to-orange-400",
        title: "Optimized Performance",
        desc: "Smooth 60fps rendering despite demanding animation workloads, ensuring a perfect user experience.",
      },
    ],
    stack: [
      { label: "Frontend", value: "React + Tailwind CSS" },
      { label: "Animations", value: "GSAP + Framer Motion" },
      { label: "Design", value: "Awwwards Grade Experience" },
      { label: "Hosting", value: "Vercel" },
    ],
  },
  {
    id: "4",
    slug: "horizon-academy",
    featured: true,
    category: "Educational ERP / School Portal",
    categoryGroup: "Education",
    title: "Horizon Academy - School Management System",
    shortDesc:
      "A comprehensive digital ecosystem for modern educational institutions, featuring automated workflows, role-based portals, and powerful administrative tools.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://horizon-academy-frontend.vercel.app",
    heroImage: "/horizon.png",
    features: [
      {
        icon: <Database className="w-5 h-5" />,
        color: "from-blue-500 to-cyan-400",
        title: "Bulk Data Import",
        desc: "Seamlessly import students and teachers from Excel with automated validation and credential generation.",
      },
      {
        icon: <Shield className="w-5 h-5" />,
        color: "from-emerald-500 to-teal-400",
        title: "Role-Based Portals",
        desc: "Dedicated interfaces for Admins, Teachers, and Students to manage grades, homework, and notices securely.",
      },
      {
        icon: <Layout className="w-5 h-5" />,
        color: "from-orange-500 to-amber-400",
        title: "Dynamic Homepage CMS",
        desc: "Fully editable public-facing site allowing admins to update news, events, and gallery directly from the dashboard.",
      },
      {
        icon: <Smartphone className="w-5 h-5" />,
        color: "from-purple-500 to-violet-400",
        title: "Results & Homework Tooling",
        desc: "Streamlined assignment submissions and grade processing using Excel result templates and server-side imports.",
      },
    ],
    stack: [
      { label: "Frontend", value: "React (v19) + Vite + Tailwind CSS" },
      { label: "Backend", value: "Node.js + Express" },
      { label: "Database", value: "MongoDB + Mongoose" },
      { label: "Authentication", value: "JWT Auth (Cookies)" },
      { label: "Storage", value: "Cloudinary + Multer" },
      { label: "Utilities", value: "xlsx, react-router-dom, Framer Motion" },
    ],
  },
  {
    id: "5",
    slug: "nexus-university",
    featured: true,
    category: "University Marketing Site",
    categoryGroup: "Education",
    title: "Nexus University — Turn Your Ambition into Achievement",
    liveUrl: "https://nexus-wine-xi.vercel.app/",

    shortDesc:
      "A marketing site showcasing Nexus University's programs, campus life, and admissions with engaging visuals and clear CTAs.",
    tags: ["Next.js", "Tailwind CSS", "Design", "Accessibility"],
    heroImage: "/nexus.png",
    features: [
      {
        icon: <Layout className="w-5 h-5" />,
        color: "from-blue-500 to-cyan-400",
        title: "Hero Showcase",
        desc: "Large, responsive hero with rounded imagery and compelling call-to-action buttons.",
      },
      {
        icon: <Sparkles className="w-5 h-5" />,
        color: "from-purple-500 to-pink-400",
        title: "Brand Experience",
        desc: "Polished UI with custom typography, soft gradients, and subtle depth.",
      },
      {
        icon: <Trophy className="w-5 h-5" />,
        color: "from-yellow-500 to-amber-400",
        title: "Metrics & Social Proof",
        desc: "Prominent stats, alumni avatars, and ranking badges to build trust.",
      },
      {
        icon: <MonitorSmartphone className="w-5 h-5" />,
        color: "from-emerald-500 to-teal-400",
        title: "Responsive & Accessible",
        desc: "Mobile-first layout with clear hierarchy and accessible controls.",
      },
    ],
    stack: [
      { label: "Frontend", value: "Next.js + Tailwind CSS" },
      { label: "Animations", value: "Framer Motion + Lenis" },
      { label: "Images", value: "Optimized SVG/AVIF assets" },
      { label: "Deployment", value: "Vercel" },
    ],
  },
];
