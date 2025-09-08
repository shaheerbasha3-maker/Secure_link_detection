import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Globe, 
  Phone,
  Clock,
  Star,
  Send,
  Heart,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

const Footer = () => {
  const [feedback, setFeedback] = useState('');
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) {
      toast({
        title: "Please enter your feedback",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Feedback submitted successfully!",
      description: "Thank you for helping us improve our platform.",
    });
    setFeedback('');
    setEmail('');
  };

  const handleQuerySubmit = () => {
    if (!query.trim()) {
      toast({
        title: "Please enter your query",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Query submitted successfully!",
      description: "Our support team will get back to you within 24 hours.",
    });
    setQuery('');
  };

  return (
    <footer className="bg-gradient-to-b from-secondary/10 to-background border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        {/* Feedback & Query Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Feedback Box */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                Share Your Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Your email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="mb-3"
                />
                <Textarea
                  placeholder="Tell us about your experience with our fraud detection platform..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
              <Button 
                onClick={handleFeedbackSubmit}
                className="w-full"
                variant="default"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Feedback
              </Button>
            </CardContent>
          </Card>

          {/* Query Box */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-accent" />
                </div>
                Have a Question?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Textarea
                  placeholder="Ask us anything about cybersecurity, threat detection, or how to use our platform..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
              <Button 
                onClick={handleQuerySubmit}
                className="w-full"
                variant="secondary"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Submit Query
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                Fraud Link Detection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your trusted cybersecurity partner, protecting millions of users 
                worldwide from digital threats with advanced AI-powered detection.
              </p>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" className="p-2">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Location & Contact */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">India</p>
                  <p className="text-muted-foreground">Andhra Pradesh, Madanapalle</p>
                  <p className="text-muted-foreground">Security Operations Center</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Globe className="w-4 h-4 mt-1 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">Website</p>
                  <p className="text-muted-foreground">fraudlinkdetection.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">Email Support</p>
                  <p className="text-muted-foreground">fraudlinkdetection29@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">24/7 Support</p>
                  <p className="text-muted-foreground">+91 9963368930</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operating Hours & Stats */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                Service Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Platform Status</span>
                  <Badge variant="success" className="text-xs">
                    ● Online
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Response Time</span>
                  <Badge variant="secondary" className="text-xs">
                    &lt; 2ms
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Threats Blocked</span>
                  <Badge variant="outline" className="text-xs">
                    2.5M+ Today
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Uptime</span>
                  <Badge variant="success" className="text-xs">
                    99.9%
                  </Badge>
                </div>
              </div>

              <Separator />
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">Operating 24/7</p>
                <p className="text-xs text-muted-foreground">
                  Continuous monitoring & instant threat detection
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2024 Fraud Link Detection. Made with</span>
              <Heart className="w-4 h-4 text-destructive fill-current" />
              <span>for global cybersecurity.</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Security
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;