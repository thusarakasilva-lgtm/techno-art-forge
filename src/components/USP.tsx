import { Eye, Plug, Recycle, TrendingUp } from "lucide-react";

const usps = [
  {
    icon: Eye,
    title: "Real-Time Visibility",
    description: "Access live images of your refrigerator contents anytime, anywhere"
  },
  {
    icon: Plug,
    title: "Easy Installation",
    description: "No modifications needed—suitable for any refrigerator"
  },
  {
    icon: Recycle,
    title: "Sustainability Focus",
    description: "Encourages responsible food habits and reduces waste"
  },
  {
    icon: TrendingUp,
    title: "Scalable & Smart",
    description: "Potential integration with smart home ecosystems like Alexa and Google Home"
  }
];

export const USP = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Makes
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FridgeEye Unique
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Innovation meets simplicity. Experience the future of kitchen management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, index) => (
            <div 
              key={index}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[2px] group-hover:scale-110 transition-all duration-300">
                <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                  <usp.icon className="h-10 w-10 text-primary" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {usp.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
