import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Brain, 
  Zap, 
  Globe, 
  AlertTriangle, 
  CheckCircle,
  Lock,
  Eye,
  Database,
  Users,
  Target,
  Heart
} from 'lucide-react';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearnMoreModal = ({ isOpen, onClose }: LearnMoreModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-3xl">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            About Fraud Link Detection
          </DialogTitle>
          <DialogDescription className="text-lg">
            Your comprehensive cybersecurity companion powered by advanced AI
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Mission Statement */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-primary" />
                Why We Created This Platform
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In today's digital landscape, cybersecurity threats are evolving at an unprecedented pace. 
                Every day, millions of people fall victim to phishing attacks, malware, and fraudulent websites. 
                We created this platform to democratize cybersecurity protection, making advanced threat 
                detection accessible to everyone, regardless of their technical expertise.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to create a safer digital world where individuals and businesses can 
                navigate the internet with confidence, knowing they have a powerful ally protecting 
                them from cyber threats.
              </p>
            </CardContent>
          </Card>

          {/* What We Offer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                What Our Platform Offers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Instant Threat Analysis</h4>
                      <p className="text-sm text-muted-foreground">Real-time scanning of URLs, files, and digital content</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">AI-Powered Detection</h4>
                      <p className="text-sm text-muted-foreground">Advanced machine learning algorithms for threat identification</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Multi-Format Support</h4>
                      <p className="text-sm text-muted-foreground">Analysis of URLs, images, documents, videos, and more</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Comprehensive Reports</h4>
                      <p className="text-sm text-muted-foreground">Detailed security assessments with actionable insights</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Deep Inspection</h4>
                      <p className="text-sm text-muted-foreground">Multi-layer analysis of digital content and domains</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">User-Friendly Interface</h4>
                      <p className="text-sm text-muted-foreground">Intuitive design for users of all technical levels</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-primary" />
                Advanced Security Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    icon: <AlertTriangle className="w-5 h-5" />,
                    title: "Threat Detection",
                    desc: "Identify phishing, malware, and suspicious activities"
                  },
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: "Risk Assessment",
                    desc: "Quantified risk scores with detailed explanations"
                  },
                  {
                    icon: <Database className="w-5 h-5" />,
                    title: "Domain Analysis",
                    desc: "Complete domain reputation and history checks"
                  },
                  {
                    icon: <Brain className="w-5 h-5" />,
                    title: "AI Pattern Recognition",
                    desc: "Machine learning-based threat pattern detection"
                  },
                  {
                    icon: <Zap className="w-5 h-5" />,
                    title: "Real-time Updates",
                    desc: "Continuous threat intelligence feed integration"
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    title: "Verification System",
                    desc: "Multi-source verification for maximum accuracy"
                  }
                ].map((feature, index) => (
                  <div key={index} className="p-4 bg-secondary/30 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary w-fit mb-3">
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Supported File Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-primary" />
                Supported Content Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Web Content</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>URLs and hyperlinks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Website domains and subdomains</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Email links and attachments</span>
                    </li>
                  </ul>
                  
                  <h4 className="font-semibold mb-3 mt-6">Multimedia Files</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Images (JPG, PNG, GIF, SVG)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Videos (MP4, AVI, streaming)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Audio files and podcasts</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Document Formats</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>PDF documents</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Microsoft Office files</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Compressed archives</span>
                    </li>
                  </ul>
                  
                  <h4 className="font-semibold mb-3 mt-6">Advanced Analysis</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Encrypted file detection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Steganography analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Social media content</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Threat Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                Detected Threat Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Phishing Attacks",
                  "Malware Distribution", 
                  "Identity Theft",
                  "Financial Fraud",
                  "Data Harvesting",
                  "Social Engineering",
                  "Ransomware",
                  "Credential Stealing",
                  "Scam Websites",
                  "Fake Downloads",
                  "Suspicious Redirects",
                  "Zero-day Exploits"
                ].map((threat, index) => (
                  <Badge key={index} variant="destructive" className="p-2 justify-center">
                    {threat}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Technology */}
          <Card className="bg-gradient-to-r from-accent/5 to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-primary" />
                Artificial Intelligence Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Our platform leverages cutting-edge artificial intelligence and machine learning 
                  technologies to provide superior threat detection capabilities:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="font-medium">Neural Network Analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="font-medium">Behavioral Pattern Recognition</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="font-medium">Predictive Threat Modeling</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="font-medium">Continuous Learning Algorithms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="font-medium">Real-time Threat Intelligence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="font-medium">Adaptive Security Measures</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LearnMoreModal;