import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, LogOut, User, Settings, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import URLAnalyzer from '@/components/URLAnalyzer';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd clear authentication state here
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                    SecureLink
                  </h1>
                  <p className="text-xs text-muted-foreground">Threat Intelligence Platform</p>
                </div>
              </div>
              
              <Badge variant="secondary" className="px-3 py-1">
                <Shield className="w-3 h-3 mr-1" />
                Enterprise
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Welcome Section */}
        <section className="bg-gradient-to-br from-background via-secondary/10 to-accent/5 py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold">
                  Welcome to <span className="bg-gradient-hero bg-clip-text text-transparent">SecureLink</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Your intelligent web platform for advanced URL fraud detection and threat analysis
                </p>
              </div>

              <div className="flex items-center justify-center gap-8 pt-4 opacity-70">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span>System Active</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span>Threat Intel Updated</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span>Real-time Protection</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* URL Analyzer Section */}
        <section id="url-analyzer" className="py-12">
          <URLAnalyzer />
        </section>

        {/* Features Section */}
        <Features />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;