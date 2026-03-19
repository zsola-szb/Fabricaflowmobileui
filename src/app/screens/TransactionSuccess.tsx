import { useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2, Download, Share2, Home, ShoppingCart } from "lucide-react";
import { Card } from "../components/ui/card";

export function TransactionSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/pos");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.5)]">
              <CheckCircle2 className="w-12 h-12 text-white animate-in zoom-in duration-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mt-6 mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">Transaction completed successfully</p>
        </div>

        {/* Receipt Card */}
        <Card className="p-6 rounded-2xl backdrop-blur-md border border-border mb-6">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">Amount Paid</p>
            <p className="text-4xl font-bold text-green-500">Br 1,437.50</p>
          </div>

          <div className="space-y-3 border-t border-dashed border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono font-medium">#TXN-0001</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-medium">Mar 19, 2026 14:23</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium">Cash</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cashier</span>
              <span className="font-medium">Solomon Z.</span>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 font-medium active:scale-95 transition-all">
            <Download className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Download</span>
          </button>
          <button className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-medium active:scale-95 transition-all">
            <Share2 className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Share</span>
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/pos")}
            className="w-full bg-gradient-to-r from-accent to-orange-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] active:scale-95 transition-all"
          >
            <ShoppingCart className="w-5 h-5 inline mr-2" />
            New Transaction
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full text-muted-foreground font-medium py-3 rounded-xl hover:bg-slate-500/10 transition-colors"
          >
            <Home className="w-4 h-4 inline mr-2" />
            Back to Home
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Redirecting to POS in 5 seconds...
        </p>
      </div>
    </div>
  );
}
