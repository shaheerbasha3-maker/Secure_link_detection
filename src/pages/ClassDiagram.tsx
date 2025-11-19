import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ClassDiagram = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const diagramRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('class');

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

  const urlAnalysisSequence = `sequenceDiagram
    participant User
    participant URLAnalyzer
    participant ThreatEngine
    participant Dataset
    participant UI

    User->>URLAnalyzer: Enter URL
    URLAnalyzer->>ThreatEngine: Start analysis
    ThreatEngine->>Dataset: Load malicious URLs
    Dataset-->>ThreatEngine: Return datasets
    ThreatEngine-->>URLAnalyzer: Return results
    URLAnalyzer->>UI: Display analysis
    UI-->>User: Show risk score`;

  const fileScanSequence = `sequenceDiagram
    participant User
    participant FileAnalyzer
    participant MalwareDetector
    participant Dataset
    participant UI

    User->>FileAnalyzer: Upload file
    FileAnalyzer->>MalwareDetector: Start scan
    MalwareDetector->>Dataset: Load signatures
    Dataset-->>MalwareDetector: Return data
    MalwareDetector-->>FileAnalyzer: Scan results
    FileAnalyzer->>UI: Display analysis
    UI-->>User: Show threats`;

  const authSequence = `sequenceDiagram
    participant User
    participant LoginPage
    participant AuthProvider
    participant Supabase
    participant Dashboard

    User->>LoginPage: Enter credentials
    LoginPage->>LoginPage: Validate input
    LoginPage->>AuthProvider: signIn(email, password)
    AuthProvider->>Supabase: Auth request
    
    alt Authentication Success
        Supabase-->>AuthProvider: Return session & user
        AuthProvider->>AuthProvider: Update context
        AuthProvider-->>LoginPage: Success response
        LoginPage->>Dashboard: Navigate to dashboard
        Dashboard-->>User: Show protected content
    else Authentication Failed
        Supabase-->>AuthProvider: Return error
        AuthProvider-->>LoginPage: Error response
        LoginPage->>LoginPage: Display error message
        LoginPage-->>User: Show error alert
    end
    
    Note over User,Dashboard: Protected routes check auth state
    Dashboard->>AuthProvider: Check session
    AuthProvider-->>Dashboard: Return auth status`;

  const handleDownload = async () => {
    try {
      let content = '';
      let filename = '';
      
      switch(activeTab) {
        case 'class':
          content = `# SecureLink Project - Class Diagram\n\n## Mermaid Class Diagram\n\n\`\`\`mermaid\n${classDiagramCode}\n\`\`\`\n\n## How to Use\n\n1. Copy the mermaid code above\n2. Visit https://mermaid.live\n3. Paste the code to visualize the diagram\n4. Export as PNG, SVG, or PDF\n\n## Description\n\nThis class diagram represents the complete architecture of the SecureLink cybersecurity threat detection platform.\n`;
          filename = 'class-diagram.md';
          break;
        case 'url':
          content = `# SecureLink Project - URL Analysis Sequence Diagram\n\n## Mermaid Sequence Diagram\n\n\`\`\`mermaid\n${urlAnalysisSequence}\n\`\`\`\n\n## Description\n\nThis sequence diagram illustrates the URL analysis workflow from user input to threat detection results.\n`;
          filename = 'url-analysis-sequence.md';
          break;
        case 'file':
          content = `# SecureLink Project - File Scanning Sequence Diagram\n\n## Mermaid Sequence Diagram\n\n\`\`\`mermaid\n${fileScanSequence}\n\`\`\`\n\n## Description\n\nThis sequence diagram shows the file scanning process including malware detection and vulnerability analysis.\n`;
          filename = 'file-scan-sequence.md';
          break;
        case 'auth':
          content = `# SecureLink Project - Authentication Sequence Diagram\n\n## Mermaid Sequence Diagram\n\n\`\`\`mermaid\n${authSequence}\n\`\`\`\n\n## Description\n\nThis sequence diagram demonstrates the authentication workflow including login, session management, and error handling.\n`;
          filename = 'auth-sequence.md';
          break;
      }
      
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Download Started",
        description: `${filename} has been downloaded.`,
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
    let code = '';
    switch(activeTab) {
      case 'class':
        code = classDiagramCode;
        break;
      case 'url':
        code = urlAnalysisSequence;
        break;
      case 'file':
        code = fileScanSequence;
        break;
      case 'auth':
        code = authSequence;
        break;
    }
    navigator.clipboard.writeText(code);
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="class">Class Diagram</TabsTrigger>
                <TabsTrigger value="url">URL Analysis</TabsTrigger>
                <TabsTrigger value="file">File Scan</TabsTrigger>
                <TabsTrigger value="auth">Authentication</TabsTrigger>
              </TabsList>

              <TabsContent value="class">
                <div className="bg-muted/30 p-6 rounded-lg border">
                  <div ref={diagramRef} className="overflow-auto">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      <code>{classDiagramCode}</code>
                    </pre>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="url">
                <div className="bg-muted/30 p-6 rounded-lg border">
                  <div ref={diagramRef} className="overflow-auto">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      <code>{urlAnalysisSequence}</code>
                    </pre>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="file">
                <div className="bg-muted/30 p-6 rounded-lg border">
                  <div ref={diagramRef} className="overflow-auto">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      <code>{fileScanSequence}</code>
                    </pre>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="auth">
                <div className="bg-muted/30 p-6 rounded-lg border">
                  <div ref={diagramRef} className="overflow-auto">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      <code>{authSequence}</code>
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

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
