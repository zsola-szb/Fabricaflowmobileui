import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Filter,
  Plus,
  ShoppingCart,
  FileText,
  ClipboardList,
  RotateCcw,
  Truck,
  Tag,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";

const salesList = [
  {
    id: "INV-001",
    customer: "John Doe",
    amount: "Br 1,250.00",
    status: "Paid",
    date: "Mar 18, 2026",
  },
  {
    id: "INV-002",
    customer: "Jane Smith",
    amount: "Br 890.00",
    status: "Pending",
    date: "Mar 17, 2026",
  },
  {
    id: "INV-003",
    customer: "Bob Wilson",
    amount: "Br 2,100.00",
    status: "Paid",
    date: "Mar 16, 2026",
  },
];

const draftsList = [
  { id: "DRF-001", customer: "Alice Brown", amount: "Br 450.00", date: "Mar 18, 2026" },
  { id: "DRF-002", customer: "Charlie Davis", amount: "Br 780.00", date: "Mar 17, 2026" },
];

const quickActions = [
  { label: "POS", icon: ShoppingCart, color: "bg-accent/10 text-accent" },
  { label: "Quotation", icon: FileText, color: "bg-green-500/10 text-green-400" },
  { label: "Draft", icon: ClipboardList, color: "bg-yellow-500/10 text-yellow-400" },
  { label: "Return", icon: RotateCcw, color: "bg-red-500/10 text-red-400" },
  { label: "Shipment", icon: Truck, color: "bg-purple-500/10 text-purple-400" },
  { label: "Discount", icon: Tag, color: "bg-pink-500/10 text-pink-400" },
];

export function Sales() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-24 text-slate-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sales</h1>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search sales..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <button className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-xl hover:bg-white/15 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-16">
        {/* Quick Actions */}
        <Card className="p-4 rounded-2xl backdrop-blur-md border border-border mb-6">
          <h3 className="font-bold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-accent/5 active:scale-95 transition-all"
                >
                  <div className={`p-3 rounded-xl ${action.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium">{action.label}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="w-full bg-card/60 backdrop-blur-md border border-border rounded-xl p-1 mb-4">
            <TabsTrigger value="sales" className="flex-1 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white">
              Sales
            </TabsTrigger>
            <TabsTrigger value="drafts" className="flex-1 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white">
              Drafts
            </TabsTrigger>
            <TabsTrigger value="quotations" className="flex-1 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white">
              Quotations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="mt-0">
            <div className="space-y-3 mb-6">
              {salesList.map((sale) => (
                <Link key={sale.id} to={`/sales/${sale.id}`}>
                  <Card className="p-4 rounded-xl backdrop-blur-md border border-border hover:border-accent/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold">{sale.id}</p>
                        <p className="text-sm text-muted-foreground">{sale.customer}</p>
                      </div>
                      <Badge
                        variant={sale.status === "Paid" ? "default" : "secondary"}
                        className={
                          sale.status === "Paid"
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/20 border-green-500/30"
                            : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 border-yellow-500/30"
                        }
                      >
                        {sale.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold">{sale.amount}</p>
                      <p className="text-sm text-muted-foreground">{sale.date}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drafts" className="mt-0">
            <div className="space-y-3 mb-6">
              {draftsList.map((draft) => (
                <Card key={draft.id} className="p-4 rounded-xl backdrop-blur-md border border-border">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold">{draft.id}</p>
                      <p className="text-sm text-muted-foreground">{draft.customer}</p>
                    </div>
                    <Badge className="bg-slate-500/20 text-slate-300 hover:bg-slate-500/20 border-slate-500/30">
                      Draft
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold">{draft.amount}</p>
                    <p className="text-sm text-muted-foreground">{draft.date}</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quotations" className="mt-0">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-accent" />
              </div>
              <p className="text-muted-foreground">No quotations yet</p>
              <p className="text-sm text-muted-foreground mt-1">Create your first quotation</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-accent shadow-[0_0_20px_rgba(249,115,22,0.4)] rounded-full flex items-center justify-center active:scale-95 transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] z-40">
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}