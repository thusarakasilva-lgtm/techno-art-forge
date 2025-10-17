import { Camera, Smartphone, Video, Leaf, Zap, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Camera,
    title: "Smart Camera System",
    description: "High-definition cameras provide crystal-clear views of your refrigerator interior. Easy to install and compatible with most fridge models."
  },
  {
    icon: Smartphone,
    title: "Mobile App Integration",
    description: "Access your fridge inventory from anywhere. Plan your shopping efficiently and buy exactly what you need."
  },
  {
    icon: Video,
    title: "Live Fridge View",
    description: "Watch inside your fridge in real-time from anywhere. See exactly what you have before you shop, ensuring you buy only what you need."
  },
  {
    icon: Leaf,
    title: "Waste Reduction",
    description: "Reduce unnecessary purchases and food waste by up to 40%. Smart planning saves money and helps the planet."
  },
  {
    icon: Zap,
    title: "Energy Efficient",
    description: "Designed for minimal power consumption. Keep your fridge closed more often, saving energy and maintaining optimal temperature."
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Enterprise-grade encryption keeps your data safe. Your fridge contents are visible only to you and your family."
  }
];

export const Features = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to take control of your kitchen and reduce food waste
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-8 bg-gradient-card border-border hover:shadow-medium transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all group-hover:scale-110">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
