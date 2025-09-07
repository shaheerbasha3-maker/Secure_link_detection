import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Shield, Zap } from 'lucide-react';

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

const FeatureModal = ({ isOpen, onClose, feature }: FeatureModalProps) => {
  const getFeatureContent = (featureName: string) => {
    switch (featureName) {
      case 'instant-analysis':
        return {
          title: 'Instant Analysis',
          icon: <Zap className="w-6 h-6" />,
          description: 'Lightning-fast security scanning in real-time',
          details: [
            'Analyzes URLs within milliseconds of submission',
            'Real-time threat detection using advanced AI algorithms',
            'Immediate risk assessment without delays',
            'Quick reputation checks against global threat databases'
          ],
          benefits: [
            'Save time with instant results',
            'Immediate protection from clicking malicious links',
            'Real-time threat intelligence updates'
          ]
        };
      case 'deep-inspection':
        return {
          title: 'Deep Inspection',
          icon: <Shield className="w-6 h-6" />,
          description: 'Comprehensive multi-layer security analysis',
          details: [
            'Examines website content, scripts, and embedded resources',
            'Analyzes SSL certificates and security headers',
            'Checks for hidden redirects and malicious code',
            'Inspects metadata and file structures'
          ],
          benefits: [
            'Uncover sophisticated hidden threats',
            'Detect advanced persistent threats (APTs)',
            'Comprehensive security posture assessment'
          ]
        };
      case 'domain-analysis':
        return {
          title: 'Domain Analysis',
          icon: <AlertTriangle className="w-6 h-6" />,
          description: 'Complete domain reputation and history assessment',
          details: [
            'Domain registration and ownership verification',
            'Historical threat activity analysis',
            'DNS record examination and validation',
            'Subdomain enumeration and risk assessment'
          ],
          benefits: [
            'Identify suspicious domain patterns',
            'Verify website legitimacy',
            'Detect domain squatting and typosquatting'
          ]
        };
      case 'multi-format-analysis':
        return {
          title: 'Multi-Format Analysis',
          icon: <CheckCircle className="w-6 h-6" />,
          description: 'Support for various file types and content formats',
          details: [
            'URL and link analysis with full webpage scanning',
            'Image file threat detection (steganography, embedded malware)',
            'Document analysis (PDFs, Office files, archives)',
            'Video and multimedia content security assessment'
          ],
          benefits: [
            'Comprehensive protection across all content types',
            'Detect hidden threats in multimedia files',
            'Support for enterprise file formats'
          ]
        };
      case 'real-time-threat-detection':
        return {
          title: 'Real-time Threat Detection',
          icon: <AlertTriangle className="w-6 h-6" />,
          description: 'Continuous monitoring and instant threat identification',
          details: [
            'Live threat intelligence feeds integration',
            'Behavioral analysis and anomaly detection',
            'Zero-day threat pattern recognition',
            'Continuous security monitoring and alerts'
          ],
          benefits: [
            'Protection against emerging threats',
            'Proactive security posture',
            'Immediate threat notifications'
          ]
        };
      case 'comprehensive-domain-analysis':
        return {
          title: 'Comprehensive Domain Analysis',
          icon: <Shield className="w-6 h-6" />,
          description: 'In-depth domain security and reputation assessment',
          details: [
            'WHOIS information and registration details',
            'IP geolocation and hosting provider analysis',
            'Domain age and historical reputation scoring',
            'Related domain and subdomain investigation'
          ],
          benefits: [
            'Complete domain legitimacy verification',
            'Historical threat pattern analysis',
            'Comprehensive risk assessment scoring'
          ]
        };
      case 'risk-assessment-scoring':
        return {
          title: 'Risk Assessment Scoring',
          icon: <CheckCircle className="w-6 h-6" />,
          description: 'Advanced algorithms provide detailed risk evaluation',
          details: [
            'Multi-factor risk calculation using 50+ security indicators',
            'Machine learning-based threat probability assessment',
            'Industry-standard security framework compliance',
            'Actionable security recommendations and remediation steps'
          ],
          benefits: [
            'Clear, quantified risk understanding',
            'Prioritized security action items',
            'Compliance with security best practices'
          ]
        };
      default:
        return {
          title: 'Security Feature',
          icon: <Shield className="w-6 h-6" />,
          description: 'Advanced security protection',
          details: ['Comprehensive security analysis'],
          benefits: ['Enhanced protection']
        };
    }
  };

  const content = getFeatureContent(feature);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {content.icon}
            </div>
            {content.title}
          </DialogTitle>
          <DialogDescription className="text-lg">
            {content.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                How It Works
              </h3>
              <ul className="space-y-3">
                {content.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Key Benefits
              </h3>
              <div className="space-y-2">
                {content.benefits.map((benefit, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureModal;