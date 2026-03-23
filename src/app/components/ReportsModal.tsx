import { useState } from "react";
import {
  X,
  BarChart3,
  TrendingUp,
  PackageCheck,
  AlertCircle,
  Calendar,
  Download,
  Filter,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Box,
  Recycle,
  Package as PackageIcon,
} from "lucide-react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportsModal({ isOpen, onClose }: ReportsModalProps) {
  const [selectedDateRange, setSelectedDateRange] = useState("this-month");

  if (!isOpen) return null;

  // Mock data for reports
  const productionReports = [
    {
      id: 1,
      name: "Daily Production Summary",
      description: "Overview of daily production activities",
      icon: BarChart3,
      stats: { total: "1,245 units", efficiency: "87%", downtime: "2.5 hrs" },
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 2,
      name: "Work Order Completion",
      description: "Status and completion rates",
      icon: CheckCircle2,
      stats: { completed: "24", inProgress: "8", pending: "5" },
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: 3,
      name: "Machine Utilization",
      description: "Equipment usage and efficiency",
      icon: TrendingUp,
      stats: { utilization: "92%", activeTime: "18.5 hrs", idle: "3 hrs" },
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      id: 4,
      name: "Stage Performance",
      description: "Production stage metrics",
      icon: Clock,
      stats: { avgCycle: "45 min", throughput: "156 units/hr", bottleneck: "Assembly" },
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const qualityReports = [
    {
      id: 1,
      name: "Quality Control Summary",
      description: "Overall quality metrics",
      icon: PackageCheck,
      stats: { passRate: "94.5%", inspected: "1,245", rejected: "68" },
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: 2,
      name: "Defect Analysis",
      description: "Common defects and causes",
      icon: AlertCircle,
      stats: { defects: "68", topIssue: "Surface finish", trend: "-12%" },
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      id: 3,
      name: "Inspector Performance",
      description: "QC team efficiency",
      icon: CheckCircle2,
      stats: { inspectors: "5", avgTime: "3.2 min", accuracy: "98%" },
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 4,
      name: "Rework Analysis",
      description: "Rework items and costs",
      icon: XCircle,
      stats: { reworked: "32", cost: "$2,450", recoveryRate: "87%" },
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
  ];

  const inventoryReports = [
    {
      id: 1,
      name: "Stock Levels",
      description: "Current inventory status",
      icon: Box,
      stats: { inStock: "342", lowStock: "15", outOfStock: "3" },
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 2,
      name: "Material Consumption",
      description: "Raw material usage",
      icon: TrendingUp,
      stats: { consumed: "2,450 kg", planned: "2,600 kg", variance: "-5.8%" },
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      id: 3,
      name: "WIP Inventory",
      description: "Work in progress value",
      icon: PackageIcon,
      stats: { totalValue: "$45,680", items: "156", stages: "4" },
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      id: 4,
      name: "Finished Goods",
      description: "Completed products ready for shipment",
      icon: PackageCheck,
      stats: { ready: "245", shipped: "180", pending: "65" },
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  const recyclingReports = [
    {
      id: 1,
      name: "Scrap Collection",
      description: "Material scrap tracking",
      icon: Recycle,
      stats: { collected: "156 kg", value: "$780", recycled: "89%" },
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
    },
    {
      id: 2,
      name: "Waste Reduction",
      description: "Waste management metrics",
      icon: TrendingUp,
      stats: { reduced: "23%", saved: "$1,245", target: "30%" },
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: 3,
      name: "Material Recovery",
      description: "Recovered materials tracking",
      icon: Box,
      stats: { recovered: "145 kg", reused: "87%", revenue: "$650" },
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 4,
      name: "Environmental Impact",
      description: "Sustainability metrics",
      icon: AlertCircle,
      stats: { co2Saved: "450 kg", waterSaved: "1,200 L", efficiency: "92%" },
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
  ];

  const ReportCard = ({
    report,
  }: {
    report: {
      id: number;
      name: string;
      description: string;
      icon: any;
      stats: any;
      color: string;
      bgColor: string;
    };
  }) => {
    const Icon = report.icon;
    return (
      <Card className="p-4 rounded-2xl backdrop-blur-md border border-border hover:border-accent/50 transition-all cursor-pointer group">
        <div className="flex items-start gap-3 mb-3">
          <div className={`p-3 rounded-xl ${report.bgColor}`}>
            <Icon className={`w-5 h-5 ${report.color}`} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-foreground group-hover:text-accent transition-colors">
              {report.name}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">{report.description}</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-accent/10 transition-colors">
            <Download className="w-4 h-4 text-accent" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 bg-background/50 rounded-lg p-3">
          {Object.entries(report.stats).map(([key, value], index) => (
            <div key={index}>
              <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              <p className="text-sm font-bold text-foreground mt-0.5">{value as string}</p>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-[0_0_80px_rgba(249,115,22,0.3)]">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent/20 to-orange-600/20 border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/20 rounded-xl">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Manufacturing Reports</h2>
                <p className="text-slate-300 text-sm">Comprehensive production analytics</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mt-4">
            <div className="flex-1 relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-quarter">This Quarter</option>
                <option value="this-year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <button className="px-4 py-2.5 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 rounded-xl text-white text-sm font-medium transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="px-4 py-2.5 bg-accent hover:bg-accent/90 rounded-xl text-white text-sm font-medium transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              <Download className="w-4 h-4" />
              Export All
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          <Tabs defaultValue="production" className="w-full">
            <TabsList className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-xl mb-6 grid grid-cols-4">
              <TabsTrigger
                value="production"
                className="rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white text-sm font-medium transition-all"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Production
              </TabsTrigger>
              <TabsTrigger
                value="quality"
                className="rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white text-sm font-medium transition-all"
              >
                <PackageCheck className="w-4 h-4 mr-2" />
                Quality
              </TabsTrigger>
              <TabsTrigger
                value="inventory"
                className="rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white text-sm font-medium transition-all"
              >
                <Box className="w-4 h-4 mr-2" />
                Inventory
              </TabsTrigger>
              <TabsTrigger
                value="recycling"
                className="rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white text-sm font-medium transition-all"
              >
                <Recycle className="w-4 h-4 mr-2" />
                Recycling
              </TabsTrigger>
            </TabsList>

            {/* Production Reports */}
            <TabsContent value="production" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productionReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </TabsContent>

            {/* Quality Reports */}
            <TabsContent value="quality" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {qualityReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </TabsContent>

            {/* Inventory Reports */}
            <TabsContent value="inventory" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inventoryReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </TabsContent>

            {/* Recycling Reports */}
            <TabsContent value="recycling" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recyclingReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
