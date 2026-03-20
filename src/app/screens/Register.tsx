import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, User, Building2, Phone, ArrowRight, ArrowLeft, Factory } from "lucide-react";
import { Card } from "../components/ui/card";

export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      setIsLoading(false);
      return;
    }

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 2000);
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    // Social signup logic here
  };

  const nextStep = () => {
    if (step === 1 && formData.fullName && formData.email) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

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
        <div className="px-6 pb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-orange-600 rounded-2xl mb-4 shadow-[0_0_40px_rgba(249,115,22,0.4)]">
            <Factory className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-slate-400 text-sm">Join Fabrica Flow today</p>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-orange-600 transition-all duration-300 ease-out"
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {step}/2
            </span>
          </div>
        </div>

        {/* Register Card */}
        <div className="flex-1 px-6 pb-8">
          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <form onSubmit={handleRegister} className="space-y-4">
              {step === 1 && (
                <>
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-white mb-1">Personal Information</h2>
                    <p className="text-slate-400 text-sm">Tell us about yourself</p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateFormData("fullName", e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => updateFormData("companyName", e.target.value)}
                        placeholder="Your Company Ltd."
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.fullName || !formData.email}
                    className="w-full bg-gradient-to-r from-accent to-orange-600 text-white font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="text-accent hover:text-orange-400 transition-colors text-sm font-medium mb-3 flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <h2 className="text-xl font-bold text-white mb-1">Security</h2>
                    <p className="text-slate-400 text-sm">Create a secure password</p>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => updateFormData("password", e.target.value)}
                        placeholder="Create a strong password"
                        required
                        minLength={8}
                        className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {formData.password && formData.password.length < 8 && (
                      <p className="text-red-400 text-xs mt-1">
                        Password must be at least 8 characters
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                        placeholder="Confirm your password"
                        required
                        className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {formData.confirmPassword &&
                      formData.password !== formData.confirmPassword && (
                        <p className="text-red-400 text-xs mt-1">Passwords don't match</p>
                      )}
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-2">
                      <p className="text-xs text-slate-400">Password strength:</p>
                      <div className="flex gap-1">
                        <div
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            formData.password.length >= 4 ? "bg-red-500" : "bg-white/10"
                          }`}
                        />
                        <div
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            formData.password.length >= 8 ? "bg-yellow-500" : "bg-white/10"
                          }`}
                        />
                        <div
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            formData.password.length >= 12 &&
                            /[A-Z]/.test(formData.password) &&
                            /[0-9]/.test(formData.password)
                              ? "bg-green-500"
                              : "bg-white/10"
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Terms Agreement */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => updateFormData("agreeTerms", e.target.checked)}
                      required
                      className="w-5 h-5 mt-0.5 rounded bg-white/5 border border-white/10 text-accent focus:ring-2 focus:ring-accent/50 cursor-pointer"
                    />
                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-accent hover:text-orange-400 transition-colors"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-accent hover:text-orange-400 transition-colors"
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>

                  {/* Register Button */}
                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      !formData.password ||
                      !formData.confirmPassword ||
                      formData.password !== formData.confirmPassword ||
                      !formData.agreeTerms
                    }
                    className="w-full bg-gradient-to-r from-accent to-orange-600 text-white font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </>
              )}
            </form>

            {step === 1 && (
              <>
                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-slate-400">Or sign up with</span>
                  </div>
                </div>

                {/* Social Signup Buttons */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => handleSocialSignup("Google")}
                    className="p-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 active:scale-95 transition-all"
                  >
                    <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                      />
                      <path
                        fill="#4A90E2"
                        d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialSignup("Apple")}
                    className="p-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 active:scale-95 transition-all"
                  >
                    <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="white">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialSignup("Microsoft")}
                    className="p-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 active:scale-95 transition-all"
                  >
                    <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24">
                      <path fill="#f25022" d="M1 1h10v10H1z" />
                      <path fill="#00a4ef" d="M13 1h10v10H13z" />
                      <path fill="#7fba00" d="M1 13h10v10H1z" />
                      <path fill="#ffb900" d="M13 13h10v10H13z" />
                    </svg>
                  </button>
                </div>
              </>
            )}

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-slate-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-accent hover:text-orange-400 transition-colors font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
