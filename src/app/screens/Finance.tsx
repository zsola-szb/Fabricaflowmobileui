import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  CreditCard,
  Wallet,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { AddExpenseModal } from "../components/AddExpenseModal";

const expenses = [
  { id: 1, category: "Office Supplies", amount: "Br 350.00", date: "Mar 18, 2026", status: "Paid" },
  { id: 2, category: "Utilities", amount: "Br 1,200.00", date: "Mar 15, 2026", status: "Paid" },
  { id: 3, category: "Marketing", amount: "Br 890.00", date: "Mar 14, 2026", status: "Pending" },
];

const accounts = [
  { id: 1, name: "Cash Account", balance: "Br 15,450.00", type: "Cash" },
  { id: 2, name: "Bank Account - CBE", balance: "Br 45,200.00", type: "Bank" },
  { id: 3, name: "Mobile Money", balance: "Br 8,300.00", type: "Mobile" },
];

const reports = [
  { name: "Balance Sheet", icon: Wallet },
  { name: "Trial Balance", icon: CreditCard },
  { name: "Cash Flow", icon: TrendingUp },
  { name: "Payment Report", icon: Receipt },
];

export function Finance() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-6 pb-24 text-slate-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Finance</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/10 backdrop-blur-md border-white/10 p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <p className="text-white/80 text-sm">Total Income</p>
            </div>
            <p className="text-2xl font-bold text-white">Br 68,950</p>
            <p className="text-green-400 text-xs mt-1">+12% from last month</p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/10 p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <p className="text-white/80 text-sm">Total Expenses</p>
            </div>
            <p className="text-2xl font-bold text-white">Br 12,440</p>
            <p className="text-red-400 text-xs mt-1">+5% from last month</p>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-16">
        {/* Tabs */}
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="w-full bg-card/60 backdrop-blur-md border border-border rounded-xl p-1 mb-4">
            <TabsTrigger value="expenses" className="flex-1 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white">
              Expenses
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex-1 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white">
              Accounts
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex-1 rounded-lg data-[state=active]:bg-accent data-[state=active]:text-white">
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="mt-0">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Card className="p-3 rounded-xl backdrop-blur-md border border-border">
                <p className="text-xs text-muted-foreground mb-1">Today</p>
                <p className="text-lg font-bold">Br 350</p>
              </Card>
              <Card className="p-3 rounded-xl backdrop-blur-md border border-border">
                <p className="text-xs text-muted-foreground mb-1">This Week</p>
                <p className="text-lg font-bold">Br 2,440</p>
              </Card>
              <Card className="p-3 rounded-xl backdrop-blur-md border border-border">
                <p className="text-xs text-muted-foreground mb-1">This Month</p>
                <p className="text-lg font-bold">Br 12,440</p>
              </Card>
            </div>

            {/* Expenses List */}
            <div className="space-y-3 mb-6">
              {expenses.map((expense) => (
                <Card key={expense.id} className="p-4 rounded-xl backdrop-blur-md border border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-500/20 rounded-xl">
                      <Receipt className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold">{expense.category}</h3>
                        <Badge
                          className={
                            expense.status === "Paid"
                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/20 border-green-500/30"
                              : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 border-yellow-500/30"
                          }
                        >
                          {expense.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">{expense.amount}</p>
                        <p className="text-sm text-muted-foreground">{expense.date}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="mt-0">
            {/* Total Balance */}
            <Card className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50 border-white/10">
              <p className="text-white/80 text-sm mb-2">Total Balance</p>
              <p className="text-3xl font-bold mb-4">Br 68,950.00</p>
              <div className="flex gap-4 text-sm">
                <div>
                  <p className="text-white/80">Active Accounts</p>
                  <p className="font-bold">3</p>
                </div>
                <div>
                  <p className="text-white/80">Last Updated</p>
                  <p className="font-bold">Mar 19, 2026</p>
                </div>
              </div>
            </Card>

            {/* Accounts List */}
            <div className="space-y-3 mb-6">
              {accounts.map((account) => (
                <Card key={account.id} className="p-4 rounded-xl backdrop-blur-md border border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <Wallet className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-bold">{account.name}</h3>
                          <p className="text-sm text-muted-foreground">{account.type}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <p className="text-lg font-bold mt-2">{account.balance}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            <div className="space-y-3 mb-6">
              {reports.map((report) => {
                const Icon = report.icon;
                return (
                  <Card
                    key={report.name}
                    className="p-4 rounded-xl backdrop-blur-md border border-border active:scale-95 transition-transform cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-accent/10 rounded-xl">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="font-bold">{report.name}</h3>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsAddExpenseOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-accent shadow-[0_0_20px_rgba(249,115,22,0.4)] rounded-full flex items-center justify-center active:scale-95 transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] z-40"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Add Expense Modal */}
      <AddExpenseModal isOpen={isAddExpenseOpen} onClose={() => setIsAddExpenseOpen(false)} />
    </div>
  );
}