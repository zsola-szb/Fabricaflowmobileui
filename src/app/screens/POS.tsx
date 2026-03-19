import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Search,
  Grid3x3,
  List,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  User,
  CreditCard,
  Banknote,
  Smartphone,
  X,
  Check,
  Calculator,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const products = [
  { id: 1, name: "Product A", price: 850, stock: 45, category: "Electronics", image: "🎧" },
  { id: 2, name: "Product B", price: 450, stock: 8, category: "Clothing", image: "👕" },
  { id: 3, name: "Product C", price: 120, stock: 120, category: "Food", image: "🍕" },
  { id: 4, name: "Product D", price: 1200, stock: 15, category: "Electronics", image: "📱" },
  { id: 5, name: "Product E", price: 680, stock: 32, category: "Accessories", image: "⌚" },
  { id: 6, name: "Product F", price: 290, stock: 67, category: "Food", image: "☕" },
  { id: 7, name: "Product G", price: 1500, stock: 9, category: "Electronics", image: "💻" },
  { id: 8, name: "Product H", price: 380, stock: 24, category: "Clothing", image: "👟" },
];

const categories = ["All", "Electronics", "Clothing", "Food", "Accessories"];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function POS() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length > 0) {
      setShowCheckout(true);
    }
  };

  const handleCompleteTransaction = () => {
    // Complete transaction logic here
    navigate("/transaction-success");
  };

  const paymentMethods = [
    { id: "cash", name: "Cash", icon: Banknote, color: "bg-green-500/20 text-green-400 border-green-500/30" },
    { id: "card", name: "Card", icon: CreditCard, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    { id: "mobile", name: "Mobile Money", icon: Smartphone, color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  ];

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-6 text-slate-50 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Point of Sale</h1>
          <button
            onClick={() => setShowCart(true)}
            className="relative p-2 rounded-xl bg-accent/20 backdrop-blur-md border border-accent/30 hover:bg-accent/30 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-accent" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors"
          >
            {viewMode === "grid" ? <List className="w-5 h-5" /> : <Grid3x3 className="w-5 h-5" />}
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-accent text-white"
                  : "bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="px-4 pt-4">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="group"
              >
                <Card className="p-4 rounded-2xl backdrop-blur-md border border-border hover:border-accent/50 active:scale-95 transition-all">
                  <div className="w-full aspect-square bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mb-3">
                    <span className="text-4xl">{product.image}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1 truncate">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-accent">Br {product.price}</p>
                    <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
                      {product.stock}
                    </Badge>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="w-full group"
              >
                <Card className="p-3 rounded-xl backdrop-blur-md border border-border hover:border-accent/50 active:scale-95 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{product.image}</span>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h3 className="font-bold text-sm truncate">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                      <p className="text-lg font-bold text-accent mt-1">Br {product.price}</p>
                    </div>
                    <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
                      {product.stock}
                    </Badge>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Cart Summary Bar */}
      {cart.length > 0 && !showCart && (
        <div className="fixed bottom-20 left-0 right-0 px-4 z-20 max-w-[480px] mx-auto">
          <button
            onClick={() => setShowCart(true)}
            className="w-full bg-gradient-to-r from-accent to-orange-600 text-white p-4 rounded-2xl shadow-[0_0_30px_rgba(249,115,22,0.5)] active:scale-95 transition-all"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-bold">{totalItems} Items</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">Br {total.toFixed(2)}</span>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  →
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in">
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-2xl animate-in slide-in-from-right">
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-4 text-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold">Cart ({totalItems})</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {customerName && (
                  <p className="text-sm text-slate-400">Customer: {customerName}</p>
                )}
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.map((item) => (
                  <Card key={item.id} className="p-3 rounded-xl backdrop-blur-md border border-border">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{item.image}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-sm">{item.name}</h3>
                            <p className="text-sm text-accent font-bold">Br {item.price}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 bg-slate-500/20 hover:bg-slate-500/30 rounded-lg flex items-center justify-center active:scale-95 transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold min-w-[2rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg flex items-center justify-center active:scale-95 transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <span className="ml-auto font-bold">
                            Br {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-border bg-card/80 backdrop-blur-lg p-4 space-y-3">
                {/* Customer Name Input */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Customer name (optional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">Br {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (15%)</span>
                    <span className="font-medium">Br {tax.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl text-accent">Br {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-accent to-orange-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] active:scale-95 transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-end justify-center animate-in fade-in">
          <div className="w-full max-w-md bg-background rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-4 text-slate-50 rounded-t-3xl">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Complete Payment</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-slate-400 text-sm">Select payment method</p>
            </div>

            <div className="p-4 space-y-4">
              {/* Total Amount Card */}
              <Card className="p-6 rounded-2xl backdrop-blur-md border border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5">
                <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
                <p className="text-4xl font-bold text-accent">Br {total.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {totalItems} items • Tax included
                </p>
              </Card>

              {/* Payment Methods */}
              <div className="space-y-2">
                <p className="font-bold text-sm text-muted-foreground uppercase tracking-wider px-1">
                  Payment Method
                </p>
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className="w-full"
                    >
                      <Card
                        className={`p-4 rounded-xl backdrop-blur-md border transition-all active:scale-95 ${
                          selectedPayment === method.id
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-xl ${method.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="flex-1 text-left font-bold">{method.name}</span>
                          {selectedPayment === method.id && (
                            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      </Card>
                    </button>
                  );
                })}
              </div>

              {/* Customer Info */}
              {customerName && (
                <Card className="p-4 rounded-xl backdrop-blur-md border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-orange-600 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Customer</p>
                      <p className="font-bold">{customerName}</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Complete Transaction Button */}
              <button
                onClick={handleCompleteTransaction}
                disabled={!selectedPayment}
                className={`w-full font-bold py-4 rounded-xl transition-all ${
                  selectedPayment
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] active:scale-95"
                    : "bg-slate-500/20 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Check className="w-5 h-5 inline mr-2" />
                Complete Transaction
              </button>

              <button
                onClick={() => setShowCheckout(false)}
                className="w-full text-muted-foreground font-medium py-3 rounded-xl hover:bg-slate-500/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}