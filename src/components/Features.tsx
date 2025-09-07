import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Scan, 
  AlertTriangle, 
  Database, 
  Lock, 
  Zap,
  Eye,
  Globe,
  FileText,
  Image,
  Video,
  Link
} from 'lucide-react';
import FeatureModal from './FeatureModal';
import ThreatModal from './ThreatModal';

const Features = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);
  
  const mainFeatures = [
    {
      icon: <Scan className="w-8 h-8" />,
      title: "Multi-Format Analysis",
      description: "Analyze URLs, images, documents, videos, and any digital content for potential threats",
      color: "bg-gradient-primary",
      key: "multi-format-analysis"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Real-time Threat Detection", 
      description: "Instant identification of phishing, malware, scams, and other cyber threats",
      color: "bg-gradient-warning",
      key: "real-time-threat-detection"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Comprehensive Domain Analysis",
      description: "Deep inspection of domain reputation, registration details, and security certificates",
      color: "bg-gradient-secure",
      key: "comprehensive-domain-analysis"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Risk Assessment Scoring",
      description: "Advanced algorithms provide detailed risk scores and actionable security recommendations",
      color: "bg-gradient-primary",
      key: "risk-assessment-scoring"
    }
  ];

  const supportedFormats = [
    { icon: <Link className="w-6 h-6" />, name: "URLs & Links", desc: "Web addresses and hyperlinks", route: "urls" },
    { icon: <Image className="w-6 h-6" />, name: "Images", desc: "JPG, PNG, GIF files", route: "images" },
    { icon: <FileText className="w-6 h-6" />, name: "Documents", desc: "PDF, DOC, XLS files", route: "documents" },
    { icon: <Video className="w-6 h-6" />, name: "Videos", desc: "MP4, AVI, streaming links", route: "videos" },
    { icon: <Globe className="w-6 h-6" />, name: "Web Content", desc: "HTML, CSS, JS files", route: "web-content" },
    { icon: <Lock className="w-6 h-6" />, name: "Encrypted Files", desc: "Password protected content", route: "encrypted" }
  ];

  const threatTypes = [
    "Phishing Attacks",
    "Malware Distribution", 
    "Identity Theft",
    "Financial Fraud",
    "Data Harvesting",
    "Social Engineering",
    "Ransomware",
    "Credential Stealing"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Advanced Security Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive <span className="bg-gradient-primary bg-clip-text text-transparent">Threat Protection</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our advanced AI-powered platform provides multi-layered security analysis to protect you from evolving cyber threats
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="shadow-card border-0 hover:shadow-glow transition-all duration-500 group cursor-pointer"
              onClick={() => setSelectedFeature(feature.key)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{feature.description}</p>
                <div className="text-center mt-4">
                  <Badge variant="outline" className="text-xs">Click to learn more</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supported Formats */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Eye className="w-6 h-6 text-primary" />
                Supported File Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {supportedFormats.map((format, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/analyze/${format.route}`)}
                  >
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {format.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{format.name}</h4>
                      <p className="text-xs text-muted-foreground">{format.desc}</p>
                      <Badge variant="outline" className="text-xs mt-1">Click to analyze</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                Detected Threat Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {threatTypes.map((threat, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg cursor-pointer hover:bg-destructive/10 transition-colors"
                    onClick={() => setSelectedThreat(threat)}
                  >
                    <div className="w-2 h-2 bg-destructive rounded-full" />
                    <span className="font-medium">{threat}</span>
                    <Badge variant="outline" className="text-xs ml-auto">Learn more</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Process */}
        <Card className="shadow-card border-0 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-4">How Our Security Analysis Works</CardTitle>
            <p className="text-muted-foreground text-lg">Advanced multi-stage threat detection process</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "URL Submission", desc: "Submit any URL or upload files for analysis" },
                { step: "02", title: "Deep Scanning", desc: "AI algorithms scan for malicious patterns and signatures" },
                { step: "03", title: "Threat Analysis", desc: "Comprehensive evaluation of security risks and vulnerabilities" },
                { step: "04", title: "Report Generation", desc: "Detailed security report with actionable recommendations" }
              ].map((process, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary text-white rounded-full flex items-center justify-center mx-auto font-bold text-lg">
                    {process.step}
                  </div>
                  <h3 className="font-bold text-lg">{process.title}</h3>
                  <p className="text-muted-foreground">{process.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Modals */}
      <FeatureModal 
        isOpen={!!selectedFeature} 
        onClose={() => setSelectedFeature(null)} 
        feature={selectedFeature || ''} 
      />
      <ThreatModal 
        isOpen={!!selectedThreat} 
        onClose={() => setSelectedThreat(null)} 
        threatType={selectedThreat || ''} 
      />
    </section>
  );
};

export default Features;