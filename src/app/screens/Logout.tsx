import { useNavigate } from "react-router";
import { LogOut, ArrowLeft, AlertCircle } from "lucide-react";
import { Card } from "../components/ui/card";

export function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored auth tokens/data here
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={handleCancel}
          className="mb-6 p-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Logout Card */}
        <Card className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl mb-6 shadow-[0_0_40px_rgba(239,68,68,0.4)]">
              <LogOut className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">Logout</h1>
            <p className="text-slate-400 text-sm">
              Are you sure you want to logout from your account?
            </p>
          </div>

          {/* Warning Notice */}
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-500 text-sm font-medium mb-1">
                  You'll be signed out
                </p>
                <p className="text-yellow-500/80 text-xs">
                  You'll need to sign in again to access your account and data.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] active:scale-95 transition-all"
            >
              Yes, Logout
            </button>
            <button
              onClick={handleCancel}
              className="w-full bg-white/5 border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-white/10 active:scale-95 transition-all"
            >
              Cancel
            </button>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-xs">
            Your session will be ended and you'll return to the login screen
          </p>
        </div>
      </div>
    </div>
  );
}
