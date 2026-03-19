import { Outlet, Link, useLocation } from "react-router";
import { Home, ShoppingCart, Package, Factory, Menu } from "lucide-react";

export function MobileLayout() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/sales", label: "Sales", icon: ShoppingCart },
    { path: "/manufacturing", label: "Manufacturing", icon: Factory },
    { path: "/products", label: "Products", icon: Package },
    { path: "/more", label: "More", icon: Menu },
  ];

  return (
    <div className="flex flex-col h-screen bg-background max-w-[480px] mx-auto">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border z-50 max-w-[480px] mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}