import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Search, 
  Globe, 
  Lock,
  Zap,
  Eye,
  Database
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ThreatAnalysis {
  url: string;
  domain: string;
  riskLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  threats: {
    type: string;
    severity: 'info' | 'warning' | 'error';
    description: string;
  }[];
  domainInfo: {
    registrar: string;
    created: string;
    country: string;
    ssl: boolean;
  };
  consequences: string[];
  recommendations: string[];
}

const URLAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ThreatAnalysis | null>(null);
  const { toast } = useToast();

  // Simulate URL analysis (in real app, this would call an API)
  const analyzeURL = async () => {
    if (!url.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid URL to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock analysis results
    const mockAnalysis: ThreatAnalysis = {
      url: url,
      domain: new URL(url.startsWith('http') ? url : `https://${url}`).hostname,
      riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      riskScore: Math.floor(Math.random() * 100),
      threats: [
        {
          type: 'Phishing Attempt',
          severity: 'error',
          description: 'This website appears to mimic legitimate services to steal credentials'
        },
        {
          type: 'Suspicious Domain',
          severity: 'warning', 
          description: 'Domain was recently registered and lacks reputation'
        }
      ],
      domainInfo: {
        registrar: 'GoDaddy Inc.',
        created: '2024-01-15',
        country: 'United States',
        ssl: Math.random() > 0.3
      },
      consequences: [
        'Personal information theft',
        'Financial data compromise',
        'Malware installation',
        'Identity theft'
      ],
      recommendations: [
        'Do not enter personal information',
        'Verify the authentic website URL',
        'Use official mobile apps instead',
        'Report this URL to authorities'
      ]
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete",
      description: `URL analyzed with ${mockAnalysis.riskLevel} risk level detected`,
    });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'safe': return 'success';
      case 'low': return 'secondary';
      case 'medium': return 'warning';
      case 'high': return 'destructive';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'safe': return <CheckCircle className="w-5 h-5" />;
      case 'low': return <Shield className="w-5 h-5" />;
      case 'medium': return <AlertTriangle className="w-5 h-5" />;
      case 'high': return <XCircle className="w-5 h-5" />;
      case 'critical': return <XCircle className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* URL Input Section */}
      <Card className="shadow-card border-0 bg-gradient-to-br from-card to-secondary/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-primary text-white">
              <Search className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            URL Security Analyzer
          </CardTitle>
          <CardDescription className="text-lg">
            Paste any URL, link, or web address to analyze potential security threats and risks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <Input
              placeholder="https://example.com or suspicious-link.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 h-12 text-lg border-2 focus:border-primary transition-all duration-300"
              onKeyPress={(e) => e.key === 'Enter' && analyzeURL()}
            />
            <Button 
              onClick={analyzeURL}
              disabled={isAnalyzing}
              variant="scan"
              size="lg"
              className="px-8"
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Scanning...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Analyze
                </div>
              )}
            </Button>
          </div>
          
          {isAnalyzing && (
            <div className="bg-primary/10 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="font-medium text-primary">Deep Security Analysis in Progress...</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-primary animate-scanning w-1/3"></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Risk Overview */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {getRiskIcon(analysis.riskLevel)}
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Badge 
                    variant={getRiskColor(analysis.riskLevel) as any}
                    className="text-lg px-4 py-2 font-bold uppercase"
                  >
                    {analysis.riskLevel} Risk
                  </Badge>
                  <span className="text-3xl font-bold text-foreground">
                    {analysis.riskScore}/100
                  </span>
                </div>
                
                <div className="w-full bg-secondary rounded-full h-4">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      analysis.riskLevel === 'safe' ? 'bg-gradient-secure' :
                      analysis.riskLevel === 'low' ? 'bg-gradient-primary' :
                      analysis.riskLevel === 'medium' ? 'bg-gradient-warning' :
                      'bg-gradient-danger'
                    }`}
                    style={{ width: `${analysis.riskScore}%` }}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Detected Threats
                </h4>
                {analysis.threats.map((threat, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <Badge variant={threat.severity === 'error' ? 'destructive' : 'secondary'}>
                      {threat.type}
                    </Badge>
                    <p className="text-sm text-muted-foreground flex-1">{threat.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Domain Information */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="w-5 h-5" />
                Domain Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="font-medium">Domain:</span>
                  <code className="bg-muted px-2 py-1 rounded text-sm">{analysis.domain}</code>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="font-medium">Registrar:</span>
                  <span className="text-sm">{analysis.domainInfo.registrar}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="font-medium">Created:</span>
                  <span className="text-sm">{analysis.domainInfo.created}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="font-medium">Country:</span>
                  <span className="text-sm">{analysis.domainInfo.country}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="font-medium">SSL Certificate:</span>
                  <div className="flex items-center gap-2">
                    {analysis.domainInfo.ssl ? (
                      <>
                        <Lock className="w-4 h-4 text-success" />
                        <span className="text-sm text-success">Valid</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-destructive" />
                        <span className="text-sm text-destructive">Missing</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Potential Consequences
                </h4>
                <ul className="space-y-2">
                  {analysis.consequences.map((consequence, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-destructive rounded-full" />
                      {consequence}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default URLAnalyzer;