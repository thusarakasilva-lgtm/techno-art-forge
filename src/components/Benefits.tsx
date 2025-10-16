import { DollarSign, MapPin, Heart, Clock, Sparkles } from "lucide-react";
import appMockup from "@/assets/app-mockup.jpg";

const benefits = [
  {
    icon: DollarSign,
    title: "Cost Savings",
    description: "Prevent duplicate purchases and reduce grocery waste. Save hundreds of dollars annually."
  },
  {
    icon: MapPin,
    title: "Ultimate Convenience",
    description: "Access your fridge anywhere, anytime. Perfect for quick checks while shopping or meal planning."
  },
  {
    icon: Heart,
    title: "Eco-Friendly Living",
    description: "Reduce your carbon footprint by minimizing food waste and contributing to environmental sustainability."
  },
  {
    icon: Clock,
    title: "Health & Planning",
    description: "Track perishables, plan balanced meals, and maintain a healthier lifestyle with smart reminders."
  },
  {
    icon: Sparkles,
    title: "Peace of Mind",
    description: "Stay informed without constantly opening your fridge. Maintain optimal temperature and freshness."
  }
];

export const Benefits = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative animate-fade-in order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img 
                src={appMockup} 
                alt="FridgeEye mobile app interface showing food inventory" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-gradient-hero text-white rounded-xl p-4 shadow-medium animate-float">
              <div className="text-3xl font-bold">40%</div>
              <div className="text-sm opacity-90">Less Waste</div>
            </div>
            
            <div className="absolute -bottom-6 left-6 bg-white rounded-xl p-4 shadow-medium animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <div>
                  <div className="font-semibold text-foreground">Real-time Updates</div>
                  <div className="text-xs text-muted-foreground">Instant sync</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="space-y-12 order-1 lg:order-2">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Benefits That
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Transform Your Life
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                FridgeEye isn't just a camera—it's your partner in creating a smarter, more sustainable kitchen.
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-all group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-all group-hover:scale-110">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
