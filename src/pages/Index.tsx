import React from 'react';
import Hero from '@/components/Hero';
import URLAnalyzer from '@/components/URLAnalyzer';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
