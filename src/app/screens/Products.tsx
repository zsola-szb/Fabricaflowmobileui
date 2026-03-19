import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, Plus, Package, AlertTriangle } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const productsList = [
  {
    id: 1,
    name: "Product A",
    sku: "SKU-001",
    category: "Electronics",
    stock: 45,
    price: "Br 850.00",
    status: "In Stock",
  },
  {
    id: 2,
    name: "Product B",
    sku: "SKU-002",
    category: "Clothing",
    stock: 8,
    price: "Br 450.00",
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Product C",
    sku: "SKU-003",
    category: "Food",
    stock: 120,
    price: "Br 120.00",
    status: "In Stock",
  },
  {
    id: 4,
    name: "Product D",
    sku: "SKU-004",
    category: "Electronics",
    stock: 0,
    price: "Br 1,200.00",
    status: "Out of Stock",
  },
];

const categories = [
  { name: "All", count: 156 },
  { name: "Electronics", count: 42 },
  { name: "Clothing", count: 38 },
  { name: "Food", count: 76 },
];

export function Products() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-24 text-slate-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <button className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-xl hover:bg-white/15 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium whitespace-nowrap hover:bg-white/15 transition-colors"
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-16">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-4 rounded-2xl backdrop-blur-md border border-border">
            <p className="text-xs text-muted-foreground mb-1">Total</p>
            <p className="text-2xl font-bold">156</p>
          </Card>
          <Card className="p-4 rounded-2xl backdrop-blur-md border border-border">
            <p className="text-xs text-muted-foreground mb-1">Low Stock</p>
            <p className="text-2xl font-bold text-yellow-500">12</p>
          </Card>
          <Card className="p-4 rounded-2xl backdrop-blur-md border border-border">
            <p className="text-xs text-muted-foreground mb-1">Out of Stock</p>
            <p className="text-2xl font-bold text-red-500">5</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full bg-card/60 backdrop-blur-md border border-border rounded-xl p-1 mb-4">
            <TabsTrigger value="all" className="flex-1 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white">
              All Products
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex-1 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white">
              Categories
            </TabsTrigger>
            <TabsTrigger value="brands" className="flex-1 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white">
              Brands
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="space-y-3 mb-6">
              {productsList.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <Card className="p-4 rounded-xl backdrop-blur-md border border-border hover:border-accent/50 transition-colors">
                    <div className="flex gap-4">
                      {/* Product Image Placeholder */}
                      <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Package className="w-8 h-8 text-accent" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.sku}</p>
                          </div>
                          <Badge
                            variant={
                              product.status === "In Stock"
                                ? "default"
                                : product.status === "Low Stock"
                                ? "secondary"
                                : "destructive"
                            }
                            className={
                              product.status === "In Stock"
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/20 border-green-500/30"
                                : product.status === "Low Stock"
                                ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 border-yellow-500/30"
                                : "bg-red-500/20 text-red-400 hover:bg-red-500/20 border-red-500/30"
                            }
                          >
                            {product.status === "Low Stock" && (
                              <AlertTriangle className="w-3 h-3 mr-1" />
                            )}
                            {product.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                            <p className="text-lg font-bold mt-1">
                              {product.price}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Stock</p>
                            <p className="text-lg font-bold">{product.stock}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="mt-0">
            <div className="space-y-3 mb-6">
              {categories.slice(1).map((category) => (
                <Card key={category.name} className="p-4 rounded-xl backdrop-blur-md border border-border">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-accent/10 rounded-xl">
                        <Package className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.count} products</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="brands" className="mt-0">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-accent" />
              </div>
              <p className="text-muted-foreground">No brands yet</p>
              <p className="text-sm text-muted-foreground mt-1">Add your first brand</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-accent shadow-[0_0_20px_rgba(249,115,22,0.4)] rounded-full flex items-center justify-center active:scale-95 transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] z-40">
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}