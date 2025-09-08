import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Eye, Globe, Lock, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-security.jpg';
import LearnMoreModal from './LearnMoreModal';

const Hero = () => {
  const [showLearnMore, setShowLearnMore] = useState(false);
  
  const scrollToAnalyzer = () => {
    const analyzer = document.getElementById('url-analyzer');
    analyzer?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Cybersecurity Protection" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-secure rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            <Shield className="w-4 h-4 mr-2" />
            Advanced Threat Detection Technology
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Fraud Link
            </span>
            <br />
            <span className="text-foreground">Detection</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Protect yourself from malicious URLs, phishing attacks, and cyber threats. 
            Analyze any link instantly with our advanced AI-powered security scanner.
          </p>

          {/* Feature List */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Instant Analysis</h3>
                <p className="text-sm text-muted-foreground">Real-time threat detection</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <div className="p-2 bg-gradient-secure rounded-lg">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Deep Inspection</h3>
                <p className="text-sm text-muted-foreground">Comprehensive security scan</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
              <div className="p-2 bg-gradient-warning rounded-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Domain Analysis</h3>
                <p className="text-sm text-muted-foreground">Complete domain investigation</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToAnalyzer}
              className="px-8 py-4 text-lg font-semibold"
            >
              <Shield className="w-5 h-5 mr-2" />
              Start Security Scan
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowLearnMore(true)}
              className="px-8 py-4 text-lg border-2 hover:border-primary"
            >
              <Lock className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 pt-8 opacity-70">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-success" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-success" />
              <span>Real-time Protection</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-success" />
              <span>Free to Use</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full p-1">
            <div className="w-1 h-3 bg-primary/50 rounded-full mx-auto animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* Learn More Modal */}
      <LearnMoreModal 
        isOpen={showLearnMore} 
        onClose={() => setShowLearnMore(false)} 
      />
    </section>
  );
};

export default Hero;