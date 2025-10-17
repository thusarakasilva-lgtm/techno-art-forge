import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Camera, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setLoading(false);
      } else {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/auth");
      } else if (session?.user) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-white border-b border-border shadow-soft">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FridgeEye
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.email}
            </span>
            <Button variant="outline" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Live Fridge View</h2>
            <p className="text-muted-foreground text-lg">Real-time monitoring of your refrigerator contents</p>
          </div>

          <div className="bg-gradient-card rounded-2xl shadow-strong p-8 animate-fade-in-scale">
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 border-4 border-gray-300 dark:border-gray-700">
              <div className="absolute top-1/2 right-2 -translate-y-1/2 w-3 h-24 bg-gray-400 dark:bg-gray-600 rounded-full shadow-md"></div>
              
              <div className="aspect-[9/16] max-h-[600px] mx-auto bg-black rounded-lg overflow-hidden relative">
                <img 
                  src="/src/assets/hero-fridge.jpg"
                  alt="Live fridge interior view"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold">LIVE</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm text-white p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      <span className="text-sm font-medium">Camera Active</span>
                    </div>
                    <div className="text-xs text-gray-300">
                      {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground mb-1">Demo Video Stream</p>
                  <p className="text-muted-foreground">
                    This is a demonstration of the live video feature. In production, this would display the actual feed from your FridgeEye camera installed in your refrigerator.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Remote Access</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft">
              <div className="text-3xl font-bold text-secondary mb-2">HD</div>
              <div className="text-sm text-muted-foreground">Video Quality</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft">
              <div className="text-3xl font-bold text-primary mb-2">Live</div>
              <div className="text-sm text-muted-foreground">Real-time Feed</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;