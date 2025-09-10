import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Rocket, 
  Globe, 
  CheckCircle, 
  ExternalLink, 
  Copy,
  Server,
  Shield,
  Zap,
  Settings,
  Monitor,
  Cloud
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DeploymentGuide = () => {
  const [activeStep, setActiveStep] = useState(1);
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  const deploymentSteps = [
    {
      id: 1,
      title: "Publish on Lovable",
      description: "Deploy your website instantly",
      icon: <Rocket className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Quick Deployment Steps:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Click the <Badge variant="outline">"Publish"</Badge> button in the top-right corner</li>
              <li>Your site will be deployed to: <code className="bg-muted px-2 py-1 rounded">yourproject.lovable.app</code></li>
              <li>Deployment usually takes 1-2 minutes</li>
              <li>You'll receive a live URL automatically</li>
            </ol>
          </div>
          <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20">
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="text-sm font-medium">FREE hosting with SSL certificate included!</span>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Custom Domain Setup",
      description: "Connect your own domain",
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Connect Custom Domain:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to Project Settings → <Badge variant="outline">Domains</Badge></li>
              <li>Click <Badge variant="outline">"Connect Domain"</Badge></li>
              <li>Enter your domain: <code className="bg-muted px-2 py-1 rounded">fraudlinkdetection.com</code></li>
              <li>Add DNS records at your registrar:
                <div className="mt-2 p-2 bg-muted rounded text-xs">
                  <div>Type: A</div>
                  <div>Name: @</div>
                  <div>Value: 185.158.133.1</div>
                </div>
              </li>
              <li>Wait 24-48 hours for DNS propagation</li>
            </ol>
          </div>
          <div className="text-xs text-muted-foreground">
            💡 SSL certificate will be automatically provisioned for your custom domain
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Free Domain Options",
      description: "Get a domain without cost",
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Free Domain Providers:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: "Freenom", url: "freenom.com", tlds: ".tk, .ml, .ga, .cf", note: "Basic free domains" },
              { name: "GitHub Pages", url: "pages.github.com", tlds: ".github.io", note: "For GitHub users" },
              { name: "InfinityFree", url: "infinityfree.net", tlds: "subdomain.epizy.com", note: "Free hosting + subdomain" },
              { name: "Netlify", url: "netlify.com", tlds: ".netlify.app", note: "Professional deployment" }
            ].map((provider, index) => (
              <Card key={index} className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{provider.name}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`https://${provider.url}`, '_blank')}
                      className="h-6 px-2"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">{provider.tlds}</div>
                  <div className="text-xs">{provider.note}</div>
                </div>
              </Card>
            ))}
          </div>
          <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
            <div className="text-sm font-medium text-warning">⚠️ Recommendation:</div>
            <div className="text-xs text-muted-foreground mt-1">
              For professional security analysis website, consider purchasing a premium domain (.com, .net, .org) for better credibility and SEO.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Performance Optimization",
      description: "Enhance speed and security",
      icon: <Zap className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Optimization Checklist:</h4>
          <div className="space-y-3">
            {[
              { task: "Enable Cloudflare CDN", benefit: "Global fast loading", status: "recommended" },
              { task: "Compress images", benefit: "Faster page loads", status: "automatic" },
              { task: "Enable GZIP compression", benefit: "Smaller file sizes", status: "enabled" },
              { task: "Set up monitoring", benefit: "Track uptime & performance", status: "optional" },
              { task: "Configure security headers", benefit: "Enhanced protection", status: "automatic" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-secondary/20 rounded">
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.task}</div>
                  <div className="text-xs text-muted-foreground">{item.benefit}</div>
                </div>
                <Badge 
                  variant={item.status === 'enabled' ? 'success' : item.status === 'automatic' ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Production Checklist",
      description: "Final steps before going live",
      icon: <Settings className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">Pre-Launch Checklist:</h4>
          <div className="space-y-3">
            {[
              "✅ Test all URLs with the analyzer",
              "✅ Verify threat detection accuracy",
              "✅ Check mobile responsiveness", 
              "✅ Test feedback and query forms",
              "✅ Validate contact information",
              "✅ Set up analytics tracking",
              "✅ Configure error monitoring",
              "✅ Test SSL certificate",
              "✅ Verify SEO meta tags",
              "✅ Check page loading speeds"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-secondary/20 rounded">
                <div className="text-sm">{item}</div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-success/10 rounded-lg border border-success/20">
            <div className="text-sm font-medium text-success">🎉 Ready for Production!</div>
            <div className="text-xs text-muted-foreground mt-1">
              Your fraud link detection website is ready to help users stay safe online.
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-br from-card to-primary/5">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-primary text-white">
              <Cloud className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Website Deployment Guide
          </CardTitle>
          <CardDescription className="text-lg">
            Step-by-step instructions to deploy your Fraud Link Detection website to production
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              <span>Live Preview Ready</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>Production Ready</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>SSL Secured</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Navigation */}
      <div className="flex flex-wrap justify-center gap-2">
        {deploymentSteps.map((step) => (
          <Button
            key={step.id}
            variant={activeStep === step.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveStep(step.id)}
            className="flex items-center gap-2"
          >
            {step.icon}
            <span className="hidden sm:inline">Step {step.id}</span>
          </Button>
        ))}
      </div>

      {/* Active Step Content */}
      {deploymentSteps
        .filter(step => step.id === activeStep)
        .map((step) => (
          <Card key={step.id} className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                {step.icon}
                {step.title}
              </CardTitle>
              <CardDescription className="text-base">
                {step.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step.content}
            </CardContent>
          </Card>
        ))}

      {/* Quick Actions */}
      <Card className="border-0 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="text-center">Quick Deployment Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col gap-2"
              onClick={() => window.open('https://docs.lovable.dev/', '_blank')}
            >
              <ExternalLink className="w-6 h-6" />
              <span className="font-semibold">Lovable Docs</span>
              <span className="text-xs text-muted-foreground">Complete deployment documentation</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col gap-2"
              onClick={() => copyToClipboard('fraudlinkdetection.com')}
            >
              <Copy className="w-6 h-6" />
              <span className="font-semibold">Copy Domain</span>
              <span className="text-xs text-muted-foreground">fraudlinkdetection.com</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col gap-2"
              onClick={() => copyToClipboard('185.158.133.1')}
            >
              <Server className="w-6 h-6" />
              <span className="font-semibold">Copy IP</span>
              <span className="text-xs text-muted-foreground">185.158.133.1</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Final Note */}
      <div className="text-center space-y-4">
        <div className="p-6 bg-gradient-to-r from-success/10 to-primary/10 rounded-lg border border-success/20">
          <h3 className="text-lg font-semibold mb-2">🎯 Your Website Will Be Live At:</h3>
          <div className="space-y-2">
            <code className="bg-muted px-4 py-2 rounded-lg text-lg font-mono">
              https://fraudlinkdetection.com
            </code>
            <div className="text-sm text-muted-foreground">
              Professional fraud link detection service for global users
            </div>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          💡 <strong>Pro Tip:</strong> After deployment, test your website thoroughly with the provided test URLs to ensure accuracy.
        </div>
      </div>
    </div>
  );
};

export default DeploymentGuide;