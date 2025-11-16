import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Upload, AlertTriangle, Shield, FileText, Image, Video, Link, Globe, Lock, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FileAnalysis = () => {
  const { fileType } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);

  const getFileTypeInfo = (type: string) => {
    switch (type) {
      case 'urls':
        return {
          icon: <Link className="w-8 h-8" />,
          title: 'URL & Link Analysis',
          description: 'Analyze web addresses and hyperlinks for security threats',
          placeholder: 'Paste URLs here...\n\nExample:\nhttps://example.com\nhttps://suspicious-site.fake',
          specificThreats: [
            'Phishing landing pages',
            'Malicious redirects',
            'Drive-by downloads',
            'Credential harvesting forms',
            'Browser exploits'
          ],
          fileExtensions: ['http://', 'https://', 'ftp://']
        };
      case 'images':
        return {
          icon: <Image className="w-8 h-8" />,
          title: 'Image File Analysis',
          description: 'Scan image files for embedded malware and steganography',
          placeholder: 'Paste image URLs or upload image files...\n\nSupported formats: JPG, PNG, GIF, BMP, TIFF',
          specificThreats: [
            'Steganography hiding malware',
            'Embedded malicious scripts',
            'EXIF data exploitation',
            'Image-based phishing',
            'Polyglot files'
          ],
          fileExtensions: ['.jpg', '.png', '.gif', '.bmp', '.tiff']
        };
      case 'documents':
        return {
          icon: <FileText className="w-8 h-8" />,
          title: 'Document Analysis',
          description: 'Examine documents for malicious content and vulnerabilities',
          placeholder: 'Paste document URLs or describe documents...\n\nSupported: PDF, DOC, XLS, PPT, RTF',
          specificThreats: [
            'Macro-based malware',
            'PDF JavaScript exploits',
            'Document metadata leaks',
            'Embedded executable files',
            'Template injection attacks'
          ],
          fileExtensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx']
        };
      case 'videos':
        return {
          icon: <Video className="w-8 h-8" />,
          title: 'Video File Analysis',
          description: 'Analyze video files and streaming links for security issues',
          placeholder: 'Paste video URLs or streaming links...\n\nSupported: MP4, AVI, MOV, streaming URLs',
          specificThreats: [
            'Malicious codec exploits',
            'Streaming service impersonation',
            'Video container vulnerabilities',
            'Subtitle file injection',
            'Fake streaming sites'
          ],
          fileExtensions: ['.mp4', '.avi', '.mov', '.wmv', '.flv']
        };
      case 'web-content':
        return {
          icon: <Globe className="w-8 h-8" />,
          title: 'Web Content Analysis',
          description: 'Analyze HTML, CSS, and JavaScript files for malicious code',
          placeholder: 'Paste web content URLs or code...\n\nSupported: HTML, CSS, JS, JSON, XML',
          specificThreats: [
            'Cross-site scripting (XSS)',
            'Malicious JavaScript injection',
            'CSS-based attacks',
            'HTML form manipulation',
            'Code obfuscation techniques'
          ],
          fileExtensions: ['.html', '.css', '.js', '.json', '.xml']
        };
      case 'encrypted':
        return {
          icon: <Lock className="w-8 h-8" />,
          title: 'Encrypted File Analysis',
          description: 'Analyze password-protected and encrypted content',
          placeholder: 'Paste encrypted file URLs or information...\n\nSupported: Password-protected archives, encrypted documents',
          specificThreats: [
            'Ransomware encryption',
            'Trojan-encrypted payloads',
            'Cryptojacking scripts',
            'Fake encryption software',
            'Key recovery scams'
          ],
          fileExtensions: ['.zip', '.rar', '.7z', '.gpg', '.pgp']
        };
      default:
        return {
          icon: <FileText className="w-8 h-8" />,
          title: 'File Analysis',
          description: 'Analyze files for security threats',
          placeholder: 'Paste content here...',
          specificThreats: ['General security threats'],
          fileExtensions: []
        };
    }
  };

  const fileInfo = getFileTypeInfo(fileType || '');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    
    files.forEach(file => {
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
      const isValidType = fileInfo.fileExtensions.some(ext => 
        ext.startsWith('.') ? fileExt === ext : true
      );
      
      if (isValidType || fileType === 'encrypted' || fileType === 'urls' || fileType === 'web-content') {
        validFiles.push(file);
      } else {
        toast({
          title: 'Invalid file type',
          description: `${file.name} is not a supported file type for ${fileInfo.title}`,
          variant: 'destructive',
        });
      }
    });
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const simulateAnalysis = async () => {
    if (!input.trim() && uploadedFiles.length === 0) {
      toast({
        title: 'No content to analyze',
        description: 'Please upload files or paste content to analyze',
        variant: 'destructive',
      });
      return;
    }
    
    setIsAnalyzing(true);
    setProgress(0);
    setResults(null);

    // Simulate progressive analysis
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Calculate file size from uploaded files
    const totalSize = uploadedFiles.length > 0
      ? uploadedFiles.reduce((acc, file) => acc + file.size, 0)
      : (input.length * 2); // Approximate size for text content

    const sizeInKB = totalSize / 1024;
    const sizeDisplay = sizeInKB > 1024 
      ? `${(sizeInKB / 1024).toFixed(2)} MB`
      : `${sizeInKB.toFixed(2)} KB`;

    // Generate mock results based on file type
    const detectedThreats = fileInfo.specificThreats.slice(0, Math.floor(Math.random() * 3) + 1);
    const mockResults = {
      riskScore: Math.floor(Math.random() * 100),
      threatsDetected: detectedThreats.length,
      fileInfo: {
        type: fileInfo.title,
        size: sizeDisplay,
        format: uploadedFiles.length > 0 ? uploadedFiles[0].name.split('.').pop()?.toUpperCase() : fileInfo.fileExtensions[0] || 'Unknown',
        filesAnalyzed: uploadedFiles.length || 1,
        fileNames: uploadedFiles.length > 0 ? uploadedFiles.map(f => f.name).join(', ') : 'Text Content'
      },
      threats: detectedThreats,
      attackMethods: getAttackMethodology(detectedThreats),
      recommendations: [
        `Avoid interacting with ${fileType} files from untrusted sources`,
        'Use updated antivirus software for additional protection',
        'Verify the source and authenticity before proceeding',
        'Consider using sandboxed environments for analysis'
      ]
    };

    setResults(mockResults);
    setIsAnalyzing(false);
  };

  const getAttackMethodology = (threats: string[]) => {
    const methodologies: { [key: string]: any } = {
      'Phishing landing pages': {
        description: 'Fake websites designed to steal credentials',
        tools: ['Social engineering kits', 'Domain spoofing tools', 'SSL certificate generators'],
        creation: 'Attackers clone legitimate websites and host them on similar domains',
        prevention: 'Verify URLs carefully, check SSL certificates, use 2FA'
      },
      'Malicious redirects': {
        description: 'URLs that redirect users to harmful content',
        tools: ['URL shorteners', 'JavaScript injection', 'HTTP header manipulation'],
        creation: 'Compromised websites or malicious ads redirect traffic through multiple hops',
        prevention: 'Use URL scanners, disable automatic redirects, check destination URLs'
      },
      'Steganography hiding malware': {
        description: 'Malicious code hidden within image pixels',
        tools: ['Steghide', 'OutGuess', 'Custom encoding scripts'],
        creation: 'Malware is embedded in image data using LSB or frequency domain techniques',
        prevention: 'Use steganography detection tools, scan images with multiple engines'
      },
      'Macro-based malware': {
        description: 'Malicious VBA/JavaScript code in documents',
        tools: ['Metasploit', 'Empire framework', 'Custom VBA generators'],
        creation: 'Attackers embed auto-executing macros that download payloads',
        prevention: 'Disable macros by default, use protected view, scan documents'
      },
      'Cross-site scripting (XSS)': {
        description: 'Malicious scripts injected into web pages',
        tools: ['XSS Hunter', 'BeEF framework', 'Custom payload generators'],
        creation: 'Attackers inject JavaScript through vulnerable input fields or URLs',
        prevention: 'Input validation, Content Security Policy, XSS filters'
      },
      'Ransomware encryption': {
        description: 'Files encrypted and held for ransom',
        tools: ['Custom encryption tools', 'Bitcoin payment systems', 'Command & control servers'],
        creation: 'Malware encrypts files using strong encryption and demands payment',
        prevention: 'Regular backups, endpoint protection, network segmentation'
      }
    };

    return threats.map(threat => methodologies[threat] || {
      description: 'Advanced threat with potential system impact',
      tools: ['Unknown attack vectors', 'Custom exploitation tools'],
      creation: 'Sophisticated attack methodology requiring analysis',
      prevention: 'Use comprehensive security solutions and best practices'
    });
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-destructive';
    if (score >= 60) return 'text-orange-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-primary';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Main
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                {fileInfo.icon}
              </div>
              <div>
                <h1 className="text-xl font-bold">{fileInfo.title}</h1>
                <p className="text-sm text-muted-foreground">{fileInfo.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Upload className="w-5 h-5" />
                Submit {fileInfo.title.split(' ')[0]} for Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Upload Section */}
              <div className="space-y-3">
                <label 
                  htmlFor="file-upload" 
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-accent/50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {fileInfo.fileExtensions.join(', ')}
                    </p>
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    accept={fileInfo.fileExtensions.filter(ext => ext.startsWith('.')).join(',') || '*'}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Files ({uploadedFiles.length})</p>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-accent/20 rounded">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <FileText className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm truncate">{file.name}</span>
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                              ({(file.size / 1024).toFixed(2)} KB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="h-6 w-6 p-0 flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Text Input Section */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Or paste content below</p>
                <Textarea
                  placeholder={fileInfo.placeholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[150px] resize-none"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Supported formats:</Badge>
                {fileInfo.fileExtensions.map((ext, index) => (
                  <Badge key={index} variant="outline">{ext}</Badge>
                ))}
              </div>

              <Button 
                onClick={simulateAnalysis}
                disabled={(input.trim() === '' && uploadedFiles.length === 0) || isAnalyzing}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? 'Analyzing...' : `Analyze ${uploadedFiles.length > 0 ? `${uploadedFiles.length} File(s)` : fileInfo.title.split(' ')[0]}`}
              </Button>

              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analysis Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-5 h-5" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!results && !isAnalyzing && (
                <div className="text-center py-12 text-muted-foreground">
                  Submit content above to see detailed security analysis results
                </div>
              )}

              {results && (
                <div className="space-y-6">
                  {/* Risk Score */}
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getRiskColor(results.riskScore)}`}>
                      {results.riskScore}/100
                    </div>
                    <p className="text-muted-foreground">Risk Score</p>
                  </div>

                  {/* File Info */}
                  <Card>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold mb-3">File Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Type:</span>
                          <p className="font-medium">{results.fileInfo.type}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Size:</span>
                          <p className="font-medium">{results.fileInfo.size}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Files Analyzed:</span>
                          <p className="font-medium">{results.fileInfo.filesAnalyzed}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">File Name(s):</span>
                          <p className="font-medium text-xs break-all">{results.fileInfo.fileNames}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Detected Threats */}
                  {results.threats.length > 0 && (
                    <Card>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                          Detected Threats ({results.threats.length})
                        </h3>
                        <div className="space-y-4">
                          {results.threats.map((threat: string, index: number) => (
                            <div key={index} className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-2 h-2 bg-destructive rounded-full" />
                                <span className="font-semibold text-sm">{threat}</span>
                              </div>
                              
                              {results.attackMethods[index] && (
                                <div className="space-y-3 ml-5">
                                  <div>
                                    <h4 className="text-xs font-semibold text-muted-foreground mb-1">ATTACK DESCRIPTION</h4>
                                    <p className="text-xs">{results.attackMethods[index].description}</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-xs font-semibold text-muted-foreground mb-1">TOOLS USED BY ATTACKERS</h4>
                                    <div className="flex flex-wrap gap-1">
                                      {results.attackMethods[index].tools.map((tool: string, toolIndex: number) => (
                                        <Badge key={toolIndex} variant="destructive" className="text-xs">{tool}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-xs font-semibold text-muted-foreground mb-1">HOW IT'S CREATED</h4>
                                    <p className="text-xs">{results.attackMethods[index].creation}</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-xs font-semibold text-muted-foreground mb-1">PROTECTION METHODS</h4>
                                    <p className="text-xs text-primary">{results.attackMethods[index].prevention}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Recommendations */}
                  <Card>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold mb-3">Security Recommendations</h3>
                      <ul className="space-y-2">
                        {results.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                            <span className="text-sm text-muted-foreground">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Specific Threats Information */}
        <Card className="mt-8 shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Common {fileInfo.title.split(' ')[0]} Threats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fileInfo.specificThreats.map((threat, index) => (
                <div key={index} className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-destructive rounded-full" />
                    <h4 className="font-semibold text-sm">{threat}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    High-priority threat commonly found in {fileType} content
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FileAnalysis;