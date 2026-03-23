import { useState } from "react";
import { X, Upload, Plus, Trash2, RefreshCw } from "lucide-react";
import { Card } from "./ui/card";

interface AddPurchaseReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Product {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export function AddPurchaseReturnModal({ isOpen, onClose }: AddPurchaseReturnModalProps) {
  const [formData, setFormData] = useState({
    supplier: "",
    businessLocation: "",
    referenceNo: "",
    date: "",
    document: null as File | null,
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "",
      quantity: 0,
      unitPrice: 0,
      subtotal: 0,
    },
  ]);

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now().toString(),
        name: "",
        quantity: 0,
        unitPrice: 0,
        subtotal: 0,
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
          
          // Auto-calculate subtotal
          if (field === "quantity" || field === "unitPrice") {
            updated.subtotal = updated.quantity * updated.unitPrice;
          }
          
          return updated;
        }
        return p;
      })
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      
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

  const calculateTotal = () => {
    return products.reduce((sum, p) => sum + p.subtotal, 0);
  };

  const handleSubmit = () => {
    console.log("Purchase Return submitted:", { formData, products });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#0f172a] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-[#0f172a] to-[#1e293b]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-accent to-orange-600 rounded-xl shadow-lg shadow-accent/20">
              <RefreshCw className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Add Purchase Return</h2>
              <p className="text-xs text-slate-400">Return purchased items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b]">
          {/* Basic Information */}
          <div className="space-y-4">
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Business Location <span className="text-accent">*</span>
                </label>
                <select
                  value={formData.businessLocation}
                  onChange={(e) => setFormData({ ...formData, businessLocation: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                >
                  <option value="">Select Location</option>
                  <option value="warehouse1">Warehouse 1</option>
                  <option value="warehouse2">Warehouse 2</option>
                  <option value="factory">Factory</option>
                </select>
              </div>

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
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Date <span className="text-accent">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f172a]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Attach Document</label>
              <div className="relative">
                <input
                  type="file"
                  id="return-document"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.csv,.zip,.doc,.docx,.jpeg,.jpg,.png"
                />
                <label
                  htmlFor="return-document"
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

          {/* Products Section */}
          <div className="space-y-4">
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

            {/* Products Table */}
            <div className="space-y-3">
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
                        Product
                      </label>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                        className="w-full px-3 py-2.5 bg-[#020617]/60 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                        placeholder="Enter product name"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
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
                          Unit Price
                        </label>
                        <input
                          type="number"
                          value={product.unitPrice || ""}
                          onChange={(e) =>
                            updateProduct(product.id, "unitPrice", parseFloat(e.target.value) || 0)
                          }
                          className="w-full px-3 py-2.5 bg-[#020617]/60 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">
                          Subtotal
                        </label>
                        <div className="px-3 py-2.5 bg-accent/10 border border-accent/20 rounded-lg">
                          <p className="text-sm font-bold text-accent">
                            ${product.subtotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Total */}
            <Card className="bg-gradient-to-r from-accent/10 to-orange-600/10 border-accent/30 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Total Return Amount</p>
                <p className="text-2xl font-bold text-accent">${calculateTotal().toFixed(2)}</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 bg-gradient-to-r from-[#0f172a] to-[#1e293b]">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium active:scale-95 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-accent to-orange-600 rounded-xl text-white font-bold shadow-lg shadow-accent/30 hover:shadow-accent/40 active:scale-95 transition-all"
            >
              Submit Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
