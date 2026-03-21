import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Package as PackageIcon,
  CheckCircle2,
  Play,
  StopCircle,
  Eye,
  MoreVertical,
  AlertTriangle,
  TrendingUp,
  User,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { RecordScrapModal } from "../components/RecordScrapModal";

const stages = [
  { name: "Planning", status: "completed", date: "Mar 18, 09:00" },
  { name: "Material Prep", status: "completed", date: "Mar 18, 10:30" },
  { name: "Assembly", status: "in-progress", date: "Mar 18, 14:00" },
  { name: "Quality Check", status: "pending", date: "-" },
  { name: "Packaging", status: "pending", date: "-" },
  { name: "Completion", status: "pending", date: "-" },
];

const activities = [
  { action: "Stage completed: Material Prep", user: "Solomon Z.", time: "2 hours ago" },
  { action: "Started Assembly stage", user: "John D.", time: "3 hours ago" },
  { action: "Materials allocated", user: "Jane S.", time: "5 hours ago" },
  { action: "Work order created", user: "Solomon Z.", time: "1 day ago" },
];

export function WorkOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRecordScrapModalOpen, setIsRecordScrapModalOpen] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  // Pull to refresh handler
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    (e.currentTarget as any).touchStartY = touch.clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startY = (e.currentTarget as any).touchStartY;
    const scrollTop = (e.currentTarget as HTMLElement).scrollTop;

    if (scrollTop === 0 && touch.clientY > startY + 100) {
      handleRefresh();
    }
  };

  const getStageIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-400" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-slate-400" />;
    }
  };

  return (
    <div
      className="min-h-screen bg-background"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-8 text-slate-50 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">{id}</h1>
          <button className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Status and Priority */}
        <div className="flex gap-2 mb-3">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <AlertTriangle className="w-3 h-3 mr-1" />
            High Priority
          </Badge>
        </div>

        <h2 className="text-lg font-bold mb-1">Premium Widget A</h2>
        <p className="text-slate-400 text-sm">SKU: PWA-2026-001</p>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-2">
        {/* Progress Card */}
        <Card className="p-4 rounded-2xl backdrop-blur-md border border-border mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">Overall Progress</h3>
            <span className="text-2xl font-bold text-accent">65%</span>
          </div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-accent rounded-full transition-all" style={{ width: "65%" }} />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Quantity</p>
              <p className="text-lg font-bold">100</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Completed</p>
              <p className="text-lg font-bold text-green-500">65</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Remaining</p>
              <p className="text-lg font-bold text-yellow-500">35</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-medium active:scale-95 transition-all">
            <Play className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Start</span>
          </button>
          <button
            onClick={() => setIsRecordScrapModalOpen(true)}
            className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-medium active:scale-95 transition-all"
          >
            <AlertTriangle className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Scrap</span>
          </button>
          <button className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-medium active:scale-95 transition-all">
            <Eye className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Inspect</span>
          </button>
        </div>

        {/* Timeline */}
        <div className="mb-6">
          <h3 className="font-bold mb-3">Production Stages</h3>
          <Card className="p-4 rounded-2xl backdrop-blur-md border border-border">
            <div className="space-y-4">
              {stages.map((stage, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    {getStageIcon(stage.status)}
                    {index < stages.length - 1 && (
                      <div
                        className={`w-0.5 h-12 mt-1 ${
                          stage.status === "completed" ? "bg-green-400" : "bg-slate-300 dark:bg-slate-700"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`font-medium ${stage.status === "in-progress" ? "text-blue-400" : ""}`}>
                          {stage.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{stage.date}</p>
                      </div>
                      {stage.status === "in-progress" && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 rounded-xl backdrop-blur-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Start Date</p>
            </div>
            <p className="font-bold">Mar 18, 2026</p>
          </Card>
          <Card className="p-4 rounded-xl backdrop-blur-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Due Date</p>
            </div>
            <p className="font-bold text-red-500">Mar 22, 2026</p>
          </Card>
          <Card className="p-4 rounded-xl backdrop-blur-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Supervisor</p>
            </div>
            <p className="font-bold">Solomon Z.</p>
          </Card>
          <Card className="p-4 rounded-xl backdrop-blur-md border border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Efficiency</p>
            </div>
            <p className="font-bold text-green-500">92%</p>
          </Card>
        </div>

        {/* Activity Log */}
        <div className="mb-6">
          <h3 className="font-bold mb-3">Activity Log</h3>
          <Card className="rounded-2xl backdrop-blur-md border border-border overflow-hidden">
            {activities.map((activity, index) => (
              <div
                key={index}
                className={`p-4 ${index !== activities.length - 1 ? "border-b border-border" : ""}`}
              >
                <p className="font-medium text-sm">{activity.action}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-muted-foreground">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Complete Button */}
        <button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-xl mb-6 active:scale-95 transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]">
          <CheckCircle2 className="w-5 h-5 inline mr-2" />
          Mark Stage Complete
        </button>
      </div>

      {/* Record Scrap Modal */}
      <RecordScrapModal isOpen={isRecordScrapModalOpen} onClose={() => setIsRecordScrapModalOpen(false)} />
    </div>
  );
}