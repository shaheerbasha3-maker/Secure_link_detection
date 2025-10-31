import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Database, FileText, Shield, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Datasets = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [downloading, setDownloading] = useState<string | null>(null);

  if (!user) {
    navigate("/login");
    return null;
  }

  const datasets = [
    {
      id: "malicious-urls",
      title: "Malicious URLs Dataset",
      description: "Collection of 25 malicious URLs with risk scores, threat types, and detection methods",
      filename: "malicious-urls.csv",
      records: 25,
      icon: AlertTriangle,
      color: "text-red-500",
      features: [
        "Risk levels (Medium, High, Critical)",
        "Multiple threat types per URL",
        "Detection method classification",
        "SSL status and country information"
      ]
    },
    {
      id: "phishing-urls",
      title: "Phishing URLs Dataset",
      description: "Comprehensive phishing attack samples targeting major brands and services",
      filename: "phishing-urls.csv",
      records: 25,
      icon: Shield,
      color: "text-orange-500",
      features: [
        "Target brand identification",
        "Attack type classification",
        "Spoofing technique analysis",
        "Creation date tracking"
      ]
    },
    {
      id: "legitimate-urls",
      title: "Legitimate URLs Dataset",
      description: "Trusted and verified legitimate websites for baseline comparison",
      filename: "legitimate-urls.csv",
      records: 25,
      icon: Database,
      color: "text-green-500",
      features: [
        "Domain age verification",
        "SSL certificate validation",
        "Reputation scoring",
        "Category classification"
      ]
    }
  ];

  const handleDownload = async (filename: string) => {
    setDownloading(filename);
    try {
      const response = await fetch(`/datasets/${filename}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Security Datasets
          </h1>
          <p className="text-muted-foreground">
            Download curated datasets for security research and testing
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {datasets.map((dataset) => {
            const Icon = dataset.icon;
            return (
              <Card key={dataset.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-8 w-8 ${dataset.color}`} />
                    <Badge variant="secondary">{dataset.records} records</Badge>
                  </div>
                  <CardTitle className="text-xl">{dataset.title}</CardTitle>
                  <CardDescription>{dataset.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {dataset.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="mr-2">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      onClick={() => handleDownload(dataset.filename)}
                      disabled={downloading === dataset.filename}
                      className="w-full"
                    >
                      {downloading === dataset.filename ? (
                        <>Downloading...</>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download CSV
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Dataset Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Usage Guidelines:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• These datasets are for educational and research purposes only</li>
                <li>• All malicious URLs have been anonymized and are safe to analyze</li>
                <li>• Use these datasets to test and improve threat detection algorithms</li>
                <li>• Perfect for training machine learning models for security applications</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Dataset Format:</h3>
              <p className="text-sm text-muted-foreground">
                All datasets are in CSV (Comma-Separated Values) format with headers.
                Compatible with Excel, Google Sheets, Python pandas, and most data analysis tools.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Algorithms Used:</h3>
              <p className="text-sm text-muted-foreground">
                These datasets were generated using our threat detection algorithms including:
                Typosquatting Detection, Suspicious TLD Analysis, Domain Spoofing Detection,
                and Risk Scoring System.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Datasets;
