import {
  Users,
  Package,
  Factory,
  ShoppingBag,
  RefreshCcw,
  BarChart3,
  Settings,
  User,
  LogOut,
  ChevronRight,
  Building2,
  Truck,
  Boxes,
  FileSpreadsheet,
  ClipboardCheck,
  Recycle,
  Settings2,
  DollarSign,
  Wallet,
  CreditCard,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Link, useNavigate } from "react-router";

const menuSections = [
  {
    title: "Sales & POS",
    items: [
      { label: "Point of Sale", icon: CreditCard, color: "bg-accent/10 text-accent", path: "/pos" },
      { label: "Sales Dashboard", icon: ShoppingBag, color: "bg-green-500/10 text-green-400", path: "/sales" },
    ],
  },
  {
    title: "Finance & Accounting",
    items: [
      { label: "Finance Dashboard", icon: DollarSign, color: "bg-green-500/10 text-green-400", path: "/finance" },
      { label: "Accounts", icon: Wallet, color: "bg-blue-500/10 text-blue-400", path: "/finance" },
      { label: "Reports", icon: BarChart3, color: "bg-purple-500/10 text-purple-400", path: "/finance" },
    ],
  },
  {
    title: "Core Modules",
    items: [
      { label: "Contacts", icon: Users, color: "bg-accent/10 text-accent", path: "/contacts" },
      { label: "Purchases", icon: ShoppingBag, color: "bg-green-500/10 text-green-400", path: "/purchases" },
      { label: "Stock Management", icon: Boxes, color: "bg-yellow-500/10 text-yellow-400", path: "/stock" },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Stock Transfers", icon: RefreshCcw, color: "bg-amber-500/10 text-amber-400", path: "/transfers" },
      { label: "Shipments", icon: Truck, color: "bg-violet-500/10 text-violet-400", path: "/shipments" },
      { label: "Locations", icon: Building2, color: "bg-pink-500/10 text-pink-400", path: "/locations" },
    ],
  },
];

export function More() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-8 text-slate-50">
        <h1 className="text-2xl font-bold mb-2">More</h1>
        <p className="text-slate-400 text-sm">Access all features and settings</p>
      </div>

      <div className="px-4 -mt-2">
        {/* User Profile Card */}
        <Link to="/profile">
          <Card className="p-4 rounded-2xl backdrop-blur-md border border-border mb-6 active:scale-95 transition-transform">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-orange-600 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Solomon Zefine</h3>
                <p className="text-sm text-muted-foreground">Superadmin</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        </Link>

        {/* Menu Sections */}
        {menuSections.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              {section.title}
            </h3>
            <Card className="rounded-2xl backdrop-blur-md border border-border overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={itemIndex}
                    to={item.path}
                    className={`w-full flex items-center gap-3 p-4 active:bg-accent/5 transition-colors ${
                      itemIndex !== section.items.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="flex-1 text-left font-medium">
                      {item.label}
                    </span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </Link>
                );
              })}
            </Card>
          </div>
        ))}

        {/* Settings Section */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            System
          </h3>
          <Card className="rounded-2xl backdrop-blur-md border border-border overflow-hidden">
            <Link
              to="/settings"
              className="w-full flex items-center gap-3 p-4 border-b border-border active:bg-accent/5 transition-colors"
            >
              <div className="p-2.5 rounded-xl bg-slate-500/10 text-slate-400">
                <Settings className="w-5 h-5" />
              </div>
              <span className="flex-1 text-left font-medium">Settings</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <button
              className="w-full flex items-center gap-3 p-4 active:bg-red-500/5 transition-colors"
              onClick={() => navigate("/logout")}
            >
              <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="flex-1 text-left font-medium text-red-400">Logout</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </Card>
        </div>

        {/* App Info */}
        <div className="text-center pb-8 text-sm text-muted-foreground">
          <p>FabricaFlow Mobile</p>
          <p className="mt-1">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}