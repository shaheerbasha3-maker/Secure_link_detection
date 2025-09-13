import React from 'react';
import { Button } from '@/components/ui/button';
import { User, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import URLAnalyzer from '@/components/URLAnalyzer';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="absolute top-4 right-4 z-30 flex gap-2">
        <Button variant="outline" asChild>
          <Link to="/login">
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Link>
        </Button>
      </nav>

      <Hero />
      <div id="url-analyzer">
        <URLAnalyzer />
      </div>
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
