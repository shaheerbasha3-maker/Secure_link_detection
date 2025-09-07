import React from 'react';
import Hero from '@/components/Hero';
import URLAnalyzer from '@/components/URLAnalyzer';
import Features from '@/components/Features';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <div id="url-analyzer">
        <URLAnalyzer />
      </div>
      <Features />
    </div>
  );
};

export default Index;
