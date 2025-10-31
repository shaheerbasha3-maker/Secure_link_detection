import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Settings, BarChart3, Link2, FileText, Image, Video, Database, Lock, Globe, Eye, AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import URLAnalyzer from '@/components/URLAnalyzer';
import Footer from '@/components/Footer';
import ProfileDropdown from '@/components/ProfileDropdown';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Protect dashboard - redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Show loading or redirect while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto animate-pulse">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <p className="text-muted-foreground">Loading SecureLink Dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if user is not authenticated
  if (!user) {
    return null;
  }

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
              <Button variant="ghost" size="sm" onClick={() => navigate('/analytics')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              
              <Button variant="ghost" size="sm" onClick={() => navigate('/datasets')}>
                <Database className="w-4 h-4 mr-2" />
                Datasets
              </Button>
              
              <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              
              <ProfileDropdown />
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

        {/* Security Resources Dashboard */}
        <section className="py-12 bg-gradient-to-b from-background to-secondary/10">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Complete Security <span className="bg-gradient-primary bg-clip-text text-transparent">Resource Center</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Access all SecureLink tools and intelligence platforms from your personalized dashboard
              </p>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card 
                className="shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group"
                onClick={() => navigate('/analyze/urls')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Link2 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">URL Scanner</CardTitle>
                  <CardDescription>Supported: http://, https://</CardDescription>
                </CardHeader>
              </Card>

              <Card 
                className="shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group"
                onClick={() => navigate('/analyze/documents')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-gradient-secure rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Document Analysis</CardTitle>
                  <CardDescription>PDF, DOC, XLS, PPT</CardDescription>
                </CardHeader>
              </Card>

              <Card 
                className="shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group"
                onClick={() => navigate('/analyze/images')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-gradient-warning rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Image Scanner</CardTitle>
                  <CardDescription>JPG, PNG, GIF, BMP, TIFF</CardDescription>
                </CardHeader>
              </Card>

              <Card 
                className="shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group"
                onClick={() => navigate('/analyze/web-content')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-gradient-danger rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Threat Intel</CardTitle>
                  <CardDescription>HTML, CSS, JS, XML</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Main Dashboard Content */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Recent Scans */}
              <Card className="lg:col-span-2 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    Recent Security Scans
                  </CardTitle>
                  <CardDescription>Your latest threat analysis results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { url: "https://example-bank.com", risk: "high", threats: 3, time: "2 min ago" },
                      { url: "https://google.com", risk: "safe", threats: 0, time: "5 min ago" },
                      { url: "https://suspicious-site.net", risk: "critical", threats: 7, time: "10 min ago" }
                    ].map((scan, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            scan.risk === 'safe' ? 'bg-success' :
                            scan.risk === 'high' ? 'bg-warning' : 'bg-destructive'
                          }`} />
                          <div>
                            <p className="font-medium text-sm">{scan.url}</p>
                            <p className="text-xs text-muted-foreground">{scan.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={scan.risk === 'safe' ? 'secondary' : 'destructive'}>
                            {scan.threats} threats
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Stats */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Security Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-success">24/7</div>
                    <div className="text-sm text-muted-foreground">Protection Active</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Scans Today</span>
                      <span className="font-bold">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Threats Blocked</span>
                      <span className="font-bold text-destructive">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Safe URLs</span>
                      <span className="font-bold text-success">133</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-success">
                      <TrendingUp className="w-4 h-4" />
                      <span>Security Score: 98%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Security Tools */}
            <Card className="shadow-card bg-gradient-to-r from-primary/5 to-accent/5">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Advanced Security Arsenal</CardTitle>
                <CardDescription className="text-lg">Professional-grade tools for comprehensive threat protection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: <Eye className="w-6 h-6" />, title: "Deep Web Scan", desc: "Advanced crawling & analysis", color: "bg-gradient-primary" },
                    { icon: <Shield className="w-6 h-6" />, title: "Malware Detection", desc: "Real-time threat scanning", color: "bg-gradient-secure" },
                    { icon: <Globe className="w-6 h-6" />, title: "Domain Intelligence", desc: "Historical threat data", color: "bg-gradient-warning" },
                    { icon: <Lock className="w-6 h-6" />, title: "SSL Analysis", desc: "Certificate validation", color: "bg-gradient-danger" }
                  ].map((tool, index) => (
                    <div key={index} className="text-center space-y-3 p-4 rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer">
                      <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mx-auto text-white`}>
                        {tool.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground">{tool.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;