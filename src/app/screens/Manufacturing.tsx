import { useState } from "react";
import { Link } from "react-router";
import {
  Factory,
  ClipboardCheck,
  FileSpreadsheet,
  Package as PackageIcon,
  Settings2,
  Recycle,
  BarChart3,
  Plus,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  StopCircle,
  Search,
  Filter,
  AlertTriangle,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { AddPlanModal } from "../components/AddPlanModal";
import { RecordScrapModal } from "../components/RecordScrapModal";

const workOrders = [
  {
    id: "WO-001",
    productName: "Premium Widget A",
    status: "In Progress",
    stage: "Assembly",
    progress: 65,
    quantity: 100,
    completed: 65,
    startDate: "Mar 18, 2026",
    dueDate: "Mar 22, 2026",
    priority: "High",
  },
  {
    id: "WO-002",
    productName: "Standard Component B",
    status: "Pending",
    stage: "Planning",
    progress: 0,
    quantity: 250,
    completed: 0,
    startDate: "Mar 20, 2026",
    dueDate: "Mar 25, 2026",
    priority: "Medium",
  },
  {
    id: "WO-003",
    productName: "Custom Part C",
    status: "Quality Check",
    stage: "Inspection",
    progress: 95,
    quantity: 50,
    completed: 48,
    startDate: "Mar 15, 2026",
    dueDate: "Mar 19, 2026",
    priority: "High",
  },
  {
    id: "WO-004",
    productName: "Deluxe Model D",
    status: "Completed",
    stage: "Packaging",
    progress: 100,
    quantity: 75,
    completed: 75,
    startDate: "Mar 10, 2026",
    dueDate: "Mar 17, 2026",
    priority: "Low",
  },
];

const wipItems = [
  { stage: "Raw Materials", count: 12, value: "Br 45,200" },
  { stage: "In Production", count: 8, value: "Br 128,500" },
  { stage: "Quality Check", count: 3, value: "Br 32,100" },
  { stage: "Packaging", count: 5, value: "Br 18,900" },
];

const quickActions = [
  { label: "Work Orders", icon: ClipboardCheck, color: "bg-accent/10 text-accent", path: "/manufacturing/work-orders" },
  { label: "Production Plan", icon: FileSpreadsheet, color: "bg-purple-500/10 text-purple-400", path: "/manufacturing/planning" },
  { label: "Quality Control", icon: Settings2, color: "bg-green-500/10 text-green-400", path: "/manufacturing/quality" },
  { label: "Packaging", icon: PackageIcon, color: "bg-yellow-500/10 text-yellow-400", path: "/manufacturing/packaging" },
  { label: "Recycling", icon: Recycle, color: "bg-teal-500/10 text-teal-400", path: "/manufacturing/recycling" },
  { label: "Reports", icon: BarChart3, color: "bg-pink-500/10 text-pink-400", path: "/manufacturing/reports" },
];

export function Manufacturing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const [isRecordScrapModalOpen, setIsRecordScrapModalOpen] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      case "Completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "Pending":
        return <AlertCircle className="w-4 h-4" />;
      case "Quality Check":
        return <Settings2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Quality Check":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Medium":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Low":
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-24 text-slate-50">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Factory className="w-7 h-7 text-accent" />
              Manufacturing
            </h1>
            <p className="text-slate-400 text-sm mt-1">Production management hub</p>
          </div>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all ${
              isRefreshing ? "animate-spin" : ""
            }`}
          >
            <Recycle className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search work orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <button className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-xl hover:bg-white/15 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Cards - Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <Card className="min-w-[140px] bg-white/10 backdrop-blur-md border-white/10 p-4 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Clock className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <p className="text-slate-400 text-xs">Active Orders</p>
            <p className="text-2xl font-bold text-white">8</p>
          </Card>

          <Card className="min-w-[140px] bg-white/10 backdrop-blur-md border-white/10 p-4 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
            </div>
            <p className="text-slate-400 text-xs">Completed</p>
            <p className="text-2xl font-bold text-white">24</p>
          </Card>

          <Card className="min-w-[140px] bg-white/10 backdrop-blur-md border-white/10 p-4 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
            <p className="text-slate-400 text-xs">Pending</p>
            <p className="text-2xl font-bold text-white">5</p>
          </Card>

          <Card className="min-w-[140px] bg-white/10 backdrop-blur-md border-white/10 p-4 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Settings2 className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <p className="text-slate-400 text-xs">QC Review</p>
            <p className="text-2xl font-bold text-white">3</p>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-16">
        {/* Record Scrap Button */}
        <button
          onClick={() => setIsRecordScrapModalOpen(true)}
          className="w-full mb-4 p-4 bg-gradient-to-r from-red-500/90 to-red-600/90 backdrop-blur-md border border-red-400/30 rounded-2xl shadow-lg hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3 text-white"
        >
          <AlertTriangle className="w-6 h-6" />
          <div className="text-left">
            <p className="font-bold text-lg">Record Scrap</p>
            <p className="text-xs text-white/80">Track production waste & defects</p>
          </div>
        </button>

        {/* Quick Actions */}
        <Card className="p-4 rounded-2xl backdrop-blur-md border border-border mb-6">
          <h3 className="font-bold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  to={action.path}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-accent/5 active:scale-95 transition-all"
                >
                  <div className={`p-3 rounded-xl ${action.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-center">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* WIP Tracking */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">Work In Progress</h3>
            <Link to="/manufacturing/wip" className="text-accent text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {wipItems.map((item, index) => (
              <Card key={index} className="p-3 rounded-xl backdrop-blur-md border border-border">
                <p className="text-xs text-muted-foreground mb-1">{item.stage}</p>
                <p className="text-xl font-bold">{item.count}</p>
                <p className="text-xs text-accent mt-1">{item.value}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full bg-card/60 backdrop-blur-md border border-border rounded-xl p-1 mb-4">
            <TabsTrigger value="all" className="flex-1 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white text-xs">
              All
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="flex-1 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white text-xs">
              In Progress
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex-1 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white text-xs">
              Pending
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white text-xs">
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="space-y-3 mb-6">
              {workOrders.map((order) => (
                <Link key={order.id} to={`/manufacturing/work-orders/${order.id}`}>
                  <Card className="p-4 rounded-xl backdrop-blur-md border border-border hover:border-accent/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.productName}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs text-muted-foreground">Progress</p>
                        <p className="text-xs font-bold">{order.progress}%</p>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all"
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Quantity</p>
                        <p className="font-bold">
                          {order.completed}/{order.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Stage</p>
                        <p className="font-bold text-sm">{order.stage}</p>
                      </div>
                      <Badge className={getPriorityColor(order.priority)} variant="outline">
                        {order.priority}
                      </Badge>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="mt-0">
            <div className="space-y-3 mb-6">
              {workOrders
                .filter((order) => order.status === "In Progress")
                .map((order) => (
                  <Link key={order.id} to={`/manufacturing/work-orders/${order.id}`}>
                    <Card className="p-4 rounded-xl backdrop-blur-md border border-border">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.productName}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </Badge>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-muted-foreground">Progress</p>
                          <p className="text-xs font-bold">{order.progress}%</p>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full transition-all"
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-muted-foreground">Quantity</p>
                          <p className="font-bold">
                            {order.completed}/{order.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Stage</p>
                          <p className="font-bold text-sm">{order.stage}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-0">
            <div className="space-y-3 mb-6">
              {workOrders
                .filter((order) => order.status === "Pending")
                .map((order) => (
                  <Link key={order.id} to={`/manufacturing/work-orders/${order.id}`}>
                    <Card className="p-4 rounded-xl backdrop-blur-md border border-border">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.productName}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-muted-foreground">Quantity</p>
                          <p className="font-bold">{order.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Due Date</p>
                          <p className="font-bold text-sm">{order.dueDate}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            <div className="space-y-3 mb-6">
              {workOrders
                .filter((order) => order.status === "Completed")
                .map((order) => (
                  <Link key={order.id} to={`/manufacturing/work-orders/${order.id}`}>
                    <Card className="p-4 rounded-xl backdrop-blur-md border border-border">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.productName}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-muted-foreground">Quantity</p>
                          <p className="font-bold">{order.completed}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Completed</p>
                          <p className="font-bold text-sm">{order.startDate}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsAddPlanModalOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-accent shadow-[0_0_20px_rgba(249,115,22,0.4)] rounded-full flex items-center justify-center active:scale-95 transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] z-40"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Add Plan Modal */}
      <AddPlanModal isOpen={isAddPlanModalOpen} onClose={() => setIsAddPlanModalOpen(false)} />

      {/* Record Scrap Modal */}
      <RecordScrapModal isOpen={isRecordScrapModalOpen} onClose={() => setIsRecordScrapModalOpen(false)} />
    </div>
  );
}