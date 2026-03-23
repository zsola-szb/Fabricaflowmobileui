import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Plus,
  Package as PackageIcon,
  Building2,
  Box,
  Hash,
  FileText,
  Trash2,
  CheckCircle2,
  Clock,
  Search,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";

interface PackagingItem {
  id: string;
  variation: string;
  qtyPerUnit: string;
  plannedQty: string;
  consumedQty: string;
}

interface PackagingOrder {
  id: string;
  workOrder: string;
  finishedProduct: string;
  businessLocation: string;
  qtyToPack: string;
  qtyPacked: string;
  status: "Planned" | "In Progress" | "Completed";
  packagingItems: Array<{
    name: string;
    planned: string;
    consumed: string;
  }>;
}

const workOrders = ["WO-001", "WO-002", "WO-003", "WO-004", "WO-005", "WO-6-2-4"];
const businessLocations = ["Main Warehouse", "Factory Floor", "tets", "Location B"];
const finishedProducts = [
  "Premium Widget A (PWA-001)",
  "Standard Component B (SCB-002)",
  "test (0237)",
  "Custom Part C (CPC-003)",
];
const packagingVariations = [
  "Cardboard Box - Small",
  "Cardboard Box - Medium",
  "Cardboard Box - Large",
  "Plastic Wrapper",
  "test rm (0238)",
  "Bubble Wrap",
  "Foam Padding",
];

const mockOrders: PackagingOrder[] = [
  {
    id: "PKG-20260323-085027-466",
    workOrder: "WO-6-2-4",
    finishedProduct: "test (0237)",
    businessLocation: "tets",
    qtyToPack: "1.00",
    qtyPacked: "0.00",
    status: "Planned",
    packagingItems: [
      { name: "test rm (0238)", planned: "1.0000", consumed: "1.0000" },
    ],
  },
  {
    id: "PKG-20260323-085027-467",
    workOrder: "WO-001",
    finishedProduct: "Premium Widget A (PWA-001)",
    businessLocation: "Main Warehouse",
    qtyToPack: "50.00",
    qtyPacked: "25.00",
    status: "In Progress",
    packagingItems: [
      { name: "Cardboard Box - Medium", planned: "50.0000", consumed: "25.0000" },
      { name: "Bubble Wrap", planned: "100.0000", consumed: "50.0000" },
    ],
  },
  {
    id: "PKG-20260323-085027-468",
    workOrder: "WO-002",
    finishedProduct: "Standard Component B (SCB-002)",
    businessLocation: "Factory Floor",
    qtyToPack: "100.00",
    qtyPacked: "100.00",
    status: "Completed",
    packagingItems: [
      { name: "Cardboard Box - Small", planned: "100.0000", consumed: "100.0000" },
    ],
  },
];

