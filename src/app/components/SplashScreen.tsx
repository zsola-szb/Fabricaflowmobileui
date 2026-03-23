import { useEffect, useState } from "react";
import { Factory } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Show splash screen for 2.5 seconds
    const timer = setTimeout(() => {
      setIsAnimating(false);
      // Wait for fade out animation before calling onComplete
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container with glassmorphic effect */}
        <div 
          className="relative mb-8 animate-bounce-slow"
          style={{
            animation: "float 3s ease-in-out infinite",
          }}
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-accent via-orange-500 to-orange-600 blur-2xl opacity-60 animate-pulse" />
          
          {/* Glassmorphic card */}
          <div 
            className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-[36px] p-8 shadow-2xl"
            style={{
              boxShadow: "0 0 80px rgba(249, 115, 22, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.03)",
            }}
          >
            {/* Inner gradient glow */}
            <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-accent/30 via-transparent to-orange-600/30 opacity-50" />
            
            {/* Logo icon */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-orange-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.6)]">
                <Factory className="w-14 h-14 text-white" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>

        {/* Brand name with animation */}
        <div className="text-center space-y-2 animate-fade-in-up">
          <h1 
            className="text-4xl font-bold bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent"
            style={{
              animation: "fade-in 1s ease-out 0.5s both",
            }}
          >
            Fabrica Flow
          </h1>
          <p 
            className="text-slate-400 text-sm tracking-wider uppercase"
            style={{
              animation: "fade-in 1s ease-out 0.8s both",
            }}
          >
            Manufacturing ERP System
          </p>
        </div>

        {/* Loading indicator */}
        <div 
          className="mt-12 flex gap-2"
          style={{
            animation: "fade-in 1s ease-out 1.2s both",
          }}
        >
          <div 
            className="w-2 h-2 bg-accent rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <div 
            className="w-2 h-2 bg-accent rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <div 
            className="w-2 h-2 bg-accent rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

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

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s both;
        }

        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}
