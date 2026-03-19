import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Moon,
  Sun,
  Bell,
  Lock,
  Globe,
  User,
  Palette,
  Database,
  Shield,
  ChevronRight,
} from "lucide-react";
import { Card } from "../components/ui/card";

export function Settings() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check initial theme
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const settingsSections = [
    {
      title: "Appearance",
      items: [
        {
          icon: isDarkMode ? Moon : Sun,
          label: "Dark Mode",
          description: "Toggle dark/light theme",
          action: toggleDarkMode,
          isToggle: true,
          value: isDarkMode,
        },
        {
          icon: Palette,
          label: "Theme Color",
          description: "Customize accent colors",
          hasArrow: true,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Profile Settings",
          description: "Manage your profile",
          hasArrow: true,
        },
        {
          icon: Lock,
          label: "Security",
          description: "Password and authentication",
          hasArrow: true,
        },
        {
          icon: Shield,
          label: "Privacy",
          description: "Control your privacy settings",
          hasArrow: true,
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          description: "Manage notification settings",
          hasArrow: true,
        },
        {
          icon: Globe,
          label: "Language & Region",
          description: "English (US)",
          hasArrow: true,
        },
        {
          icon: Database,
          label: "Data & Storage",
          description: "Manage app data",
          hasArrow: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-8 text-slate-50 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <p className="text-slate-400 text-sm ml-12">Customize your experience</p>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-2">
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              {section.title}
            </h3>
            <Card className="rounded-2xl backdrop-blur-md border border-border overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    className={`w-full flex items-center gap-3 p-4 active:bg-accent/5 transition-colors ${
                      itemIndex !== section.items.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    {item.isToggle ? (
                      <div
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          item.value ? "bg-accent" : "bg-slate-300 dark:bg-slate-600"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                            item.value ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </div>
                    ) : item.hasArrow ? (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    ) : null}
                  </button>
                );
              })}
            </Card>
          </div>
        ))}

        {/* About Section */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            About
          </h3>
          <Card className="p-4 rounded-2xl backdrop-blur-md border border-border text-center">
            <h3 className="font-bold text-lg mb-1">FabricaFlow Mobile</h3>
            <p className="text-sm text-muted-foreground mb-4">Version 1.0.0</p>
            <p className="text-xs text-muted-foreground">
              © 2026 FabricaFlow. All rights reserved.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