export function Packaging() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Create Order form state
  const [formData, setFormData] = useState({
    workOrder: "",
    businessLocation: "",
    finishedProduct: "",
    qtyToPack: "",
    packedQty: "",
    notes: "",
  });

  const [packagingItems, setPackagingItems] = useState<PackagingItem[]>([
    { id: "1", variation: "", qtyPerUnit: "", plannedQty: "", consumedQty: "" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addPackagingItem = () => {
    setPackagingItems([
      ...packagingItems,
      {
        id: Date.now().toString(),
        variation: "",
        qtyPerUnit: "",
        plannedQty: "",
        consumedQty: "",
      },
    ]);
  };

  const updatePackagingItem = (id: string, field: keyof PackagingItem, value: string) => {
    setPackagingItems(
      packagingItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removePackagingItem = (id: string) => {
    if (packagingItems.length > 1) {
      setPackagingItems(packagingItems.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset and switch to orders tab after showing success
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          workOrder: "",
          businessLocation: "",
          finishedProduct: "",
          qtyToPack: "",
          packedQty: "",
          notes: "",
        });
        setPackagingItems([
          { id: "1", variation: "", qtyPerUnit: "", plannedQty: "", consumedQty: "" },
        ]);
        setActiveTab("orders");
      }, 1500);
    }, 1000);
  };

  const handleCompleteOrder = (orderId: string) => {
    // Handle order completion
    console.log("Completing order:", orderId);
  };

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.workOrder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.finishedProduct.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: PackagingOrder["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "In Progress":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Planned
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.5)]">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">Order Created!</h3>
            <p className="text-slate-300">Packaging order has been created successfully</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-6 text-slate-50 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => navigate("/manufacturing")}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Packaging</h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>

        <p className="text-slate-400 text-sm text-center">
          Manage packaging orders and items
        </p>
      </div>

      {/* Main Content */}
      <div className="px-4 mt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-card/50 p-1 rounded-xl border border-border">
            <TabsTrigger 
              value="create"
              className="data-[state=active]:bg-accent data-[state=active]:text-white rounded-lg py-2.5 font-medium transition-all"
            >
              Create Order
            </TabsTrigger>
            <TabsTrigger 
              value="orders"
              className="data-[state=active]:bg-accent data-[state=active]:text-white rounded-lg py-2.5 font-medium transition-all"
            >
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Create Order Tab */}
          <TabsContent value="create" className="mt-0">
            <form onSubmit={handleSubmit}>
              <Card className="p-5 rounded-2xl backdrop-blur-md border border-border mb-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <PackageIcon className="w-5 h-5 text-accent" />
                  Order Details
                </h3>

                <div className="space-y-4">
                  {/* Work Orders */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Work Orders
                    </label>
                    <select
                      value={formData.workOrder}
                      onChange={(e) => updateFormData("workOrder", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    >
                      <option value="">Select work order</option>
                      {workOrders.map((wo) => (
                        <option key={wo} value={wo}>
                          {wo}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Business Location */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Building2 className="w-4 h-4 inline mr-2" />
                      Business Location *
                    </label>
                    <select
                      value={formData.businessLocation}
                      onChange={(e) => updateFormData("businessLocation", e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    >
                      <option value="">Select location</option>
                      {businessLocations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Finished Product Variation */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Box className="w-4 h-4 inline mr-2" />
                      Finished Product Variation *
                    </label>
                    <select
                      value={formData.finishedProduct}
                      onChange={(e) => updateFormData("finishedProduct", e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    >
                      <option value="">Select product</option>
                      {finishedProducts.map((product) => (
                        <option key={product} value={product}>
                          {product}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Qty to Pack */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Hash className="w-4 h-4 inline mr-2" />
                      Qty to Pack *
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      value={formData.qtyToPack}
                      onChange={(e) => updateFormData("qtyToPack", e.target.value)}
                      placeholder="0.00"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    />
                  </div>

                  {/* Packed Qty */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Hash className="w-4 h-4 inline mr-2" />
                      Packed Qty
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.packedQty}
                      onChange={(e) => updateFormData("packedQty", e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => updateFormData("notes", e.target.value)}
                      placeholder="Add packaging notes..."
                      rows={3}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all resize-none"
                    />
                  </div>
                </div>
              </Card>

              {/* Packaging Items */}
              <Card className="p-5 rounded-2xl backdrop-blur-md border border-border mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Box className="w-5 h-5 text-accent" />
                    Packaging Items
                  </h3>
                  <button
                    type="button"
                    onClick={addPackagingItem}
                    className="p-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 active:scale-95 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-2">
                          PACKAGING ITEM VARIATION *
                        </th>
                        <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-2">
                          QTY / UNIT *
                        </th>
                        <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-2">
                          PLANNED QTY *
                        </th>
                        <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-2">
                          CONSUMED QTY
                        </th>
                        <th className="text-left text-xs font-medium text-muted-foreground pb-3">
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {packagingItems.map((item) => (
                        <tr key={item.id} className="border-b border-border/50">
                          <td className="py-3 pr-2">
                            <select
                              value={item.variation}
                              onChange={(e) =>
                                updatePackagingItem(item.id, "variation", e.target.value)
                              }
                              required
                              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                            >
                              <option value="">Select variation</option>
                              {packagingVariations.map((variation) => (
                                <option key={variation} value={variation}>
                                  {variation}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 pr-2">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.qtyPerUnit}
                              onChange={(e) =>
                                updatePackagingItem(item.id, "qtyPerUnit", e.target.value)
                              }
                              placeholder="0.00"
                              required
                              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                            />
                          </td>
                          <td className="py-3 pr-2">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.plannedQty}
                              onChange={(e) =>
                                updatePackagingItem(item.id, "plannedQty", e.target.value)
                              }
                              placeholder="0.00"
                              required
                              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                            />
                          </td>
                          <td className="py-3 pr-2">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.consumedQty}
                              onChange={(e) =>
                                updatePackagingItem(item.id, "consumedQty", e.target.value)
                              }
                              placeholder="0.00"
                              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                            />
                          </td>
                          <td className="py-3">
                            <button
                              type="button"
                              onClick={() => removePackagingItem(item.id)}
                              disabled={packagingItems.length === 1}
                              className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {packagingItems.map((item, index) => (
                    <Card key={item.id} className="p-4 bg-background/50 border border-border/50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-muted-foreground">
                          Item #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removePackagingItem(item.id)}
                          disabled={packagingItems.length === 1}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">
                            Variation *
                          </label>
                          <select
                            value={item.variation}
                            onChange={(e) =>
                              updatePackagingItem(item.id, "variation", e.target.value)
                            }
                            required
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                          >
                            <option value="">Select variation</option>
                            {packagingVariations.map((variation) => (
                              <option key={variation} value={variation}>
                                {variation}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-muted-foreground mb-1">
                              Qty / Unit *
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.qtyPerUnit}
                              onChange={(e) =>
                                updatePackagingItem(item.id, "qtyPerUnit", e.target.value)
                              }
                              placeholder="0.00"
                              required
                              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-muted-foreground mb-1">
                              Planned Qty *
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.plannedQty}
                              onChange={(e) =>
                                updatePackagingItem(item.id, "plannedQty", e.target.value)
                              }
                              placeholder="0.00"
                              required
                              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">
                            Consumed Qty
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.consumedQty}
                            onChange={(e) =>
                              updatePackagingItem(item.id, "consumedQty", e.target.value)
                            }
                            placeholder="0.00"
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-accent to-orange-600 text-white font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Order...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Create Packaging Order
                  </>
                )}
              </button>
            </form>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-0">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="p-4 rounded-2xl backdrop-blur-md border border-border">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-accent">{order.id}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Work Order: {order.workOrder}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Product:</span>
                      <span className="font-medium">{order.finishedProduct}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{order.businessLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity:</span>
                      <div className="text-right">
                        <div className="font-medium text-blue-500">
                          To Pack: {order.qtyToPack}
                        </div>
                        <div className="font-medium text-green-500">
                          Packed: {order.qtyPacked}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Packaging Items */}
                  <div className="bg-background/50 rounded-lg p-3 mb-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      PACKAGING ITEMS
                    </p>
                    <div className="space-y-1.5">
                      {order.packagingItems.map((item, index) => (
                        <p key={index} className="text-xs">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-muted-foreground">
                            {" "}
                            | Planned: {item.planned} | Consumed: {item.consumed}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  {order.status !== "Completed" && (
                    <button
                      onClick={() => handleCompleteOrder(order.id)}
                      className="w-full bg-green-500/10 border border-green-500/30 text-green-400 font-medium py-3 rounded-xl hover:bg-green-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Complete Order
                    </button>
                  )}
                </Card>
              ))}

              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <PackageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No orders found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}