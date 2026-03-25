import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  CreditCard,
  Edit,
  Trash2,
  Download,
  Upload,
  ShoppingCart,
  Package,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Card } from "../components/ui/card";

type TabType = "profile" | "sales" | "documents" | "payments";

export function ContactDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  // Mock contact data - in real app, fetch based on id
  const contact = {
    id: id || "1",
    name: "John Anderson",
    company: "Anderson Manufacturing Co.",
    type: "customer",
    email: "john.anderson@anderson-mfg.com",
    phone: "+1 (555) 123-4567",
    mobile: "+1 (555) 123-9999",
    location: "New York, USA",
    address: "123 Business Ave, New York, NY 10001",
    website: "www.anderson-mfg.com",
    taxNumber: "TAX-123456789",
    creditLimit: 50000,
    totalSales: 125000,
    outstandingBalance: 5000,
    lastContact: "2024-03-20",
    joinedDate: "2023-01-15",
    avatar: "JA",
    notes: "Premium customer, always pays on time. Prefers quarterly orders.",
  };

  const salesHistory = [
    {
      id: "INV-001",
      date: "2024-03-15",
      amount: 12500,
      status: "paid",
      items: 15,
    },
    {
      id: "INV-002",
      date: "2024-02-10",
      amount: 8900,
      status: "paid",
      items: 10,
    },
    {
      id: "INV-003",
      date: "2024-01-20",
      amount: 15000,
      status: "pending",
      items: 20,
    },
    {
      id: "INV-004",
      date: "2023-12-15",
      amount: 10500,
      status: "paid",
      items: 12,
    },
  ];

  const documents = [
    {
      id: "1",
      name: "Contract_2024.pdf",
      type: "Contract",
      size: "2.4 MB",
      date: "2024-01-15",
    },
    {
      id: "2",
      name: "Tax_Certificate.pdf",
      type: "Certificate",
      size: "1.2 MB",
      date: "2024-01-10",
    },
    {
      id: "3",
      name: "Company_Profile.docx",
      type: "Profile",
      size: "856 KB",
      date: "2023-12-20",
    },
  ];

  const payments = [
    {
      id: "PAY-001",
      date: "2024-03-16",
      amount: 12500,
      method: "Bank Transfer",
      reference: "REF-001",
      status: "completed",
    },
    {
      id: "PAY-002",
      date: "2024-02-12",
      amount: 8900,
      method: "Check",
      reference: "CHQ-5678",
      status: "completed",
    },
    {
      id: "PAY-003",
      date: "2024-01-25",
      amount: 7500,
      method: "Bank Transfer",
      reference: "REF-002",
      status: "completed",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
      case "completed":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "overdue":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
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
              <h1 className="text-lg font-bold text-white">Contact Details</h1>
              <p className="text-xs text-slate-400">{contact.company}</p>
            </div>
            <button className="p-2 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-transform">
              <Edit className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 active:scale-95 transition-transform">
              <Trash2 className="w-5 h-5 text-red-400" />
            </button>
          </div>

          {/* Contact Header Card */}
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold text-lg">{contact.avatar}</span>
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-white text-lg mb-1">{contact.name}</h2>
                <div className="flex items-center gap-1.5 mb-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <p className="text-sm text-slate-400">{contact.company}</p>
                </div>
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Customer
                </span>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <div className="grid grid-cols-4 gap-2 backdrop-blur-xl bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-2.5 px-2 rounded-lg font-medium text-xs transition-all ${
                activeTab === "profile"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "text-slate-400"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("sales")}
              className={`py-2.5 px-2 rounded-lg font-medium text-xs transition-all ${
                activeTab === "sales"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "text-slate-400"
              }`}
            >
              Sales
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`py-2.5 px-2 rounded-lg font-medium text-xs transition-all ${
                activeTab === "documents"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "text-slate-400"
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`py-2.5 px-2 rounded-lg font-medium text-xs transition-all ${
                activeTab === "payments"
                  ? "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg"
                  : "text-slate-400"
              }`}
            >
              Payments
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-4 animate-fade-in">
            {/* Contact Information */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-400">Email</span>
                  </div>
                  <span className="text-sm text-white">{contact.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-400">Phone</span>
                  </div>
                  <span className="text-sm text-white">{contact.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-400">Mobile</span>
                  </div>
                  <span className="text-sm text-white">{contact.mobile}</span>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-400">Address</span>
                  </div>
                  <span className="text-sm text-white text-right max-w-[200px]">
                    {contact.address}
                  </span>
                </div>
              </div>
            </Card>

            {/* Business Details */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-accent" />
                Business Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Website</span>
                  <span className="text-sm text-blue-400">{contact.website}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Tax Number</span>
                  <span className="text-sm text-white">{contact.taxNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Credit Limit</span>
                  <span className="text-sm text-green-400 font-bold">
                    ${contact.creditLimit.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Joined Date</span>
                  <span className="text-sm text-white">
                    {new Date(contact.joinedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>

            {/* Financial Summary */}
            <Card className="backdrop-blur-xl bg-gradient-to-br from-accent/10 to-orange-600/10 border-accent/30 p-4">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-accent" />
                Financial Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Total Sales</p>
                  <p className="text-xl font-bold text-white">
                    ${contact.totalSales.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 mb-1">Outstanding</p>
                  <p className="text-xl font-bold text-accent">
                    ${contact.outstandingBalance.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>

            {/* Notes */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                Notes
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{contact.notes}</p>
            </Card>
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === "sales" && (
          <div className="space-y-4 animate-fade-in">
            {/* Sales Summary */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-3">
                <p className="text-xs text-slate-400 mb-1">Total Orders</p>
                <p className="text-xl font-bold text-white">{salesHistory.length}</p>
              </Card>
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-3">
                <p className="text-xs text-slate-400 mb-1">Total Value</p>
                <p className="text-xl font-bold text-white">$125K</p>
              </Card>
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-3">
                <p className="text-xs text-slate-400 mb-1">Avg. Order</p>
                <p className="text-xl font-bold text-white">$11.5K</p>
              </Card>
            </div>

            {/* Sales History */}
            {salesHistory.map((sale) => (
              <Card
                key={sale.id}
                className="backdrop-blur-xl bg-white/5 border-white/10 p-4 active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-accent to-orange-600 rounded-xl shadow-lg shadow-accent/20">
                      <ShoppingCart className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white mb-0.5">{sale.id}</p>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <p className="text-xs text-slate-400">
                          {new Date(sale.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      sale.status
                    )}`}
                  >
                    {sale.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Items</p>
                    <div className="flex items-center gap-1">
                      <Package className="w-3 h-3 text-slate-400" />
                      <p className="text-sm text-white font-medium">{sale.items}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Amount</p>
                    <p className="text-sm text-accent font-bold">
                      ${sale.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="space-y-4 animate-fade-in">
            {/* Upload Button */}
            <button className="w-full flex items-center justify-center gap-2 p-4 backdrop-blur-xl bg-white/5 border border-dashed border-white/20 rounded-xl text-slate-400 hover:bg-white/10 hover:border-accent/30 transition-all">
              <Upload className="w-5 h-5" />
              <span className="font-medium">Upload Document</span>
            </button>

            {/* Documents List */}
            {documents.map((doc) => (
              <Card
                key={doc.id}
                className="backdrop-blur-xl bg-white/5 border-white/10 p-4 active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white mb-1 truncate">{doc.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded">
                        {doc.type}
                      </span>
                      <span>{doc.size}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <p className="text-xs text-slate-500">
                        {new Date(doc.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg active:scale-95 transition-all">
                    <Download className="w-4 h-4 text-white" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === "payments" && (
          <div className="space-y-4 animate-fade-in">
            {/* Payment Summary */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
                <p className="text-xs text-slate-400 mb-1">Total Paid</p>
                <p className="text-2xl font-bold text-green-400">$28.9K</p>
              </Card>
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
                <p className="text-xs text-slate-400 mb-1">Outstanding</p>
                <p className="text-2xl font-bold text-accent">
                  ${contact.outstandingBalance.toLocaleString()}
                </p>
              </Card>
            </div>

            {/* Payment History */}
            {payments.map((payment) => (
              <Card
                key={payment.id}
                className="backdrop-blur-xl bg-white/5 border-white/10 p-4 active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg shadow-green-500/20">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white mb-0.5">{payment.id}</p>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <p className="text-xs text-slate-400">
                          {new Date(payment.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Method</p>
                    <p className="text-sm text-white font-medium">{payment.method}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Reference</p>
                    <p className="text-sm text-white font-medium">{payment.reference}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Amount</p>
                    <p className="text-sm text-green-400 font-bold">
                      ${payment.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
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
