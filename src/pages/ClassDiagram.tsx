import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ClassDiagram = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const diagramRef = useRef<HTMLDivElement>(null);

  const classDiagramCode = `classDiagram
    %% Authentication & User Management
    class User {
        +string userId
        +string email
        +string username
        +string password
        +string fullName
        +string mobileNumber
        +Date createdAt
        +login()
        +logout()
        +signup()
        +updateProfile()
    }

    class AuthProvider {
        +User user
        +Session session
        +boolean loading
        +signIn(email, password)
        +signUp(email, password, fullName, mobile)
        +signOut()
        +getSession()
    }

    %% Core Analysis Components
    class ScanManager {
        +string scanId
        +string target
        +string status
        +Date timestamp
        +runScan()
        +collectResults()
        +cancelScan()
        +getScanHistory()
    }

    class URLAnalyzer {
        +string url
        +boolean isAnalyzing
        +ThreatAnalysis analysis
        +analyzeURL()
        +performAdvancedThreatDetection()
        +createDeterministicHash()
        +checkSSLCertificate()
        +analyzeDomainReputation()
    }

    class FileAnalyzer {
        +File[] uploadedFiles
        +string fileType
        +boolean isAnalyzing
        +number progress
        +any results
        +handleFileUpload()
        +removeFile()
        +simulateAnalysis()
        +validateFile()
    }

    %% Threat Detection Engine
    class ThreatDetectionEngine {
        +number riskScore
        +string threatLevel
        +detectPhishing()
        +detectMalware()
        +detectVulnerabilities()
        +calculateRiskScore()
        +identifyThreatType()
    }

    class VulnerabilityScanner {
        +string[] findings
        +string scanType
        +runVulnScan()
        +checkKnownVulnerabilities()
        +analyzeSecurity()
        +generateFindings()
    }

    class MalwareDetector {
        +string malwareFamily
        +string detectionMethod
        +string[] signatures
        +scanForMalware()
        +identifyMalwareType()
        +extractMalwareSignature()
        +quarantineFile()
    }

    %% Data Management
    class DatasetManager {
        +string datasetPath
        +any[] data
        +loadDataset()
        +filterData()
        +searchRecords()
        +validateData()
    }

    class ThreatIntelligence {
        +Map knownThreats
        +string[] maliciousPatterns
        +string[] safePatterns
        +loadThreatData()
        +checkReputation()
        +updateDatabase()
    }

    %% Analysis & Reporting
    class AIAnalysisEngine {
        +number riskScore
        +string[] predictions
        +analyzeResults()
        +generateInsights()
        +classifyThreat()
        +calculateConfidence()
    }

    class ReportGenerator {
        +string reportId
        +string reportPath
        +string format
        +generateReport()
        +exportToPDF()
        +createSummary()
        +formatFindings()
    }

    class AnalyticsManager {
        +any[] scanHistory
        +Map statistics
        +trackScan()
        +generateStats()
        +getInsights()
        +exportData()
    }

    %% Reconnaissance Module
    class ReconModule {
        +any reconData
        +string[] targets
        +performRecon()
        +gatherInformation()
        +mapNetwork()
        +identifyAssets()
    }

    %% UI Components
    class Dashboard {
        +displayStats()
        +showRecentScans()
        +renderCharts()
    }

    class FeatureCard {
        +string title
        +string description
        +string icon
        +render()
    }

    %% Relationships
    User --> AuthProvider : authenticates through
    AuthProvider --> ScanManager : authorizes
    ScanManager --> URLAnalyzer : manages
    ScanManager --> FileAnalyzer : manages
    ScanManager --> ReconModule : coordinates
    
    URLAnalyzer --> ThreatDetectionEngine : uses
    FileAnalyzer --> ThreatDetectionEngine : uses
    
    ThreatDetectionEngine --> VulnerabilityScanner : includes
    ThreatDetectionEngine --> MalwareDetector : includes
    ThreatDetectionEngine --> ThreatIntelligence : queries
    
    DatasetManager --> ThreatIntelligence : provides data
    FileAnalyzer --> DatasetManager : loads datasets
    URLAnalyzer --> DatasetManager : loads datasets
    
    ThreatDetectionEngine --> AIAnalysisEngine : feeds data
    AIAnalysisEngine --> ReportGenerator : generates
    
    ScanManager --> AnalyticsManager : logs to
    AnalyticsManager --> Dashboard : displays in
    ReportGenerator --> Dashboard : shows reports
    
    Dashboard --> FeatureCard : renders
    User --> Dashboard : accesses`;

  const handleDownload = async () => {
    try {
      // Create a blob with the mermaid code
      const fullDiagram = `# Cybersecurity Threat Detection System - Class Diagram

\`\`\`mermaid
${classDiagramCode}
\`\`\`

## Download Instructions

To render this diagram:
1. Go to https://mermaid.live/
2. Paste the code above
3. Download as PNG or SVG

Alternative: Use the Mermaid CLI or any Mermaid-compatible tool.
`;

      const blob = new Blob([fullDiagram], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'class-diagram.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Download Started",
        description: "Class diagram markdown file downloaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the diagram. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(classDiagramCode);
    toast({
      title: "Copied!",
      description: "Diagram code copied to clipboard. Paste it in mermaid.live to render.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="flex gap-3">
            <Button onClick={handleCopyCode} variant="outline">
              Copy Code
            </Button>
            <Button onClick={handleDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Download Diagram
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">System Class Diagram</CardTitle>
            <p className="text-muted-foreground">
              Comprehensive UML class diagram for the Cybersecurity Threat Detection System
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/30 p-6 rounded-lg border">
              <div ref={diagramRef} className="overflow-auto">
                <pre className="text-sm font-mono whitespace-pre-wrap">
                  <code>{classDiagramCode}</code>
                </pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Diagram Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                    <span>15+ Core classes covering all system components</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                    <span>Authentication & User Management</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                    <span>Threat Detection & Analysis Engines</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                    <span>Data Management & Intelligence</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                    <span>Reporting & Analytics</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How to Render</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="space-y-2">
                    <p className="font-semibold">Option 1: Online</p>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>Visit <a href="https://mermaid.live/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mermaid.live</a></li>
                      <li>Click "Copy Code" button above</li>
                      <li>Paste into the editor</li>
                      <li>Download as PNG or SVG</li>
                    </ol>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">Option 2: VS Code</p>
                    <p className="text-muted-foreground">Install "Markdown Preview Mermaid Support" extension</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">📋</span> Class Descriptions
              </h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <strong>User & Auth:</strong> Authentication, session management, user profiles
                </div>
                <div>
                  <strong>Scan Manager:</strong> Orchestrates all scanning operations
                </div>
                <div>
                  <strong>URL/File Analyzers:</strong> Specialized analysis for different input types
                </div>
                <div>
                  <strong>Threat Detection:</strong> Core malware and vulnerability detection
                </div>
                <div>
                  <strong>AI Engine:</strong> Advanced threat classification and risk scoring
                </div>
                <div>
                  <strong>Report Generator:</strong> Creates detailed security reports
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClassDiagram;
