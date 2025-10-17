import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-fridge.jpg";
import logo from "@/assets/logo.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-16 animate-fade-in">
          <div className="relative group cursor-pointer">
            {/* Outer glow effect */}
            <div className="absolute -inset-8 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 opacity-60 blur-2xl group-hover:opacity-90 transition-all duration-700 animate-pulse"></div>
            
            {/* Secondary glow layer */}
            <div className="absolute -inset-6 bg-gradient-to-r from-primary via-secondary to-primary opacity-40 blur-xl group-hover:opacity-60 transition-all duration-500"></div>
            
            {/* Logo container */}
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-3xl border-2 border-amber-500/40 group-hover:border-amber-400/80 transition-all duration-300 shadow-[0_0_50px_rgba(251,191,36,0.3)] group-hover:shadow-[0_0_80px_rgba(251,191,36,0.5)] group-hover:scale-105">
              {/* Inner subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/10 rounded-3xl"></div>
              
              <img 
                src={logo} 
                alt="FridgeEye - Smart Refrigerator Camera System" 
                className="h-28 w-auto object-contain relative z-10 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                Smart Kitchen Innovation
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Never Forget What's in Your
              <span className="block bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
                Fridge Again
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-xl">
              FridgeEye is your smart refrigerator companion. Access real-time views of your fridge contents, reduce food waste, and save money—all from your phone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 shadow-strong text-lg px-8 py-6 transition-all hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold">40%</div>
                <div className="text-white/80 text-sm">Less Food Waste</div>
              </div>
              <div>
                <div className="text-3xl font-bold">$600</div>
                <div className="text-white/80 text-sm">Saved Annually</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-white/80 text-sm">Remote Access</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img 
                src={heroImage} 
                alt="Smart refrigerator interior with organized food items" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 10C120 20 240 40 360 45C480 50 600 40 720 35C840 30 960 30 1080 35C1200 40 1320 50 1380 55L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};
