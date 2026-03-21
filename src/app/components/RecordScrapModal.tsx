import { useState } from "react";
import { X, ClipboardCheck, Layers, Cpu, AlertTriangle, Hash, Calendar, Package, FileText, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";

interface RecordScrapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const workOrders = ["WO-001", "WO-002", "WO-003", "WO-004", "WO-005"];
const stages = ["Raw Materials", "Cutting", "Assembly", "Quality Check", "Packaging", "Finishing"];
const machines = ["Machine A-1", "Machine B-2", "Machine C-3", "CNC Mill 01", "Lathe 02", "Press 03"];
const scrapTypes = ["Material Defect", "Machine Error", "Human Error", "Quality Issue", "Dimension Mismatch", "Surface Damage", "Other"];
const scrapProducts = [
  "Premium Widget A",
  "Standard Component B",
  "Custom Part C",
  "Deluxe Model D",
  "Basic Unit E",
  "Damaged Material",
];

export function RecordScrapModal({ isOpen, onClose }: RecordScrapModalProps) {
  const [formData, setFormData] = useState({
    workOrder: "",
    stage: "",
    machine: "",
    scrapType: "",
    quantity: "",
    recordedAt: "",
    scrapProduct: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset and close after showing success
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          workOrder: "",
          stage: "",
          machine: "",
          scrapType: "",
          quantity: "",
          recordedAt: "",
          scrapProduct: "",
          notes: "",
        });
        onClose();
      }, 1500);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 animate-slide-up">
        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10 flex items-center justify-center">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.5)]">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Scrap Recorded!</h3>
              <p className="text-slate-600 dark:text-slate-400">Scrap has been recorded successfully</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                Record Scrap
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Record production scrap and waste</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-slate-900 dark:text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-80px)] px-6 py-6 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <div className="space-y-5">
            {/* Work Order */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <ClipboardCheck className="w-4 h-4 inline mr-2" />
                Work Order *
              </label>
              <select
                value={formData.workOrder}
                onChange={(e) => updateFormData("workOrder", e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              >
                <option value="" className="bg-white dark:bg-slate-800">Select work order</option>
                {workOrders.map((wo) => (
                  <option key={wo} value={wo} className="bg-white dark:bg-slate-800">
                    {wo}
                  </option>
                ))}
              </select>
            </div>

            {/* Stage */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Layers className="w-4 h-4 inline mr-2" />
                Stage
              </label>
              <select
                value={formData.stage}
                onChange={(e) => updateFormData("stage", e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              >
                <option value="" className="bg-white dark:bg-slate-800">Select stage</option>
                {stages.map((stage) => (
                  <option key={stage} value={stage} className="bg-white dark:bg-slate-800">
                    {stage}
                  </option>
                ))}
              </select>
            </div>

            {/* Machine */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Cpu className="w-4 h-4 inline mr-2" />
                Machine
              </label>
              <select
                value={formData.machine}
                onChange={(e) => updateFormData("machine", e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              >
                <option value="" className="bg-white dark:bg-slate-800">Select machine</option>
                {machines.map((machine) => (
                  <option key={machine} value={machine} className="bg-white dark:bg-slate-800">
                    {machine}
                  </option>
                ))}
              </select>
            </div>

            {/* Scrap Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Scrap Type *
              </label>
              <select
                value={formData.scrapType}
                onChange={(e) => updateFormData("scrapType", e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              >
                <option value="" className="bg-white dark:bg-slate-800">Select scrap type</option>
                {scrapTypes.map((type) => (
                  <option key={type} value={type} className="bg-white dark:bg-slate-800">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Hash className="w-4 h-4 inline mr-2" />
                Quantity *
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={formData.quantity}
                onChange={(e) => updateFormData("quantity", e.target.value)}
                placeholder="0"
                required
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              />
            </div>

            {/* Recorded At */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Recorded At
              </label>
              <input
                type="datetime-local"
                value={formData.recordedAt}
                onChange={(e) => updateFormData("recordedAt", e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Leave empty to use current date/time
              </p>
            </div>

            {/* Scrap Product */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Package className="w-4 h-4 inline mr-2" />
                Scrap Product
              </label>
              <select
                value={formData.scrapProduct}
                onChange={(e) => updateFormData("scrapProduct", e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              >
                <option value="" className="bg-white dark:bg-slate-800">Select scrap product</option>
                {scrapProducts.map((product) => (
                  <option key={product} value={product} className="bg-white dark:bg-slate-800">
                    {product}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateFormData("notes", e.target.value)}
                placeholder="Add details about the scrap..."
                rows={4}
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all resize-none"
              />
            </div>

            {/* Summary Card */}
            {formData.workOrder && formData.scrapType && formData.quantity && (
              <Card className="p-4 bg-red-500/10 border-red-500/30 rounded-xl">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Scrap Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Work Order:</span>
                    <span className="text-slate-900 dark:text-white font-bold">{formData.workOrder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Scrap Type:</span>
                    <span className="text-red-600 dark:text-red-400 font-bold">{formData.scrapType}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 dark:border-white/10 pt-2">
                    <span className="text-slate-600 dark:text-slate-400">Quantity:</span>
                    <span className="text-red-600 dark:text-red-400 font-bold">{formData.quantity} units</span>
                  </div>
                  {formData.stage && (
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Stage:</span>
                      <span className="text-slate-900 dark:text-white font-medium">{formData.stage}</span>
                    </div>
                  )}
                  {formData.machine && (
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Machine:</span>
                      <span className="text-slate-900 dark:text-white font-medium">{formData.machine}</span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Submit Button */}
            <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-white/50 dark:from-slate-900 dark:via-slate-900 dark:to-transparent pt-6 -mx-6 px-6 pb-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Recording Scrap...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5" />
                    Record Scrap
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
