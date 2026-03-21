import { useState } from "react";
import { X, MapPin, DollarSign, Tag, CreditCard, Wallet, FileText, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const locations = ["Main Office", "Factory Floor", "Warehouse", "Showroom", "Workshop"];
const categories = ["Office Supplies", "Utilities", "Marketing", "Equipment", "Materials", "Transportation", "Maintenance", "Salaries"];
const subCategories: Record<string, string[]> = {
  "Office Supplies": ["Stationery", "Furniture", "Electronics", "Software"],
  "Utilities": ["Electricity", "Water", "Internet", "Phone"],
  "Marketing": ["Advertising", "Events", "Social Media", "Print Materials"],
  "Equipment": ["Machinery", "Tools", "Computers", "Vehicles"],
  "Materials": ["Raw Materials", "Packaging", "Consumables"],
  "Transportation": ["Fuel", "Maintenance", "Parking", "Tolls"],
  "Maintenance": ["Repairs", "Cleaning", "Security"],
  "Salaries": ["Wages", "Overtime", "Bonuses", "Benefits"],
};
const paymentMethods = ["Cash", "Bank Transfer", "Mobile Money", "Credit Card", "Cheque"];
const paymentAccounts = ["Cash Account", "Bank Account - CBE", "Mobile Money - M-PESA", "Petty Cash"];

export function AddExpenseModal({ isOpen, onClose }: AddExpenseModalProps) {
  const [formData, setFormData] = useState({
    location: "",
    expenseAmount: "",
    category: "",
    subCategory: "",
    paidNow: "",
    paymentMethod: "",
    paymentAccount: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      // Reset subcategory when category changes
      ...(field === "category" ? { subCategory: "" } : {}),
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
          location: "",
          expenseAmount: "",
          category: "",
          subCategory: "",
          paidNow: "",
          paymentMethod: "",
          paymentAccount: "",
          note: "",
        });
        onClose();
      }, 1500);
    }, 1000);
  };

  if (!isOpen) return null;

  const availableSubCategories = formData.category ? subCategories[formData.category] || [] : [];
  const remainingBalance = formData.expenseAmount && formData.paidNow
    ? (parseFloat(formData.expenseAmount) - parseFloat(formData.paidNow)).toFixed(2)
    : "0.00";

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
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Expense Created!</h3>
              <p className="text-slate-600 dark:text-slate-400">Your expense has been recorded successfully</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Add Expense</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Record a new expense transaction</p>
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
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location *
              </label>
              <select
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
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

            {/* Expense Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Expense Amount (Br) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.expenseAmount}
                onChange={(e) => updateFormData("expenseAmount", e.target.value)}
                placeholder="0.00"
                required
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Tag className="w-4 h-4 inline mr-2" />
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => updateFormData("category", e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              >
                <option value="" className="bg-white dark:bg-slate-800">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-white dark:bg-slate-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Category */}
            {formData.category && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Tag className="w-4 h-4 inline mr-2" />
                  Sub Category *
                </label>
                <select
                  value={formData.subCategory}
                  onChange={(e) => updateFormData("subCategory", e.target.value)}
                  required
                  className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                >
                  <option value="" className="bg-white dark:bg-slate-800">Select sub category</option>
                  {availableSubCategories.map((subCategory) => (
                    <option key={subCategory} value={subCategory} className="bg-white dark:bg-slate-800">
                      {subCategory}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Paid Now */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Paid Now (Br) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max={formData.expenseAmount || undefined}
                value={formData.paidNow}
                onChange={(e) => updateFormData("paidNow", e.target.value)}
                placeholder="0.00"
                required
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              />
              {formData.expenseAmount && formData.paidNow && parseFloat(formData.paidNow) < parseFloat(formData.expenseAmount) && (
                <p className="text-yellow-500 dark:text-yellow-400 text-xs mt-1">
                  Remaining balance: Br {remainingBalance}
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <CreditCard className="w-4 h-4 inline mr-2" />
                Payment Method *
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => updateFormData("paymentMethod", e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              >
                <option value="" className="bg-white dark:bg-slate-800">Select payment method</option>
                {paymentMethods.map((method) => (
                  <option key={method} value={method} className="bg-white dark:bg-slate-800">
                    {method}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Account */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Wallet className="w-4 h-4 inline mr-2" />
                Payment Account *
              </label>
              <select
                value={formData.paymentAccount}
                onChange={(e) => updateFormData("paymentAccount", e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              >
                <option value="" className="bg-white dark:bg-slate-800">Select payment account</option>
                {paymentAccounts.map((account) => (
                  <option key={account} value={account} className="bg-white dark:bg-slate-800">
                    {account}
                  </option>
                ))}
              </select>
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Note (Optional)
              </label>
              <textarea
                value={formData.note}
                onChange={(e) => updateFormData("note", e.target.value)}
                placeholder="Add any additional details..."
                rows={3}
                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all resize-none"
              />
            </div>

            {/* Summary Card */}
            {formData.expenseAmount && (
              <Card className="p-4 bg-accent/10 border-accent/30 rounded-xl">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Total Expense:</span>
                    <span className="text-slate-900 dark:text-white font-bold">Br {parseFloat(formData.expenseAmount).toFixed(2)}</span>
                  </div>
                  {formData.paidNow && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Paid Now:</span>
                        <span className="text-green-600 dark:text-green-400 font-bold">Br {parseFloat(formData.paidNow).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-200 dark:border-white/10 pt-2">
                        <span className="text-slate-600 dark:text-slate-400">Remaining:</span>
                        <span className={`font-bold ${parseFloat(remainingBalance) > 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`}>
                          Br {remainingBalance}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            )}

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
                    Creating Expense...
                  </>
                ) : (
                  <>Create Expense</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
