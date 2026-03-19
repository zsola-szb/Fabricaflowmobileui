import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  ShoppingCart,
  Package,
  Receipt,
  Users,
  ChevronDown,
  Plus,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const salesData = [
  { day: "Mon", sales: 4000 },
  { day: "Tue", sales: 3000 },
  { day: "Wed", sales: 5000 },
  { day: "Thu", sales: 2780 },
  { day: "Fri", sales: 1890 },
  { day: "Sat", sales: 2390 },
  { day: "Sun", sales: 3490 },
];

const recentActivities = [
  { id: 1, type: "Sale", customer: "John Doe", amount: "Br 1,250.00", time: "2 hours ago" },
  { id: 2, type: "Expense", customer: "Office Supplies", amount: "Br 350.00", time: "4 hours ago" },
  { id: 3, type: "Sale", customer: "Jane Smith", amount: "Br 890.00", time: "5 hours ago" },
];

export function Home() {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 text-slate-50">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome, Solomon 👋</h1>
            <p className="text-slate-400 text-sm mt-1">Here's your business overview</p>
          </div>
          <button className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-white/15 transition-colors">
            <span className="text-sm">{selectedLocation}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Metrics Cards - Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <Card className="min-w-[160px] bg-white/10 backdrop-blur-md border-white/10 p-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-orange-500" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-slate-400 text-xs">Total Sales</p>
            <p className="text-xl font-bold text-white">Br 0.00</p>
          </Card>

          <Card className="min-w-[160px] bg-white/10 backdrop-blur-md border-white/10 p-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-xs text-green-400 font-medium">+12%</span>
            </div>
            <p className="text-slate-400 text-xs">Net Profit</p>
            <p className="text-xl font-bold text-white">Br 0.00</p>
          </Card>

          <Card className="min-w-[160px] bg-white/10 backdrop-blur-md border-white/10 p-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <TrendingDown className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-slate-400 text-xs">Invoice Due</p>
            <p className="text-xl font-bold text-white">Br 0.00</p>
          </Card>

          <Card className="min-w-[160px] bg-white/10 backdrop-blur-md border-white/10 p-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Receipt className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <p className="text-slate-400 text-xs">Expenses</p>
            <p className="text-xl font-bold text-white">Br 0.00</p>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background rounded-t-3xl mt-2 min-h-screen">
        {/* Quick Actions */}
        <div className="px-4 pt-6">
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-3 mb-6">
            <button className="flex flex-col items-center gap-2 p-3 bg-card/60 backdrop-blur-md border border-border rounded-2xl active:scale-95 transition-transform">
              <div className="p-3 bg-accent/10 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-accent" />
              </div>
              <span className="text-xs font-medium">Add Sale</span>
            </button>

            <button className="flex flex-col items-center gap-2 p-3 bg-card/60 backdrop-blur-md border border-border rounded-2xl active:scale-95 transition-transform">
              <div className="p-3 bg-accent/10 rounded-xl">
                <Package className="w-6 h-6 text-accent" />
              </div>
              <span className="text-xs font-medium">Add Product</span>
            </button>

            <button className="flex flex-col items-center gap-2 p-3 bg-card/60 backdrop-blur-md border border-border rounded-2xl active:scale-95 transition-transform">
              <div className="p-3 bg-accent/10 rounded-xl">
                <Receipt className="w-6 h-6 text-accent" />
              </div>
              <span className="text-xs font-medium">Add Expense</span>
            </button>

            <button className="flex flex-col items-center gap-2 p-3 bg-card/60 backdrop-blur-md border border-border rounded-2xl active:scale-95 transition-transform">
              <div className="p-3 bg-accent/10 rounded-xl">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <span className="text-xs font-medium">Add Contact</span>
            </button>
          </div>

          {/* Chart */}
          <Card className="p-4 rounded-2xl backdrop-blur-md border border-border mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Sales Last 30 Days</h3>
              <button className="text-accent text-sm font-medium">View All</button>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    color: "#f8fafc",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ fill: "#f97316", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Recent Activity */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Recent Activity</h3>
              <button className="text-accent text-sm font-medium">See All</button>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <Card key={activity.id} className="p-4 rounded-xl backdrop-blur-md border border-border">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          activity.type === "Sale" ? "bg-green-500/20" : "bg-red-500/20"
                        }`}
                      >
                        {activity.type === "Sale" ? (
                          <ShoppingCart
                            className={`w-5 h-5 ${
                              activity.type === "Sale" ? "text-green-400" : "text-red-400"
                            }`}
                          />
                        ) : (
                          <Receipt className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{activity.customer}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{activity.amount}</p>
                      <p className="text-xs text-muted-foreground">{activity.type}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-accent shadow-[0_0_20px_rgba(249,115,22,0.4)] rounded-full flex items-center justify-center active:scale-95 transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]">
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
