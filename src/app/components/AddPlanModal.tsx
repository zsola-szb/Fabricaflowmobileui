import { useState } from "react";
import { X, MapPin, Calendar, Flag, FileText, Plus, Trash2, Package, Hash } from "lucide-react";
import { Card } from "./ui/card";

interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RequiredMaterial {
  id: string;
  name: string;
}

interface PlanItem {
  id: string;
  product: string;
  quantity: string;
  requiredByDate: string;
  priority: string;
  requiredMaterials: RequiredMaterial[];
}

const locations = ["Main Office", "Factory Floor", "Warehouse", "Showroom", "Workshop"];
const priorities = ["Low", "Medium", "High", "Critical"];
const products = [
  "Premium Widget A",
  "Standard Component B",
  "Custom Part C",
  "Deluxe Model D",
  "Basic Unit E",
  "Advanced System F",
];

export function AddPlanModal({ isOpen, onClose }: AddPlanModalProps) {
  const [formData, setFormData] = useState({
    referenceNo: "",
    businessLocation: "",
    startDate: "",
    endDate: "",
    priority: "",
    additionalNotes: "",
  });

  const [planItems, setPlanItems] = useState<PlanItem[]>([
    {
      id: "1",
      product: "",
      quantity: "",
      requiredByDate: "",
      priority: "",
      requiredMaterials: [],
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updatePlanItem = (itemId: string, field: string, value: string) => {
    setPlanItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  const addPlanItem = () => {
    const newItem: PlanItem = {
      id: Date.now().toString(),
      product: "",
      quantity: "",
      requiredByDate: "",
      priority: "",
      requiredMaterials: [],
    };
    setPlanItems((prev) => [...prev, newItem]);
  };

  const removePlanItem = (itemId: string) => {
    if (planItems.length > 1) {
      setPlanItems((prev) => prev.filter((item) => item.id !== itemId));
    }
  };

  const addRequiredMaterial = (itemId: string) => {
    setPlanItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              requiredMaterials: [
                ...item.requiredMaterials,
                { id: Date.now().toString(), name: "" },
              ],
            }
          : item
      )
    );
  };

  const updateRequiredMaterial = (itemId: string, materialId: string, value: string) => {
    setPlanItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              requiredMaterials: item.requiredMaterials.map((material) =>
                material.id === materialId ? { ...material, name: value } : material
              ),
            }
          : item
      )
    );
  };

  const removeRequiredMaterial = (itemId: string, materialId: string) => {
    setPlanItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              requiredMaterials: item.requiredMaterials.filter(
                (material) => material.id !== materialId
              ),
            }
          : item
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setFormData({
        referenceNo: "",
        businessLocation: "",
        startDate: "",
        endDate: "",
        priority: "",
        additionalNotes: "",
      });
      setPlanItems([
        {
          id: "1",
          product: "",
          quantity: "",
          requiredByDate: "",
          priority: "",
          requiredMaterials: [],
        },
      ]);
      onClose();
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
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Add Production Plan</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Create a new production planning schedule</p>
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
          <div className="space-y-6">
            {/* PLAN HEADER */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-white/10">
                Plan Header
              </h3>
              <div className="space-y-4">
                {/* Reference No */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <Hash className="w-4 h-4 inline mr-2" />
                    Reference No
                  </label>
                  <input
                    type="text"
                    value={formData.referenceNo}
                    onChange={(e) => updateFormData("referenceNo", e.target.value)}
                    placeholder="Auto-generated if empty"
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                  />
                </div>

                {/* Business Location */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Business Location *
                  </label>
                  <select
                    value={formData.businessLocation}
                    onChange={(e) => updateFormData("businessLocation", e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                  >
                    <option value="" className="bg-white dark:bg-slate-800">Select location</option>
                    {locations.map((location) => (
                      <option key={location} value={location} className="bg-white dark:bg-slate-800">
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => updateFormData("startDate", e.target.value)}
                      required
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => updateFormData("endDate", e.target.value)}
                      required
                      min={formData.startDate}
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    />
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <Flag className="w-4 h-4 inline mr-2" />
                    Priority *
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => updateFormData("priority", e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                  >
                    <option value="" className="bg-white dark:bg-slate-800">Select priority</option>
                    {priorities.map((priority) => (
                      <option key={priority} value={priority} className="bg-white dark:bg-slate-800">
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => updateFormData("additionalNotes", e.target.value)}
                    placeholder="Add any additional details..."
                    rows={3}
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* PLAN ITEMS */}
            <div>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Plan Items</h3>
                <button
                  type="button"
                  onClick={addPlanItem}
                  className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              <div className="space-y-4">
                {planItems.map((item, index) => (
                  <Card key={item.id} className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        Item #{index + 1}
                      </h4>
                      {planItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePlanItem(item.id)}
                          className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      {/* Product */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          <Package className="w-4 h-4 inline mr-2" />
                          Product *
                        </label>
                        <select
                          value={item.product}
                          onChange={(e) => updatePlanItem(item.id, "product", e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                        >
                          <option value="" className="bg-white dark:bg-slate-800">Select product</option>
                          {products.map((product) => (
                            <option key={product} value={product} className="bg-white dark:bg-slate-800">
                              {product}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Quantity & Required By Date */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Quantity *
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updatePlanItem(item.id, "quantity", e.target.value)}
                            placeholder="0"
                            required
                            className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Required By Date
                          </label>
                          <input
                            type="date"
                            value={item.requiredByDate}
                            onChange={(e) => updatePlanItem(item.id, "requiredByDate", e.target.value)}
                            min={formData.startDate}
                            max={formData.endDate}
                            className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                          />
                        </div>
                      </div>

                      {/* Priority */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          <Flag className="w-4 h-4 inline mr-2" />
                          Priority
                        </label>
                        <select
                          value={item.priority}
                          onChange={(e) => updatePlanItem(item.id, "priority", e.target.value)}
                          className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                        >
                          <option value="" className="bg-white dark:bg-slate-800">Select priority</option>
                          {priorities.map((priority) => (
                            <option key={priority} value={priority} className="bg-white dark:bg-slate-800">
                              {priority}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Required Materials */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Required Materials (RM)
                          </label>
                          <button
                            type="button"
                            onClick={() => addRequiredMaterial(item.id)}
                            className="flex items-center gap-1 px-3 py-1 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg text-xs transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                            Add RM
                          </button>
                        </div>
                        {item.requiredMaterials.length > 0 && (
                          <div className="space-y-2">
                            {item.requiredMaterials.map((material) => (
                              <div key={material.id} className="flex gap-2">
                                <input
                                  type="text"
                                  value={material.name}
                                  onChange={(e) =>
                                    updateRequiredMaterial(item.id, material.id, e.target.value)
                                  }
                                  placeholder="Material name"
                                  className="flex-1 px-3 py-2 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeRequiredMaterial(item.id, material.id)}
                                  className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-white/50 dark:from-slate-900 dark:via-slate-900 dark:to-transparent pt-6 -mx-6 px-6 pb-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-accent to-orange-600 text-white font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Plan...
                  </>
                ) : (
                  <>Create Production Plan</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
