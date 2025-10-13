import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, Shield, AlertTriangle, CheckCircle, BarChart3, Activity, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

const Analytics = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  const stats = [
    { title: 'Total Scans', value: '1,247', change: '+12%', icon: <BarChart3 className="w-5 h-5" />, color: 'text-primary' },
    { title: 'Threats Blocked', value: '89', change: '+5%', icon: <Shield className="w-5 h-5" />, color: 'text-success' },
    { title: 'Critical Alerts', value: '23', change: '-8%', icon: <AlertTriangle className="w-5 h-5" />, color: 'text-destructive' },
    { title: 'Safe URLs', value: '1,158', change: '+15%', icon: <CheckCircle className="w-5 h-5" />, color: 'text-success' },
  ];

  const recentActivity = [
    { time: '2 min ago', action: 'URL Scan', result: 'Safe', risk: 'low' },
    { time: '15 min ago', action: 'Document Analysis', result: 'Threat Detected', risk: 'high' },
    { time: '1 hour ago', action: 'Image Scan', result: 'Safe', risk: 'low' },
    { time: '2 hours ago', action: 'URL Scan', result: 'Suspicious', risk: 'medium' },
    { time: '3 hours ago', action: 'Threat Intel', result: 'Safe', risk: 'low' },
  ];

  const threatTypes = [
    { type: 'Phishing', count: 34, percentage: 38 },
    { type: 'Malware', count: 28, percentage: 31 },
    { type: 'Suspicious Links', count: 18, percentage: 20 },
    { type: 'Other', count: 9, percentage: 11 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-6 py-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your security metrics and scan history</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.color} bg-primary/10`}>
                    {stat.icon}
                  </div>
                  <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest security scans and analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.risk === 'low' ? 'bg-success' :
                        activity.risk === 'medium' ? 'bg-warning' : 'bg-destructive'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium ${
                      activity.risk === 'low' ? 'text-success' :
                      activity.risk === 'medium' ? 'text-warning' : 'text-destructive'
                    }`}>
                      {activity.result}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Threat Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Threat Distribution
              </CardTitle>
              <CardDescription>Types of threats detected this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatTypes.map((threat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{threat.type}</span>
                      <span className="text-muted-foreground">{threat.count} threats</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${threat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>System performance and scanning statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Average Scan Time</p>
                <p className="text-2xl font-bold">2.3s</p>
                <p className="text-xs text-success">15% faster than average</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Detection Accuracy</p>
                <p className="text-2xl font-bold">98.7%</p>
                <p className="text-xs text-success">Above industry standard</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-xs text-success">Excellent reliability</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
