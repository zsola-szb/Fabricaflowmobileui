import { useState } from "react";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  Plus,
  Trash2,
  DollarSign,
  Package,
  Truck,
  CreditCard,
  FileCheck,
} from "lucide-react";
import { Card } from "./ui/card";

interface AddPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "purchase" | "return";
}

interface Product {
  id: string;
  name: string;
  quantity: number;
  unitCostBeforeDiscount: number;
  discountPercent: number;
  unitCostBeforeTax: number;
  lineTotal: number;
  profitMargin: number;
  unitSellingPrice: number;
}

export function AddPurchaseModal({ isOpen, onClose, type }: AddPurchaseModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    supplier: "",
    address: "",
    referenceNo: "",
    purchaseDate: "",
    purchaseStatus: "",
    businessLocation: "",
    payTerm: "",
    document: null as File | null,
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "",
      quantity: 0,
      unitCostBeforeDiscount: 0,
      discountPercent: 0,
      unitCostBeforeTax: 0,
      lineTotal: 0,
      profitMargin: 0,
      unitSellingPrice: 0,
    },
  ]);

  const [shippingCharges, setShippingCharges] = useState(0);
  const [paymentData, setPaymentData] = useState({
    advanceBalance: 0,
    amount: 0,
    paidOn: "",
    paymentMethod: "",
    paymentAccount: "",
    paymentNote: "",
  });

  const totalSteps = 5;

  const steps = [
    { number: 1, title: "Basic Info", icon: Package },
    { number: 2, title: "Products", icon: Package },
    { number: 3, title: "Shipping", icon: Truck },
    { number: 4, title: "Payment", icon: CreditCard },
    { number: 5, title: "Review", icon: FileCheck },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now().toString(),
        name: "",
        quantity: 0,
        unitCostBeforeDiscount: 0,
        discountPercent: 0,
        unitCostBeforeTax: 0,
        lineTotal: 0,
        profitMargin: 0,
        unitSellingPrice: 0,
      },
    ]);
  };

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const updateProduct = (id: string, field: keyof Product, value: any) => {
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          const updated = { ...p, [field]: value };
          
          // Auto-calculate fields
          if (field === "unitCostBeforeDiscount" || field === "discountPercent") {
            const discount = (updated.unitCostBeforeDiscount * updated.discountPercent) / 100;
            updated.unitCostBeforeTax = updated.unitCostBeforeDiscount - discount;
          }
          
          if (field === "quantity" || field === "unitCostBeforeTax") {
            updated.lineTotal = updated.quantity * updated.unitCostBeforeTax;
          }
          
          return updated;
        }
        return p;
      })
    );
  };

  const calculateTotals = () => {
    const subtotal = products.reduce((sum, p) => sum + p.lineTotal, 0);
    const total = subtotal + shippingCharges;
    return { subtotal, total };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "text/csv",
        "application/zip",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Allowed: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png");
        return;
      }
      
      setFormData({ ...formData, document: file });
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", { formData, products, shippingCharges, paymentData });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl h-[90vh] sm:h-auto sm:max-h-[90vh] bg-[#0f172a] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-[#0f172a] to-[#1e293b]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-accent to-orange-600 rounded-xl shadow-lg shadow-accent/20">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {type === "purchase" ? "Add Purchase" : "Add Purchase Return"}
              </h2>
              <p className="text-xs text-slate-400">Step {currentStep} of {totalSteps}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-5 py-4 border-b border-white/10 bg-gradient-to-r from-[#020617] to-[#0f172a]">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      currentStep >= step.number
                        ? "bg-gradient-to-r from-accent to-orange-600 text-white"
                        : "bg-white/5 text-slate-500"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  <p
                    className={`text-xs mt-1 hidden sm:block ${
                      currentStep >= step.number ? "text-white" : "text-slate-500"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-1 transition-all ${
                      currentStep > step.number ? "bg-accent" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b]">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Supplier <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                  placeholder="Select or add supplier"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                  placeholder="Enter supplier address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Reference No</label>
                  <input
                    type="text"
                    value={formData.referenceNo}
                    onChange={(e) => setFormData({ ...formData, referenceNo: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                    placeholder="REF-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Purchase Date <span className="text-accent">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Purchase Status <span className="text-accent">*</span>
                  </label>
                  <select
                    value={formData.purchaseStatus}
                    onChange={(e) => setFormData({ ...formData, purchaseStatus: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                  >
                    <option value="" className="bg-[#0f172a]">Select Status</option>
                    <option value="ordered" className="bg-[#0f172a]">Ordered</option>
                    <option value="pending" className="bg-[#0f172a]">Pending</option>
                    <option value="received" className="bg-[#0f172a]">Received</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Business Location <span className="text-accent">*</span>
                  </label>
                  <select
                    value={formData.businessLocation}
                    onChange={(e) => setFormData({ ...formData, businessLocation: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                  >
                    <option value="" className="bg-[#0f172a]">Select Location</option>
                    <option value="warehouse1" className="bg-[#0f172a]">Warehouse 1</option>
                    <option value="warehouse2" className="bg-[#0f172a]">Warehouse 2</option>
                    <option value="factory" className="bg-[#0f172a]">Factory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Pay Term</label>
                <select
                  value={formData.payTerm}
                  onChange={(e) => setFormData({ ...formData, payTerm: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                >
                  <option value="" className="bg-[#0f172a]">Select Pay Term</option>
                  <option value="cod" className="bg-[#0f172a]">Cash on Delivery</option>
                  <option value="net30" className="bg-[#0f172a]">Net 30 Days</option>
                  <option value="net60" className="bg-[#0f172a]">Net 60 Days</option>
                  <option value="advance" className="bg-[#0f172a]">Advance Payment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Attach Document</label>
                <div className="relative">
                  <input
                    type="file"
                    id="document"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.csv,.zip,.doc,.docx,.jpeg,.jpg,.png"
                  />
                  <label
                    htmlFor="document"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0f172a]/60 border border-dashed border-white/20 rounded-xl text-slate-400 cursor-pointer hover:bg-[#0f172a] hover:border-accent/30 transition-all"
                  >
                    <Upload className="w-5 h-5" />
                    <span>{formData.document ? formData.document.name : "Choose file"}</span>
                  </label>
                </div>
                <p className="text-xs text-slate-500 mt-1.5">
                  Max 5MB | .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Products */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Products</h3>
                <button
                  onClick={addProduct}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-orange-600 rounded-xl text-white text-sm font-medium shadow-lg shadow-accent/20 hover:shadow-accent/30 active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>

              {products.map((product, index) => (
                <Card key={product.id} className="bg-[#0f172a]/60 border-white/10 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-white">Product #{index + 1}</h4>
                    {products.length > 1 && (
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 active:scale-95 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                        className="w-full px-3 py-2.5 bg-[#020617]/60 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                        placeholder="Enter product name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">
                          Quantity
                        </label>
                        <input
                          type="number"
                          value={product.quantity || ""}
                          onChange={(e) =>
                            updateProduct(product.id, "quantity", parseFloat(e.target.value) || 0)
                          }
                          className="w-full px-3 py-2.5 bg-[#020617]/60 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">
                          Unit Cost (Before Discount)
                        </label>
                        <input
                          type="number"
                          value={product.unitCostBeforeDiscount || ""}
                          onChange={(e) =>
                            updateProduct(
                              product.id,
                              "unitCostBeforeDiscount",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full px-3 py-2.5 bg-[#020617]/60 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">
                          Discount %
                        </label>
                        <input
                          type="number"
                          value={product.discountPercent || ""}
                          onChange={(e) =>
                            updateProduct(
                              product.id,
                              "discountPercent",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full px-3 py-2.5 bg-[#020617]/60 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">
                          Unit Cost (After Discount)
                        </label>
                        <input
                          type="number"
                          value={product.unitCostBeforeTax.toFixed(2)}
                          readOnly
                          className="w-full px-3 py-2.5 bg-[#020617]/40 border border-white/10 rounded-lg text-slate-300 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">
                          Line Total
                        </label>
                        <div className="px-3 py-2.5 bg-accent/10 border border-accent/20 rounded-lg">
                          <p className="text-sm font-bold text-accent">
                            ${product.lineTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">
                          Profit Margin %
                        </label>
                        <input
                          type="number"
                          value={product.profitMargin || ""}
                          onChange={(e) =>
                            updateProduct(
                              product.id,
                              "profitMargin",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full px-3 py-2.5 bg-[#020617]/60 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">
                          Selling Price
                        </label>
                        <input
                          type="number"
                          value={product.unitSellingPrice || ""}
                          onChange={(e) =>
                            updateProduct(
                              product.id,
                              "unitSellingPrice",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full px-3 py-2.5 bg-[#020617]/60 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              <Card className="bg-gradient-to-r from-accent/10 to-orange-600/10 border-accent/30 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">Subtotal</p>
                  <p className="text-xl font-bold text-accent">
                    ${calculateTotals().subtotal.toFixed(2)}
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Step 3: Shipping */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-accent to-orange-600 rounded-xl shadow-lg shadow-accent/20">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Shipping Details</h3>
                  <p className="text-sm text-slate-400">Add shipping charges if applicable</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Additional Shipping Charges
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    value={shippingCharges || ""}
                    onChange={(e) => setShippingCharges(parseFloat(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <Card className="bg-[#0f172a]/60 border-white/10 p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <p className="text-slate-400">Subtotal</p>
                  <p className="text-white font-medium">
                    ${calculateTotals().subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-slate-400">Shipping Charges</p>
                  <p className="text-white font-medium">${shippingCharges.toFixed(2)}</p>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-bold">Total Amount</p>
                    <p className="text-2xl font-bold text-accent">
                      ${calculateTotals().total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-accent to-orange-600 rounded-xl shadow-lg shadow-accent/20">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Payment Details</h3>
                  <p className="text-sm text-slate-400">Add payment information</p>
                </div>
              </div>

              <Card className="bg-[#0f172a]/60 border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">Advance Balance</p>
                  <p className="text-lg font-bold text-white">
                    ${paymentData.advanceBalance.toFixed(2)}
                  </p>
                </div>
              </Card>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Amount <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    value={paymentData.amount || ""}
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, amount: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Paid On <span className="text-accent">*</span>
                  </label>
                  <input
                    type="date"
                    value={paymentData.paidOn}
                    onChange={(e) => setPaymentData({ ...paymentData, paidOn: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Payment Method <span className="text-accent">*</span>
                  </label>
                  <select
                    value={paymentData.paymentMethod}
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, paymentMethod: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                  >
                    <option value="" className="bg-[#0f172a]">Select Method</option>
                    <option value="cash" className="bg-[#0f172a]">Cash</option>
                    <option value="card" className="bg-[#0f172a]">Card</option>
                    <option value="bank" className="bg-[#0f172a]">Bank Transfer</option>
                    <option value="cheque" className="bg-[#0f172a]">Cheque</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Payment Account</label>
                <select
                  value={paymentData.paymentAccount}
                  onChange={(e) =>
                    setPaymentData({ ...paymentData, paymentAccount: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                >
                  <option value="" className="bg-[#0f172a]">Select Account</option>
                  <option value="account1" className="bg-[#0f172a]">Main Account</option>
                  <option value="account2" className="bg-[#0f172a]">Secondary Account</option>
                  <option value="account3" className="bg-[#0f172a]">Petty Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Payment Note</label>
                <textarea
                  value={paymentData.paymentNote}
                  onChange={(e) => setPaymentData({ ...paymentData, paymentNote: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                  placeholder="Add any notes about this payment..."
                />
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-accent to-orange-600 rounded-xl shadow-lg shadow-accent/20">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Review & Submit</h3>
                  <p className="text-sm text-slate-400">Verify all details before submitting</p>
                </div>
              </div>

              <Card className="bg-[#0f172a]/60 border-white/10 p-4">
                <h4 className="font-bold text-white mb-3">Basic Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Supplier:</span>
                    <span className="text-white font-medium">
                      {formData.supplier || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Purchase Date:</span>
                    <span className="text-white font-medium">
                      {formData.purchaseDate || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-white font-medium">
                      {formData.purchaseStatus || "Not specified"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-white font-medium">
                      {formData.businessLocation || "Not specified"}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#0f172a]/60 border-white/10 p-4">
                <h4 className="font-bold text-white mb-3">Products ({products.length})</h4>
                <div className="space-y-2">
                  {products.map((product, index) => (
                    <div key={product.id} className="flex justify-between text-sm">
                      <span className="text-slate-400">
                        {product.name || `Product ${index + 1}`}
                      </span>
                      <span className="text-white font-medium">
                        {product.quantity} × ${product.unitCostBeforeTax.toFixed(2)} = $
                        {product.lineTotal.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-accent/10 to-orange-600/10 border-accent/30 p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Subtotal:</span>
                    <span className="text-white font-medium">
                      ${calculateTotals().subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Shipping:</span>
                    <span className="text-white font-medium">${shippingCharges.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-accent/20">
                    <div className="flex justify-between">
                      <span className="text-white font-bold">Total:</span>
                      <span className="text-2xl font-bold text-accent">
                        ${calculateTotals().total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-accent/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Payment Amount:</span>
                      <span className="text-green-400 font-medium">
                        ${paymentData.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-slate-300">Due Amount:</span>
                      <span className="text-red-400 font-medium">
                        ${(calculateTotals().total - paymentData.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Footer with Navigation Buttons */}
        <div className="p-5 border-t border-white/10 bg-gradient-to-r from-[#0f172a] to-[#1e293b]">
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium active:scale-95 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-orange-600 rounded-xl text-white font-bold shadow-lg shadow-accent/30 hover:shadow-accent/40 active:scale-95 transition-all"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/40 active:scale-95 transition-all"
              >
                <Check className="w-5 h-5" />
                Submit Purchase
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
