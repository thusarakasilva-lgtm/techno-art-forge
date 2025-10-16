import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Camera, LogOut, Video, VideoOff, Maximize2 } from "lucide-react";
import { Session } from "@supabase/supabase-js";

const Dashboard = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [streamActive, setStreamActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) {
        navigate("/auth");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed Out",
      description: "You've been successfully logged out.",
    });
    navigate("/");
  };

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreamActive(true);
        toast({
          title: "Camera Active",
          description: "Live stream started successfully",
        });
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStreamActive(false);
      toast({
        title: "Camera Stopped",
        description: "Live stream ended",
      });
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">FridgeEye Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">Live Fridge View</h2>
            <p className="text-muted-foreground">
              Monitor your refrigerator contents in real-time
            </p>
          </div>

          {/* Fridge Container */}
          <div 
            ref={containerRef}
            className="relative bg-gradient-card rounded-3xl shadow-strong overflow-hidden border-4 border-border"
          >
            {/* Fridge Frame */}
            <div className="aspect-[16/10] relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
              {/* Inner fridge door */}
              <div className="absolute inset-4 bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl border-2 border-slate-300 dark:border-slate-600 shadow-inner">
                
                {/* Video Stream Area */}
                <div className="absolute inset-6 bg-black rounded-xl overflow-hidden">
                  {streamActive ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                      <div className="text-center text-white/60">
                        <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Camera Offline</p>
                        <p className="text-sm mt-2">Start the stream to view inside</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Stream Status Indicator */}
                  {streamActive && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      LIVE
                    </div>
                  )}

                  {/* Fullscreen Button */}
                  {streamActive && (
                    <Button
                      onClick={toggleFullscreen}
                      size="icon"
                      variant="secondary"
                      className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 border-0"
                    >
                      <Maximize2 className="h-4 w-4 text-white" />
                    </Button>
                  )}
                </div>

                {/* Fridge Shelves Decoration */}
                <div className="absolute left-6 right-6 top-1/3 h-[2px] bg-slate-300/50 dark:bg-slate-600/50"></div>
                <div className="absolute left-6 right-6 top-2/3 h-[2px] bg-slate-300/50 dark:bg-slate-600/50"></div>
              </div>

              {/* Handle */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-24 bg-slate-400 dark:bg-slate-600 rounded-l-lg"></div>
            </div>

            {/* Controls */}
            <div className="p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-t border-border">
              <div className="flex items-center justify-center gap-4">
                {!streamActive ? (
                  <Button
                    onClick={startStream}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-lg px-8"
                  >
                    <Video className="mr-2 h-5 w-5" />
                    Start Camera
                  </Button>
                ) : (
                  <Button
                    onClick={stopStream}
                    size="lg"
                    variant="destructive"
                    className="text-lg px-8"
                  >
                    <VideoOff className="mr-2 h-5 w-5" />
                    Stop Camera
                  </Button>
                )}
              </div>

              {streamActive && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Camera is active. This simulates your FridgeEye camera view.
                </p>
              )}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-soft border border-border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-2xl">📱</span>
                Remote Access
              </h3>
              <p className="text-sm text-muted-foreground">
                View your fridge from anywhere, anytime
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-soft border border-border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-2xl">🔔</span>
                Smart Alerts
              </h3>
              <p className="text-sm text-muted-foreground">
                Get notified about expiring items
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-soft border border-border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-2xl">♻️</span>
                Reduce Waste
              </h3>
              <p className="text-sm text-muted-foreground">
                Save money and help the environment
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
