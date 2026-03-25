import { useState } from "react";
import { ArrowLeft, Plus, Search, Filter, Phone, Mail, MapPin, Building2, User } from "lucide-react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";

export function Contacts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "customer" | "supplier">("all");

  const contacts = [
    {
      id: "1",
      name: "John Anderson",
      company: "Anderson Manufacturing Co.",
      type: "customer",
      email: "john.anderson@anderson-mfg.com",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      totalSales: 125000,
      outstandingBalance: 5000,
      lastContact: "2024-03-20",
      avatar: "JA",
    },
    {
      id: "2",
      name: "Sarah Martinez",
      company: "Quality Supplies Ltd.",
      type: "supplier",
      email: "sarah.m@qualitysupplies.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, USA",
      totalPurchases: 85000,
      outstandingBalance: 2500,
      lastContact: "2024-03-19",
      avatar: "SM",
    },
    {
      id: "3",
      name: "Michael Chen",
      company: "Tech Solutions Inc.",
      type: "customer",
      email: "m.chen@techsolutions.com",
      phone: "+1 (555) 345-6789",
      location: "San Francisco, USA",
      totalSales: 95000,
      outstandingBalance: 0,
      lastContact: "2024-03-18",
      avatar: "MC",
    },
    {
      id: "4",
      name: "Emily Johnson",
      company: "Global Materials Corp.",
      type: "supplier",
      email: "emily.j@globalmaterials.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, USA",
      totalPurchases: 150000,
      outstandingBalance: 8000,
      lastContact: "2024-03-17",
      avatar: "EJ",
    },
    {
      id: "5",
      name: "David Williams",
      company: "Williams Retail Group",
      type: "customer",
      email: "d.williams@williamsretail.com",
      phone: "+1 (555) 567-8901",
      location: "Miami, USA",
      totalSales: 72000,
      outstandingBalance: 3500,
      lastContact: "2024-03-16",
      avatar: "DW",
    },
    {
      id: "6",
      name: "Lisa Thompson",
      company: "Thompson Industries",
      type: "customer",
      email: "lisa@thompsonindustries.com",
      phone: "+1 (555) 678-9012",
      location: "Seattle, USA",
      totalSales: 110000,
      outstandingBalance: 0,
      lastContact: "2024-03-15",
      avatar: "LT",
    },
  ];

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === "all" || contact.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: contacts.length,
    customers: contacts.filter((c) => c.type === "customer").length,
    suppliers: contacts.filter((c) => c.type === "supplier").length,
  };

  const getAvatarGradient = (type: string) => {
    return type === "customer"
      ? "from-blue-500 to-blue-600"
      : "from-purple-500 to-purple-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-safe">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-white/5">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">Contacts</h1>
              <p className="text-sm text-slate-400">Manage customers & suppliers</p>
            </div>
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-transform">
              <Filter className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 backdrop-blur-xl bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveFilter("all")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "text-slate-400"
              }`}
            >
              <User className="w-4 h-4" />
              All ({stats.total})
            </button>
            <button
              onClick={() => setActiveFilter("customer")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all ${
                activeFilter === "customer"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "text-slate-400"
              }`}
            >
              Customers ({stats.customers})
            </button>
            <button
              onClick={() => setActiveFilter("supplier")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all ${
                activeFilter === "supplier"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "text-slate-400"
              }`}
            >
              Suppliers ({stats.suppliers})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-2">
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
            <p className="text-xs text-slate-400 mb-1">Active Customers</p>
            <p className="text-2xl font-bold text-white">{stats.customers}</p>
            <p className="text-xs text-blue-400 mt-1">↑ 5 this month</p>
          </Card>
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
            <p className="text-xs text-slate-400 mb-1">Active Suppliers</p>
            <p className="text-2xl font-bold text-white">{stats.suppliers}</p>
            <p className="text-xs text-purple-400 mt-1">↑ 2 this month</p>
          </Card>
        </div>

        {/* Contacts List */}
        {filteredContacts.map((contact) => (
          <Card
            key={contact.id}
            onClick={() => navigate(`/contacts/${contact.id}`)}
            className="backdrop-blur-xl bg-white/5 border-white/10 p-4 active:scale-[0.98] transition-transform cursor-pointer"
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarGradient(
                  contact.type
                )} flex items-center justify-center flex-shrink-0 shadow-lg`}
              >
                <span className="text-white font-bold text-sm">{contact.avatar}</span>
              </div>

              {/* Contact Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-white mb-0.5">{contact.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3 h-3 text-slate-500" />
                      <p className="text-xs text-slate-400">{contact.company}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      contact.type === "customer"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    }`}
                  >
                    {contact.type}
                  </span>
                </div>

                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <p className="text-xs text-slate-400 truncate">{contact.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <p className="text-xs text-slate-400">{contact.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <p className="text-xs text-slate-400">{contact.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">
                      {contact.type === "customer" ? "Total Sales" : "Total Purchases"}
                    </p>
                    <p className="text-sm text-white font-bold">
                      ${(contact.totalSales || contact.totalPurchases || 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Outstanding</p>
                    <p
                      className={`text-sm font-bold ${
                        contact.outstandingBalance > 0 ? "text-accent" : "text-green-400"
                      }`}
                    >
                      ${contact.outstandingBalance.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No contacts found</p>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => console.log("Add contact")}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-accent to-orange-600 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center justify-center active:scale-95 transition-transform z-30"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
