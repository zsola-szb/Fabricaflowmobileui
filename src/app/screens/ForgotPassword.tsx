import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, CheckCircle2, Factory } from "lucide-react";
import { Card } from "../components/ui/card";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex items-center justify-center p-6">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.5)]">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-3">Check Your Email</h1>
            <p className="text-slate-400 mb-2">
              We've sent a password reset link to
            </p>
            <p className="text-accent font-medium mb-8">{email}</p>

            <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-left">
              <p className="text-blue-400 text-sm">
                <strong className="block mb-1">Next steps:</strong>
                1. Check your email inbox (and spam folder)
                <br />
                2. Click the reset link in the email
                <br />
                3. Create a new password
              </p>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="w-full bg-gradient-to-r from-accent to-orange-600 text-white font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] active:scale-95 transition-all mb-3"
            >
              Back to Login
            </button>

            <button
              onClick={() => setIsSuccess(false)}
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              Didn't receive the email? Try again
            </button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="px-6 pt-8 pb-4">
          <button
            onClick={() => navigate("/login")}
            className="p-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Logo Section */}
        <div className="px-6 pb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-orange-600 rounded-2xl mb-4 shadow-[0_0_40px_rgba(249,115,22,0.4)]">
            <Factory className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Forgot Password?</h1>
          <p className="text-slate-400 text-sm">
            No worries, we'll send you reset instructions
          </p>
        </div>

        {/* Reset Form */}
        <div className="flex-1 px-6 pb-8">
          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                  />
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  Enter the email associated with your account
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-gradient-to-r from-accent to-orange-600 text-white font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>Send Reset Link</>
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <button
                onClick={() => navigate("/login")}
                className="text-slate-400 hover:text-white transition-colors text-sm flex items-center justify-center gap-2 mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </button>
            </div>
          </Card>

          {/* Help Section */}
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-xs mb-2">Still need help?</p>
            <button className="text-accent hover:text-orange-400 transition-colors text-sm font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
