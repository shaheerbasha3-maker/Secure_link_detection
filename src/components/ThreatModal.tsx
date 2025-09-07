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
import { AlertTriangle, Shield, Eye, Lock } from 'lucide-react';

interface ThreatModalProps {
  isOpen: boolean;
  onClose: () => void;
  threatType: string;
}

const ThreatModal = ({ isOpen, onClose, threatType }: ThreatModalProps) => {
  const getThreatContent = (threat: string) => {
    switch (threat) {
      case 'Phishing Attacks':
        return {
          title: 'Phishing Attacks',
          description: 'Deceptive attempts to steal sensitive information',
          severity: 'Critical',
          tactics: [
            'Fake login pages that mimic legitimate websites',
            'Email spoofing to appear from trusted sources',
            'Social engineering to create urgency or fear',
            'URL manipulation with similar-looking domains'
          ],
          consequences: [
            'Identity theft and account compromise',
            'Financial loss through unauthorized transactions',
            'Data breach of personal and business information',
            'Reputation damage and privacy violations'
          ],
          protection: [
            'Always verify URLs before entering credentials',
            'Use two-factor authentication on all accounts',
            'Check email sender authenticity carefully',
            'Use password managers with phishing protection'
          ]
        };
      case 'Malware Distribution':
        return {
          title: 'Malware Distribution',
          description: 'Malicious software designed to damage or infiltrate systems',
          severity: 'Critical',
          tactics: [
            'Drive-by downloads from compromised websites',
            'Infected email attachments and links',
            'Malicious software bundling',
            'Exploiting software vulnerabilities'
          ],
          consequences: [
            'System corruption and data loss',
            'Unauthorized access to sensitive files',
            'Performance degradation and system instability',
            'Potential for system-wide network compromise'
          ],
          protection: [
            'Keep operating system and software updated',
            'Use reputable antivirus software',
            'Avoid downloading from untrusted sources',
            'Enable automatic security updates'
          ]
        };
      case 'Identity Theft':
        return {
          title: 'Identity Theft',
          description: 'Unauthorized use of personal information for fraudulent purposes',
          severity: 'High',
          tactics: [
            'Data harvesting from unsecured websites',
            'Social media profiling and information gathering',
            'Credential stuffing attacks',
            'Public Wi-Fi network interception'
          ],
          consequences: [
            'Financial accounts being compromised',
            'Credit score damage and fraudulent loans',
            'Legal complications from impersonation',
            'Long-term impact on personal reputation'
          ],
          protection: [
            'Limit personal information sharing online',
            'Monitor credit reports regularly',
            'Use strong, unique passwords for each account',
            'Be cautious with public Wi-Fi networks'
          ]
        };
      case 'Financial Fraud':
        return {
          title: 'Financial Fraud',
          description: 'Deceptive practices to obtain money or financial information illegally',
          severity: 'Critical',
          tactics: [
            'Fake investment opportunities and Ponzi schemes',
            'Credit card skimming and cloning',
            'Fake banking websites and apps',
            'Romance scams and advance fee fraud'
          ],
          consequences: [
            'Direct financial loss and unauthorized charges',
            'Credit card and banking account compromise',
            'Investment loss and retirement fund theft',
            'Long-term financial recovery challenges'
          ],
          protection: [
            'Verify investment opportunities independently',
            'Use secure payment methods online',
            'Monitor bank and credit card statements',
            'Be skeptical of unsolicited financial offers'
          ]
        };
      case 'Data Harvesting':
        return {
          title: 'Data Harvesting',
          description: 'Unauthorized collection of personal and sensitive information',
          severity: 'Medium',
          tactics: [
            'Web scraping and automated data collection',
            'Cookie tracking and behavioral profiling',
            'Form submission interception',
            'Browser fingerprinting techniques'
          ],
          consequences: [
            'Privacy violations and personal profiling',
            'Targeted advertising and manipulation',
            'Data sale to third parties',
            'Potential for future identity theft'
          ],
          protection: [
            'Use privacy-focused browsers and extensions',
            'Regularly clear cookies and browsing data',
            'Read privacy policies carefully',
            'Limit information shared on social media'
          ]
        };
      case 'Social Engineering':
        return {
          title: 'Social Engineering',
          description: 'Psychological manipulation to trick users into divulging information',
          severity: 'High',
          tactics: [
            'Pretexting to create false scenarios',
            'Authority impersonation and urgency creation',
            'Baiting with attractive offers',
            'Tailgating and physical security breaches'
          ],
          consequences: [
            'Unauthorized access to secure systems',
            'Confidential information disclosure',
            'Financial and data security breaches',
            'Organizational security policy violations'
          ],
          protection: [
            'Verify identity before sharing information',
            'Follow established security protocols',
            'Be skeptical of unsolicited requests',
            'Train team members on social engineering tactics'
          ]
        };
      case 'Ransomware':
        return {
          title: 'Ransomware',
          description: 'Malicious software that encrypts files and demands payment',
          severity: 'Critical',
          tactics: [
            'Email attachment exploitation',
            'Remote desktop protocol attacks',
            'Software vulnerability exploitation',
            'Watering hole attacks on trusted sites'
          ],
          consequences: [
            'Complete loss of access to files and systems',
            'Business operations disruption',
            'Financial extortion and payment demands',
            'Potential permanent data loss'
          ],
          protection: [
            'Maintain regular offline backups',
            'Keep software and systems updated',
            'Use endpoint detection and response tools',
            'Train users on email security best practices'
          ]
        };
      case 'Credential Stealing':
        return {
          title: 'Credential Stealing',
          description: 'Unauthorized acquisition of usernames, passwords, and access tokens',
          severity: 'High',
          tactics: [
            'Keylogger installation and monitoring',
            'Man-in-the-middle attacks',
            'Credential stuffing with leaked databases',
            'Session hijacking and token theft'
          ],
          consequences: [
            'Account takeover and unauthorized access',
            'Identity impersonation and fraud',
            'Lateral movement within networks',
            'Privilege escalation and system compromise'
          ],
          protection: [
            'Use multi-factor authentication',
            'Implement password managers',
            'Monitor for unusual account activity',
            'Use encrypted connections (HTTPS/VPN)'
          ]
        };
      default:
        return {
          title: 'Security Threat',
          description: 'Potential security risk requiring attention',
          severity: 'Medium',
          tactics: ['Various attack methods'],
          consequences: ['Potential security compromise'],
          protection: ['Follow security best practices']
        };
    }
  };

  const content = getThreatContent(threatType);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-destructive text-destructive-foreground';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <AlertTriangle className="w-6 h-6 text-destructive" />
            {content.title}
            <Badge className={getSeverityColor(content.severity)}>
              {content.severity} Risk
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-lg">
            {content.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Eye className="w-5 h-5 text-destructive" />
                Attack Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.tactics.map((tactic, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2" />
                    <span className="text-sm text-muted-foreground">{tactic}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Potential Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.consequences.map((consequence, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <span className="text-sm text-muted-foreground">{consequence}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-primary" />
                Protection Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.protection.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThreatModal;