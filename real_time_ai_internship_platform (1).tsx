import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Users,
  FileSpreadsheet,
  Play,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  Video,
  Send,
  Upload,
  Bot,
  User,
  Sparkles,
  FileCode,
  Calendar,
  Mail,
  ChevronRight,
  TrendingUp,
  Award,
  BookOpen,
  ArrowRight,
  Eye,
  XCircle,
  Terminal,
  Cpu,
  LayoutDashboard,
  MessageSquare,
  HelpCircle,
  BarChart2,
  ExternalLink,
  Mic,
  MicOff,
  VideoOff,
  ScreenShare,
  PhoneOff,
  FileText,
  Github,
  Link as LinkIcon,
  Check,
  AlertTriangle,
  History,
  ShieldAlert,
  Sliders,
  Maximize2,
  Minimize2
} from 'lucide-react';

// --- REALISTIC 100 INTERN DEMO DATA GENERATOR ---
const GENERATE_100_INTERNS = () => {
  const departments = [
    { name: 'AI/ML', title: 'XGBoost Credit Risk & Imbalance Model', desc: 'Build an end-to-end default prediction pipeline with SMOTE resampling, Optuna tuning, and SHAP interpretability plots.' },
    { name: 'Software Development', title: 'Microservice API Gateway in FastAPI', desc: 'Design a resilient RESTful API gateway supporting JWT auth, rate limiting with Redis, and Prometheus metrics endpoint.' },
    { name: 'Web Development', title: 'Full-Stack Next.js E-Commerce Dashboard', desc: 'Implement dynamic server-side rendering, Stripe checkout webhooks, and Tailwind CSS responsive dashboard layout.' },
    { name: 'Data Analysis', title: 'Executive Sales & Churn PowerBI Pipeline', desc: 'Clean multi-source CSV customer data, create DAX measure formulas, and build dynamic interactive dashboard visualizations.' },
    { name: 'IoT', title: 'MQTT Telemetry Processing on Raspberry Pi', desc: 'Build a lightweight Python service consuming MQTT sensor feeds with anomaly alert triggers to InfluxDB.' },
    { name: 'UI/UX', title: 'SaaS Platform Design System & Prototype', desc: 'Create a scalable Figma design system with full component tokens, dark mode variants, and interactive micro-animations.' },
    { name: 'Testing', title: 'Automated E2E Cypress & Playwright Test Suite', desc: 'Construct continuous integration smoke and regression automated test suites for authentication and checkout user journeys.' },
    { name: 'Automation', title: 'Python Web Scraping & ETL Workflow', desc: 'Deploy automated BeautifulSoup/Playwright scrapers loading sanitized JSON records into PostgreSQL on a Cron schedule.' }
  ];

  const statuses = ['Task Assigned', 'Review 1 Scheduled', 'Revision Required', 'Internship Completed', 'Unassigned'];
  const firstNames = ['Aarav', 'Sophia', 'Marcus', 'Priya', 'Lucas', 'Elena', 'Ketan', 'David', 'Ananya', 'Carlos', 'Mei', 'Oliver', 'Zainab', 'Viktor', 'Chloe'];
  const lastNames = ['Sharma', 'Chen', 'Vance', 'Patel', 'Dupont', 'Rostova', 'Verma', 'Miller', 'Rao', 'Gomez', 'Wong', 'Taylor', 'Ahmed', 'Nikitin', 'Brown'];

  const list = [];
  for (let i = 1; i <= 100; i++) {
    const deptObj = departments[i % departments.length];
    const status = i <= 10 ? 'Internship Completed' : i <= 35 ? 'Revision Required' : i <= 75 ? 'Review 1 Scheduled' : i <= 90 ? 'Task Assigned' : 'Unassigned';
    const fname = firstNames[i % firstNames.length];
    const lname = lastNames[i % lastNames.length];
    const id = `INT-2026-${1000 + i}`;

    list.push({
      id,
      name: `${fname} ${lname}`,
      email: `${fname.toLowerCase()}.${lname.toLowerCase()}@internship-corp.ai`,
      department: deptObj.name,
      status,
      taskTitle: status === 'Unassigned' ? 'Pending AI Assignment' : deptObj.title,
      taskDesc: status === 'Unassigned' ? 'Awaiting automated HR batch allocation trigger.' : deptObj.desc,
      reviewDate: status === 'Unassigned' ? 'Pending' : `2026-10-${26 + (i % 4)} 14:00`,
      reviewLink: status === 'Unassigned' ? '-' : `https://meet.ai-interns.com/room/${id.toLowerCase()}`,
      attemptCount: status === 'Internship Completed' ? 2 : status === 'Revision Required' ? 2 : status === 'Unassigned' ? 0 : 1,
      completionPercentage: status === 'Internship Completed' ? 100 : status === 'Revision Required' ? 65 : status === 'Review 1 Scheduled' ? 30 : 0,
      submissions: status === 'Unassigned' ? [] : [
        {
          version: 'v1',
          fileName: `${fname}_Task_Submission_v1.zip`,
          fileSize: '4.2 MB',
          date: '2026-10-25 11:30',
          link: 'https://github.com/intern/project-repo',
          status: status === 'Revision Required' ? 'Evaluated - Revision Needed' : status === 'Internship Completed' ? 'Approved' : 'Submitted'
        }
      ],
      aiFeedback: status === 'Revision Required' ? [
        {
          round: 1,
          date: '2026-10-25',
          status: 'PARTIALLY_COMPLETED',
          completionPercentage: 65,
          completedItems: ['Primary business logic implemented', 'File ingestion routine built correctly'],
          missingItems: ['Missing unit test coverage (>80%)', 'Imbalanced class handling missing'],
          mistakes: ['Hardcoded database secret token found in config file'],
          improvements: ['Integrate environment variable loading', 'Add PyTest execution scripts'],
          technicalFeedback: 'The core functionality meets baseline criteria, but security tokens are hardcoded and test coverage is inadequate for production deployment.'
        }
      ] : status === 'Internship Completed' ? [
        {
          round: 2,
          date: '2026-10-26',
          status: 'COMPLETED',
          completionPercentage: 100,
          completedItems: ['All task requirements fully met', 'Unit test suite passed 100%', 'Security credentials properly secured in .env'],
          missingItems: [],
          mistakes: [],
          improvements: ['Consider adding continuous integration workflow badge'],
          technicalFeedback: 'Exceptional submission! All requirements, edge cases, and security benchmarks have been fully satisfied.'
        }
      ] : []
    });
  }
  return list;
};

export default function App() {
  // Main State Management
  const [interns, setInterns] = useState(GENERATE_100_INTERNS);
  const [activeTab, setActiveTab] = useState('intern'); // 'intern' or 'admin'
  const [selectedInternId, setSelectedInternId] = useState('INT-2026-1002');
  const [demoMode, setDemoMode] = useState('DEMO'); // 'DEMO' (fast) or 'PROD' (2-day real)
  const [toastMessage, setToastMessage] = useState(null);

  // Admin Dashboard Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);

  // Modals & Overrides
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [selectedModalIntern, setSelectedModalIntern] = useState(null);
  const [showTimelineModal, setShowTimelineModal] = useState(false);

  // Intern Meeting Simulator State
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [meetingTime, setMeetingTime] = useState(0);

  // Submission Sandbox State
  const [submissionFile, setSubmissionFile] = useState(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // AI Mentor Chatbot State
  const [chatMessages, setChatMessages] = useState([]);
  const [inputChat, setInputChat] = useState('');

  // Selected intern lookup
  const currentIntern = useMemo(() => {
    return interns.find(i => i.id === selectedInternId) || interns[0];
  }, [interns, selectedInternId]);

  // Toast Notification Helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync candidate workspace when active intern changes
  useEffect(() => {
    if (currentIntern) {
      setChatMessages([
        {
          sender: 'ai',
          text: `Hi ${currentIntern.name}! I am your AI Mentor for your assigned task: "${currentIntern.taskTitle}". How can I help you prepare your submission or clarify requirements?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setGithubUrl(currentIntern.submissions[0]?.link || '');
    }
  }, [selectedInternId]);

  // Meeting Timer Loop
  useEffect(() => {
    let interval = null;
    if (isMeetingOpen) {
      interval = setInterval(() => {
        setMeetingTime(prev => prev + 1);
      }, 1000);
    } else {
      setMeetingTime(0);
    }
    return () => clearInterval(interval);
  }, [isMeetingOpen]);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Admin Dashboard Metrics
  const metrics = useMemo(() => {
    return {
      total: interns.length,
      assigned: interns.filter(i => i.status === 'Task Assigned').length,
      scheduled: interns.filter(i => i.status === 'Review 1 Scheduled').length,
      revisions: interns.filter(i => i.status === 'Revision Required').length,
      completed: interns.filter(i => i.status === 'Internship Completed').length,
      unassigned: interns.filter(i => i.status === 'Unassigned').length
    };
  }, [interns]);

  // Filtered Table Records
  const filteredInterns = useMemo(() => {
    return interns.filter(i => {
      const matchSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDept = filterDept === 'All' || i.department === filterDept;
      const matchStatus = filterStatus === 'All' || i.status === filterStatus;
      return matchSearch && matchDept && matchStatus;
    });
  }, [interns, searchTerm, filterDept, filterStatus]);

  // Handler: Batch Automation Engine
  const handleRunBatchAutomation = () => {
    setIsProcessingBatch(true);
    triggerToast('🤖 AI Automation Engine initialized for unassigned candidates...');
    
    setTimeout(() => {
      setInterns(prev => prev.map(item => {
        if (item.status === 'Unassigned') {
          const nextDate = demoMode === 'DEMO' ? 'In 10 Minutes' : '2026-10-28 14:00';
          return {
            ...item,
            status: 'Task Assigned',
            taskTitle: `${item.department} Standard Internship Assessment`,
            taskDesc: `Complete the practical task assignment for ${item.department} and submit your project code and documentation.`,
            reviewDate: nextDate,
            reviewLink: `https://meet.ai-interns.com/room/${item.id.toLowerCase()}`,
            attemptCount: 1,
            completionPercentage: 0
          };
        }
        return item;
      }));
      setIsProcessingBatch(false);
      triggerToast('✨ Successfully allocated tasks & dispatched emails for all pending interns!');
    }, 1200);
  };

  // Handler: Mock File Upload Submission & AI Analysis Execution
  const handleFileUploadAndAnalyze = (e) => {
    e.preventDefault();
    if (!submissionFile && !githubUrl) {
      triggerToast('⚠️ Please choose a submission file or enter a GitHub link!');
      return;
    }

    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      // AI Code Analysis Engine Evaluation Logic
      const newVersionNum = (currentIntern.submissions.length + 1);
      const isPassed = githubUrl.includes('passed') || submissionNotes.toLowerCase().includes('complete') || newVersionNum >= 2;

      const newSubmission = {
        version: `v${newVersionNum}`,
        fileName: submissionFile ? submissionFile.name : `Project_Repo_${newVersionNum}.zip`,
        fileSize: submissionFile ? `${(submissionFile.size / 1024 / 1024).toFixed(1)} MB` : '3.8 MB',
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        link: githubUrl || 'https://github.com/intern/submission',
        status: isPassed ? 'Approved' : 'Evaluated - Revision Needed'
      };

      const newFeedback = isPassed ? {
        round: newVersionNum,
        date: new Date().toISOString().slice(0, 10),
        status: 'COMPLETED',
        completionPercentage: 100,
        completedItems: ['All task requirements & edge cases satisfied', 'Code adheres to clean architecture principles', 'Security credentials isolated in .env'],
        missingItems: [],
        mistakes: [],
        improvements: ['Great job! Continuous integration build verified.'],
        technicalFeedback: 'The submitted work satisfies all functional, security, and code quality criteria.'
      } : {
        round: newVersionNum,
        date: new Date().toISOString().slice(0, 10),
        status: 'PARTIALLY_COMPLETED',
        completionPercentage: 70,
        completedItems: ['Core functionality operational', 'Base documentation present'],
        missingItems: ['Unit test coverage below threshold (<80%)', 'Missing Dockerfile container script'],
        mistakes: ['Exception handling missing in primary database connection string'],
        improvements: ['Wrap DB connection in try-catch block', 'Add Docker containerization script'],
        technicalFeedback: 'Good effort! However, error handling and container deployment scripts require revision prior to final approval.'
      };

      setInterns(prev => prev.map(item => {
        if (item.id === currentIntern.id) {
          return {
            ...item,
            status: isPassed ? 'Internship Completed' : 'Revision Required',
            attemptCount: newVersionNum,
            completionPercentage: isPassed ? 100 : 70,
            reviewDate: isPassed ? 'Completed' : (demoMode === 'DEMO' ? 'In 15 Minutes' : '2026-10-28 16:00'),
            submissions: [newSubmission, ...item.submissions],
            aiFeedback: [newFeedback, ...item.aiFeedback]
          };
        }
        return item;
      }));

      setIsUploading(false);
      setUploadProgress(0);
      setSubmissionFile(null);
      
      triggerToast(isPassed ? '🎉 Task Approved! Internship Status marked as COMPLETED.' : '⚠️ AI Evaluation Complete: Revision Required. Check feedback!');
    }, 1800);
  };

  // Handler: Send Message to AI Mentor
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputChat.trim()) return;

    const userMsg = {
      sender: 'user',
      text: inputChat,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const query = inputChat;
    setInputChat('');

    setTimeout(() => {
      let aiReply = `Regarding your task "${currentIntern.taskTitle}": Ensure your project output contains clear documentation, error handling, and unit test coverage.`;
      if (query.toLowerCase().includes('submit') || query.toLowerCase().includes('file')) {
        aiReply = `You can submit your work via the "Task Submission Workbench" panel on the right. We accept ZIP, PDF, DOCX, Python scripts, or GitHub repository links.`;
      } else if (query.toLowerCase().includes('meeting') || query.toLowerCase().includes('review')) {
        aiReply = `Your next review is scheduled for ${currentIntern.reviewDate}. Click the "Join AI Review Meeting" button at the top to connect to your live video evaluation room!`;
      }

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: aiReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 900);
  };

  // Handler: Manual Override by HR
  const handleApplyOverride = (newStatus) => {
    setInterns(prev => prev.map(item => {
      if (item.id === selectedModalIntern.id) {
        return {
          ...item,
          status: newStatus,
          completionPercentage: newStatus === 'Internship Completed' ? 100 : item.completionPercentage
        };
      }
      return item;
    }));
    setShowOverrideModal(false);
    triggerToast(`HR Manual Override applied: ${selectedModalIntern.id} set to ${newStatus}`);
  };

  // Helper Badge Color Renderer
  const renderStatusBadge = (status) => {
    const map = {
      'Unassigned': 'bg-slate-800 text-slate-300 border-slate-700',
      'Task Assigned': 'bg-blue-950/80 text-blue-400 border-blue-800/60',
      'Review 1 Scheduled': 'bg-purple-950/80 text-purple-400 border-purple-800/60',
      'Revision Required': 'bg-amber-950/80 text-amber-400 border-amber-800/60',
      'Internship Completed': 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60'
    };
    return (
      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border inline-flex items-center gap-1.5 ${map[status] || map['Unassigned']}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${
          status === 'Internship Completed' ? 'bg-emerald-400 animate-pulse' :
          status === 'Revision Required' ? 'bg-amber-400' :
          status === 'Review 1 Scheduled' ? 'bg-purple-400' : 'bg-blue-400'
        }`} />
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Toast Notification Floating Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-indigo-600 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-indigo-400 animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-cyan-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-cyan-950">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              AutoReview AI Platform
            </h1>
            <p className="text-[11px] text-slate-400">Automated Internship Pipeline & Real-Time Review System</p>
          </div>
        </div>

        {/* Global Controls & Mode Switcher */}
        <div className="flex items-center gap-4">
          {/* Demo Mode Accelerated Toggle */}
          <div className="flex items-center bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800 text-xs gap-2">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Delay Mode:</span>
            <button
              onClick={() => {
                const next = demoMode === 'DEMO' ? 'PROD' : 'DEMO';
                setDemoMode(next);
                triggerToast(`Review Delay Mode set to: ${next === 'DEMO' ? 'DEMO (Accelerated Minutes)' : 'PRODUCTION (2 Days)'}`);
              }}
              className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${
                demoMode === 'DEMO' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              }`}
            >
              {demoMode === 'DEMO' ? '⚡ DEMO (Minutes)' : '📅 PROD (2 Days)'}
            </button>
          </div>

          {/* Role Navigator Switch */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('intern')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'intern' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Intern Portal
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'admin' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Admin Dashboard
            </button>
          </div>

          {/* Intern Context Select Dropdown */}
          <div className="hidden lg:flex items-center gap-2 text-xs bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
            <span className="text-slate-400">Intern:</span>
            <select
              value={selectedInternId}
              onChange={(e) => setSelectedInternId(e.target.value)}
              className="bg-transparent text-cyan-400 font-semibold outline-none cursor-pointer"
            >
              {interns.map(i => (
                <option key={i.id} value={i.id} className="bg-slate-900 text-slate-200">
                  {i.id} - {i.name} ({i.department})
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 p-6 max-w-[1700px] w-full mx-auto">
        {activeTab === 'intern' ? (
          /* ============================================================
             INTERN PORTAL VIEW
             ============================================================ */
          <div className="space-y-6">
            
            {/* Top Candidate Banner & Meeting Control Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-950">
                  {currentIntern.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-100">{currentIntern.name}</h2>
                    {renderStatusBadge(currentIntern.status)}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Intern ID: <span className="text-slate-200 font-mono">{currentIntern.id}</span> | 
                    Department: <span className="text-cyan-400 font-semibold">{currentIntern.department}</span>
                  </p>
                </div>
              </div>

              {/* Scheduled Review Card & Join Meeting Button */}
              <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs w-full md:w-auto justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Scheduled AI Review</div>
                  <div className="font-mono text-slate-200 font-bold mt-0.5">{currentIntern.reviewDate}</div>
                </div>

                <button
                  onClick={() => setIsMeetingOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/50 transition-all animate-pulse"
                >
                  <Video className="w-4 h-4" /> Join AI Review Meeting
                </button>
              </div>
            </div>

            {/* Completion Progress Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" /> Overall Task Completion Progress
                </span>
                <span className="font-mono font-bold text-cyan-400 text-sm">{currentIntern.completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${currentIntern.completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Main Interactive Grid: Chatbot + Task Workbench + AI Diagnostic */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT COLUMN: AI Mentor Chatbot (4 Cols) */}
              <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[680px]">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 rounded-t-2xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-200">AI Task Mentor</h3>
                      <p className="text-[10px] text-emerald-400 font-medium">Domain Specialist Active</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                    Real-Time
                  </span>
                </div>

                {/* Messages Box */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] shrink-0 ${
                        msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-cyan-600 text-white'
                      }`}>
                        {msg.sender === 'user' ? 'You' : <Bot className="w-3.5 h-3.5" />}
                      </div>
                      <div className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none'
                      }`}>
                        {msg.text}
                        <span className="text-[9px] text-slate-400 block mt-1 text-right font-mono">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Controls */}
                <form onSubmit={handleSendChat} className="p-3 border-t border-slate-800 bg-slate-950/60 rounded-b-2xl flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask questions about deliverables..."
                    value={inputChat}
                    onChange={(e) => setInputChat(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 text-xs text-slate-200 px-3 py-2 rounded-xl outline-none focus:border-cyan-500"
                  />
                  <button type="submit" className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition-all">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* RIGHT COLUMN: Submission Workbench & Live Diagnostics (8 Cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Task Details Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Assigned Task Requirements</span>
                    <span className="text-xs font-mono text-slate-500">Attempt #{currentIntern.attemptCount}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100">{currentIntern.taskTitle}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{currentIntern.taskDesc}</p>
                </div>

                {/* Submission Sandbox */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <Upload className="w-4 h-4 text-cyan-400" /> Task Submission Workbench
                  </h3>

                  <form onSubmit={handleFileUploadAndAnalyze} className="space-y-4">
                    {/* Drag and Drop File Uploader Zone */}
                    <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 bg-slate-950/60 rounded-2xl p-6 text-center transition-all cursor-pointer relative">
                      <input
                        type="file"
                        onChange={(e) => setSubmissionFile(e.target.files[0])}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <FileCode className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      {submissionFile ? (
                        <div>
                          <p className="text-xs font-bold text-emerald-400">{submissionFile.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{(submissionFile.size / 1024 / 1024).toFixed(2)} MB - Ready for evaluation</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs font-semibold text-slate-300">Drag & drop project zip, PDF, DOCX, or Python code file</p>
                          <p className="text-[10px] text-slate-500 mt-1">Supports: .zip, .pdf, .docx, .xlsx, .ipynb, .py (Max 50MB)</p>
                        </div>
                      )}
                    </div>

                    {/* GitHub Link Input */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">GitHub / Repository Link</label>
                        <div className="relative">
                          <Github className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                          <input
                            type="url"
                            placeholder="https://github.com/username/project"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 pl-9 pr-3 py-2 rounded-xl outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Submission Notes</label>
                        <input
                          type="text"
                          placeholder="Brief description of fixes or implementation..."
                          value={submissionNotes}
                          onChange={(e) => setSubmissionNotes(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 px-3 py-2 rounded-xl outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    {/* Upload Progress Bar */}
                    {isUploading && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>Uploading & Analyzing Task via LLM Diagnostic...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                        </div>
                      </div>
                    )}

                    {/* Submit Action Button */}
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="w-full py-3 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-950 transition-all flex items-center justify-center gap-2"
                    >
                      <Cpu className="w-4 h-4" /> Submit Task Output & Trigger AI Evaluation
                    </button>
                  </form>
                </div>

                {/* AI Review Output & Structured Diagnostic JSON Checklist */}
                {currentIntern.aiFeedback && currentIntern.aiFeedback.length > 0 && (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                        <BarChart2 className="w-4 h-4 text-purple-400" /> Latest AI Diagnostic Feedback Report
                      </h3>
                      <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800">
                        {currentIntern.aiFeedback[0].status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Completed Items Checklist */}
                      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed Requirements
                        </span>
                        <ul className="space-y-1">
                          {currentIntern.aiFeedback[0].completedItems.map((item, i) => (
                            <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Missing Items & Fixes Checklist */}
                      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-[10px] font-bold text-amber-400 uppercase flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Missing / Required Improvements
                        </span>
                        <ul className="space-y-1">
                          {currentIntern.aiFeedback[0].missingItems.length > 0 ? (
                            currentIntern.aiFeedback[0].missingItems.map((item, i) => (
                              <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                {item}
                              </li>
                            ))
                          ) : (
                            <li className="text-xs text-slate-500 italic">No missing items identified.</li>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Detailed Technical Summary Text */}
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Technical Feedback Summary</span>
                      <p className="text-slate-300 leading-relaxed">{currentIntern.aiFeedback[0].technicalFeedback}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================
             ADMIN / HR DASHBOARD VIEW
             ============================================================ */
          <div className="space-y-6">
            
            {/* Top Action Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-indigo-400" /> Executive HR Automation Control Panel
                </h2>
                <p className="text-xs text-slate-400 mt-1">Manage 100 intern assignments, trigger batch AI review cycles, and inspect logs.</p>
              </div>

              <div className="flex items-center gap-3">
                {/* Excel File Import Button */}
                <label className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 cursor-pointer transition-all">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Import Excel / CSV</span>
                  <input type="file" accept=".csv, .xlsx" className="hidden" onChange={() => triggerToast('📊 Mock Excel sheet parsed! 100 records refreshed.')} />
                </label>

                {/* Batch Trigger Button */}
                <button
                  onClick={handleRunBatchAutomation}
                  disabled={isProcessingBatch || metrics.unassigned === 0}
                  className={`flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl shadow-lg transition-all ${
                    metrics.unassigned === 0
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-950/50'
                  }`}
                >
                  <Play className={`w-4 h-4 ${isProcessingBatch ? 'animate-spin' : ''}`} />
                  {isProcessingBatch ? 'Assigning Tasks...' : `Batch Automate (${metrics.unassigned} Unassigned)`}
                </button>
              </div>
            </div>

            {/* Metrics Dashboard Cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <span className="text-xs font-semibold text-slate-400 block">Total Interns</span>
                <span className="text-2xl font-black text-slate-100 mt-2 block">{metrics.total}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <span className="text-xs font-semibold text-slate-400 block">Assigned Tasks</span>
                <span className="text-2xl font-black text-blue-400 mt-2 block">{metrics.assigned}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <span className="text-xs font-semibold text-slate-400 block">Scheduled Reviews</span>
                <span className="text-2xl font-black text-purple-400 mt-2 block">{metrics.scheduled}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <span className="text-xs font-semibold text-slate-400 block">Revisions Needed</span>
                <span className="text-2xl font-black text-amber-400 mt-2 block">{metrics.revisions}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <span className="text-xs font-semibold text-slate-400 block">Completed</span>
                <span className="text-2xl font-black text-emerald-400 mt-2 block">{metrics.completed}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <span className="text-xs font-semibold text-slate-400 block">Unassigned</span>
                <span className="text-2xl font-black text-slate-500 mt-2 block">{metrics.unassigned}</span>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search intern name, email, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 pl-9 pr-3 py-2 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2 text-xs">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-400">Department:</span>
                  <select
                    value={filterDept}
                    onChange={(e) => setFilterDept(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 outline-none"
                  >
                    <option value="All">All Departments</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Analysis">Data Analysis</option>
                    <option value="IoT">IoT</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Testing">Testing</option>
                    <option value="Automation">Automation</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Status:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Unassigned">Unassigned</option>
                    <option value="Task Assigned">Task Assigned</option>
                    <option value="Review 1 Scheduled">Review 1 Scheduled</option>
                    <option value="Revision Required">Revision Required</option>
                    <option value="Internship Completed">Internship Completed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Master Candidate Data Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">Intern Details</th>
                      <th className="py-3.5 px-4">Department</th>
                      <th className="py-3.5 px-4">Assigned Task</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Review Schedule</th>
                      <th className="py-3.5 px-4">Progress</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredInterns.slice(0, 25).map(item => (
                      <tr key={item.id} className="hover:bg-slate-800/40 transition-all">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-100">{item.name}</div>
                          <div className="text-[11px] text-slate-500">{item.email}</div>
                          <div className="text-[9px] font-mono text-cyan-400 mt-0.5">{item.id}</div>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-300">
                          {item.department}
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <div className="truncate font-medium text-slate-200">{item.taskTitle}</div>
                        </td>
                        <td className="py-3 px-4">
                          {renderStatusBadge(item.status)}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                          {item.reviewDate}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                              <div className="bg-cyan-500 h-full" style={{ width: `${item.completionPercentage}%` }} />
                            </div>
                            <span className="font-mono text-[10px] text-slate-400">{item.completionPercentage}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Email Logs Button */}
                            <button
                              onClick={() => {
                                setSelectedModalIntern(item);
                                setShowEmailModal(true);
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                              title="Inspect Outgoing Email Logs"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </button>

                            {/* 13-Step Chronological Timeline Inspector */}
                            <button
                              onClick={() => {
                                setSelectedModalIntern(item);
                                setShowTimelineModal(true);
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-400"
                              title="View 13-Step Workflow Timeline"
                            >
                              <History className="w-3.5 h-3.5" />
                            </button>

                            {/* HR Override Modal Trigger */}
                            <button
                              onClick={() => {
                                setSelectedModalIntern(item);
                                setShowOverrideModal(true);
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400"
                              title="HR Manual Override"
                            >
                              <ShieldAlert className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================
         REAL-TIME WEBRTC VIDEO REVIEW MEETING SIMULATOR OVERLAY
         ============================================================ */}
      {isMeetingOpen && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 space-y-4 shadow-2xl flex flex-col h-[620px]">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-100">AI Task Evaluation Review Session</h3>
                <span className="font-mono text-xs bg-slate-950 text-cyan-400 px-2 py-0.5 rounded border border-slate-800">
                  {formatTime(meetingTime)}
                </span>
              </div>
              <button
                onClick={() => setIsMeetingOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Leave Room
              </button>
            </div>

            {/* Video Feeds Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 relative overflow-hidden">
              
              {/* Feed 1: AI Senior Reviewer */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 relative flex items-center justify-center overflow-hidden">
                <div className="text-center space-y-3 p-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 mx-auto flex items-center justify-center text-white shadow-xl shadow-cyan-950 animate-pulse">
                    <Bot className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">AI Senior Technical Reviewer</h4>
                    <p className="text-[10px] text-emerald-400 mt-0.5">Listening & Evaluating Deliverables...</p>
                  </div>
                </div>
                <span className="absolute bottom-3 left-3 bg-slate-900/80 text-[10px] text-slate-300 px-2 py-1 rounded font-mono">
                  AI Evaluator (Host)
                </span>
              </div>

              {/* Feed 2: Intern Video Feed */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 relative flex items-center justify-center overflow-hidden">
                {isVideoOn ? (
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-indigo-600 mx-auto flex items-center justify-center text-white font-bold text-xl">
                      {currentIntern.name[0]}
                    </div>
                    <span className="text-xs text-slate-300 font-semibold">{currentIntern.name}</span>
                  </div>
                ) : (
                  <div className="text-slate-500 text-xs flex flex-col items-center gap-2">
                    <VideoOff className="w-6 h-6" /> Camera Offline
                  </div>
                )}
                <span className="absolute bottom-3 left-3 bg-slate-900/80 text-[10px] text-slate-300 px-2 py-1 rounded font-mono">
                  {currentIntern.name} (You)
                </span>
              </div>
            </div>

            {/* Video Call Controls Toolbar */}
            <div className="flex items-center justify-center gap-4 bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3 rounded-xl text-xs font-bold transition-all ${
                  isMicOn ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-red-600 text-white'
                }`}
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-xl text-xs font-bold transition-all ${
                  isVideoOn ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-red-600 text-white'
                }`}
              >
                {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  setIsScreenSharing(!isScreenSharing);
                  triggerToast(isScreenSharing ? 'Screen sharing stopped.' : 'Screen sharing activated.');
                }}
                className={`p-3 rounded-xl text-xs font-bold transition-all ${
                  isScreenSharing ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <ScreenShare className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMeetingOpen(false)}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <PhoneOff className="w-4 h-4" /> End Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
         13-STEP CHRONOLOGICAL WORKFLOW TIMELINE MODAL
         ============================================================ */}
      {showTimelineModal && selectedModalIntern && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <History className="w-4 h-4 text-purple-400" /> 13-Step Chronological Workflow Inspector
              </h3>
              <button onClick={() => setShowTimelineModal(false)} className="text-slate-400 text-xs font-bold">✕ Close</button>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { step: 1, title: 'Task Assigning', detail: `Read Excel record & generated title "${selectedModalIntern.taskTitle}"` },
                { step: 2, title: 'Task Allocation', detail: `Allocated to ${selectedModalIntern.name} (${selectedModalIntern.department})` },
                { step: 3, title: 'AI Task Explanation', detail: 'AI Chatbot mentor activated in candidate workbench.' },
                { step: 4, title: 'Review Mail Sent', detail: `Notification email dispatched to ${selectedModalIntern.email}` },
                { step: 5, title: 'Review Scheduled', detail: `Date set for ${selectedModalIntern.reviewDate}` },
                { step: 6, title: 'Review Attended', detail: 'Intern connected to WebRTC room simulator.' },
                { step: 7, title: 'Task Submitted', detail: selectedModalIntern.submissions[0]?.fileName || 'Pending file upload' },
                { step: 8, title: 'AI Analysis', detail: 'LLM diagnostic analyzed python code and requirements.' },
                { step: 9, title: 'AI Feedback Generated', detail: `Completion score evaluated at ${selectedModalIntern.completionPercentage}%` },
                { step: 10, title: 'Next Review Mail', detail: 'Revision request & meeting calendar link sent.' },
                { step: 11, title: 'Re-Submission', detail: 'Candidate submitted revised code v2.' },
                { step: 12, title: 'Re-Analysis', detail: 'AI re-evaluated unit tests and metrics.' },
                { step: 13, title: 'Final Completion', detail: selectedModalIntern.status === 'Internship Completed' ? 'Internship Certificate ready.' : 'Pipeline active.' }
              ].map((s) => (
                <div key={s.step} className="flex gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-purple-950 text-purple-400 border border-purple-800 font-mono text-[10px] flex items-center justify-center font-bold shrink-0">
                    {s.step}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-200">{s.title}</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
         AUTOMATED EMAIL LOG INSPECTOR MODAL
         ============================================================ */}
      {showEmailModal && selectedModalIntern && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" /> Outgoing Automated Email Log
              </h3>
              <button onClick={() => setShowEmailModal(false)} className="text-slate-400 text-xs font-bold">✕ Close</button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2 font-mono">
              <div className="text-slate-400">To: {selectedModalIntern.email}</div>
              <div className="text-cyan-300 font-bold">Subject: Internship Review & Task Brief [{selectedModalIntern.id}]</div>
              <div className="border-t border-slate-800 pt-2 text-slate-300 font-sans leading-relaxed">
                Dear {selectedModalIntern.name},<br/><br/>
                Your task <strong>"{selectedModalIntern.taskTitle}"</strong> has been assigned. Please join your first review meeting on <strong>{selectedModalIntern.reviewDate}</strong>.<br/><br/>
                Meeting Link: <span className="text-cyan-400">{selectedModalIntern.reviewLink}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
         HR MANUAL OVERRIDE MODAL
         ============================================================ */}
      {showOverrideModal && selectedModalIntern && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" /> HR Manual Status Override
              </h3>
              <button onClick={() => setShowOverrideModal(false)} className="text-slate-400 text-xs font-bold">✕ Close</button>
            </div>

            <p className="text-xs text-slate-400">
              Override AI decision for <strong className="text-slate-200">{selectedModalIntern.name}</strong> ({selectedModalIntern.id}):
            </p>

            <div className="space-y-2">
              <button
                onClick={() => handleApplyOverride('Internship Completed')}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
              >
                Mark as FULLY COMPLETED
              </button>
              <button
                onClick={() => handleApplyOverride('Revision Required')}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl"
              >
                Request FURTHER REVISION
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}