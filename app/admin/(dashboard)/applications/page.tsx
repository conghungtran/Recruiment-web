'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  Download,
  Mail,
  Calendar,
  MapPin,
  DollarSign,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  Send,
  Zap,
  TrendingUp,
  UserCheck,
  X,
  ChevronDown,
  FileText,
  Phone,
  Linkedin,
  Github,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  RefreshCcw,
} from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
// Extended Data Model
interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: 'new' | 'reviewed' | 'interview' | 'offer' | 'hired' | 'rejected';
  pipeline: 'new' | 'screening' | 'shortlisted' | 'interview' | 'offer' | 'hired' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: 'website' | 'linkedin' | 'referral' | 'agency' | 'direct' | 'other';
  assignedTo?: string;
  rating?: number; // 1-5 stars
  tags?: string[];
  resumeUrl?: string;
  coverLetterUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  appliedDate: string;
  lastUpdated: string;
  interviewDate?: string;
  interviewType?: 'phone' | 'video' | 'onsite' | 'technical';
  notes?: string;
  experience?: number; // years
  expectedSalary?: number;
  offeredSalary?: number;
  skills?: string[];
  education?: string;
  location?: string;
  availability?: string;
  avatar?: string;
}

// Fetch jobs map (job_id -> job_title)
async function fetchJobsMap(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`/api/jobs?pageSize=1000`, { cache: 'no-store' });
    const json = await res.json();
    const items: any[] = json.items || [];
    const map: Record<string, string> = {};
    for (const it of items) {
      const id = String(it.id ?? it.job_id ?? '');
      if (!id) continue;
      const title = (it.job_title ?? it.title ?? '').toString().trim();
      if (title) map[id] = title;
    }
    return map;
  } catch {
    return {};
  }
}

// Fetch admin applications
async function fetchAdminApplications(): Promise<JobApplication[]> {
  const [appsRes, jobsMap] = await Promise.all([
    fetch(`/api/admin/applications?pageSize=200`, { cache: 'no-store' }).then(r => r.json()),
    fetchJobsMap(),
  ]);
  const items: any[] = appsRes.items || [];
  return items.map((it, i) => {
    const cvStatus: string | undefined = it.cv_status ?? (typeof it.status === 'number' ? (it.status === 1 ? 'approved' : 'rejected') : undefined);
    const pipeline = pipelineFromCvStatus(cvStatus);
    const status = statusFromCvStatus(cvStatus);
    const name = it.fullName || it.name || 'Unknown';
    const email = it.email || '';
    const phone = it.phone || '';
    const jobIdRaw = it.job_id ?? it.jobId;
    const jobId = jobIdRaw != null ? String(jobIdRaw) : '';
    const jobTitleFromMap = jobId ? jobsMap[jobId] : undefined;
    const rawTitle = (it.job_title || jobTitleFromMap || (jobId ? `Job #${jobId}` : 'N/A')).toString().trim();
    const lowered = rawTitle.toLowerCase();
    const cats: string[] = [];
    if (/full\s*stack|fullstack/.test(lowered)) cats.push('Fullstack');
    if (/(front[-\s]?end|frontend)/.test(lowered)) cats.push('Front-End');
    if (/(back[-\s]?end|backend)/.test(lowered)) cats.push('Back-End');
    if (/mobile|android|ios|react\s*native|flutter/.test(lowered)) cats.push('Mobile');
    const position = cats.length ? cats.join(', ') : rawTitle;
    const appliedAt = it.uploadedAt || it.created_at || new Date().toISOString();
    const resumeStored = it.path || it.storedName || it.file?.storedName || it.cv_path;
    const resumeUrl = resumeStored ? `${BACKEND_URL}/uploads/${resumeStored}` : undefined;

    return {
      id: String(it.id ?? i),
      name,
      email,
      phone,
      position,
      department: '—',
      status,
      pipeline,
      priority: 'medium',
      source: 'website',
      assignedTo: undefined,
      rating: undefined,
      tags: undefined,
      resumeUrl,
      coverLetterUrl: undefined,
      portfolioUrl: undefined,
      linkedinUrl: undefined,
      githubUrl: undefined,
      appliedDate: appliedAt,
      lastUpdated: appliedAt,
      interviewDate: undefined,
      interviewType: undefined,
      notes: undefined,
      experience: undefined,
      expectedSalary: undefined,
      offeredSalary: undefined,
      skills: undefined,
      education: undefined,
      location: undefined,
      availability: undefined,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    } as JobApplication;
  });
}

function pipelineFromCvStatus(s?: string): JobApplication['pipeline'] {
  switch ((s || '').toLowerCase()) {
    case 'checking':
      return 'screening';
    case 'approved':
      return 'shortlisted';
    case 'quiz_ready':
    case 'quiz_completed':
      return 'interview';
    case 'quiz_passed':
      return 'offer';
    case 'quiz_failed':
    case 'rejected':
      return 'rejected';
    default:
      return 'new';
  }
}

function statusFromCvStatus(s?: string): JobApplication['status'] {
  switch ((s || '').toLowerCase()) {
    case 'checking':
      return 'new';
    case 'approved':
    case 'quiz_ready':
      return 'reviewed';
    case 'quiz_completed':
      return 'interview';
    case 'quiz_passed':
      return 'offer';
    case 'quiz_failed':
    case 'rejected':
      return 'rejected';
    default:
      return 'new';
  }
}

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPipeline, setSelectedPipeline] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'priority'>('date');
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [detailView, setDetailView] = useState<JobApplication | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Notification helper
  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Load from API
  const load = async () => {
    setIsLoading(true);
    try {
      const list = await fetchAdminApplications();
      setApplications(list);
      showNotification('success', 'Applications synced');
    } catch (e) {
      showNotification('error', 'Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Filter and search logic
  const filteredApplications = useMemo(() => {
    let filtered = applications.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
      const matchesPipeline = selectedPipeline === 'all' || app.pipeline === selectedPipeline;
      const matchesPriority = selectedPriority === 'all' || app.priority === selectedPriority;
      const matchesSource = selectedSource === 'all' || app.source === selectedSource;

      return matchesSearch && matchesStatus && matchesPipeline && matchesPriority && matchesSource;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'date') return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'priority') {
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

    return filtered;
  }, [applications, searchTerm, selectedStatus, selectedPipeline, selectedPriority, selectedSource, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = applications.length;
    const byPipeline = applications.reduce((acc, app) => {
      acc[app.pipeline] = (acc[app.pipeline] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgProcessingTime = Math.floor(Math.random() * 10) + 5; // Mock

    return {
      total,
      byPipeline,
      avgProcessingTime,
      conversionRate: total > 0 ? Math.floor((byPipeline.hired || 0) / total * 100) : 0,
    };
  }, [applications]);

  // Bulk actions
  const handleBulkAction = async (action: 'email' | 'move' | 'delete', payload?: any) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      if (action === 'delete') {
        setApplications(prev => prev.filter(app => !selectedApplications.includes(app.id)));
        showNotification('success', `Deleted ${selectedApplications.length} application(s)`);
      } else if (action === 'move' && payload?.pipeline) {
        setApplications(prev => prev.map(app =>
          selectedApplications.includes(app.id) ? { ...app, pipeline: payload.pipeline } : app
        ));
        showNotification('success', `Moved ${selectedApplications.length} application(s) to ${payload.pipeline}`);
      } else if (action === 'email') {
        showNotification('success', `Email sent to ${selectedApplications.length} candidate(s)`);
      }

      setSelectedApplications([]);
    } catch (error) {
      showNotification('error', 'Action failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // n8n AI Filter
  const handleAIFilter = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://your-n8n-instance.com/webhook/filter-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applications: applications.filter(app => app.pipeline === 'new') }),
      });

      if (!response.ok) throw new Error('Filter failed');
      
      const result = await response.json();
      showNotification('success', `AI filtered ${result.filtered || 0} applications`);
      
      // Update applications with AI results
      // Implementation depends on your n8n workflow response structure
    } catch (error) {
      showNotification('error', 'AI filter failed. Please check n8n configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  // Pipeline badge color
  const getPipelineColor = (pipeline: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-100 text-blue-700 border-blue-200',
      screening: 'bg-purple-100 text-purple-700 border-purple-200',
      shortlisted: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      interview: 'bg-amber-100 text-amber-700 border-amber-200',
      offer: 'bg-green-100 text-green-700 border-green-200',
      hired: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[pipeline] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      urgent: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-gray-400',
    };
    return colors[priority] || 'bg-gray-400';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications Management</h1>
          <p className="text-gray-600 mt-1">Track and manage recruitment pipeline</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={load}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCcw className="w-4 h-4" />
            Reload
          </button>
          <button
            onClick={handleAIFilter}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
          >
            <Zap className="w-4 h-4" />
            AI Filter New CVs
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Pipeline</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.byPipeline.interview || 0}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hired</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.byPipeline.hired || 0}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.conversionRate}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, skills, position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Toggle Filters */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="priority">Sort by Priority</option>
          </select>

          {/* Export */}
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Extended Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200"
            >
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={selectedPipeline}
                onChange={(e) => setSelectedPipeline(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Pipelines</option>
                <option value="new">New</option>
                <option value="screening">Screening</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Sources</option>
                <option value="website">Website</option>
                <option value="linkedin">LinkedIn</option>
                <option value="referral">Referral</option>
                <option value="agency">Agency</option>
                <option value="direct">Direct</option>
              </select>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bulk Actions */}
        {selectedApplications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <span className="text-sm font-medium text-blue-900">
              {selectedApplications.length} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('email')}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 text-sm"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </button>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleBulkAction('move', { pipeline: e.target.value });
                    e.target.value = '';
                  }
                }}
                className="px-3 py-1.5 bg-white border border-blue-300 text-blue-700 rounded-lg text-sm"
              >
                <option value="">Move to...</option>
                <option value="screening">Screening</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={() => handleBulkAction('delete')}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-100 border border-red-300 text-red-700 rounded-lg hover:bg-red-200 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
            <button
              onClick={() => setSelectedApplications([])}
              className="ml-auto text-blue-700 hover:text-blue-900"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedApplications(filteredApplications.map(app => app.id));
                      } else {
                        setSelectedApplications([]);
                      }
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Candidate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Position</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Pipeline</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Applied</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {filteredApplications.map((app, index) => (
                  <motion.tr
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedApplications.includes(app.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedApplications([...selectedApplications, app.id]);
                          } else {
                            setSelectedApplications(selectedApplications.filter(id => id !== app.id));
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.avatar}
                          alt={app.name}
                          className="w-10 h-10 rounded-full border-2 border-gray-200"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{app.name}</div>
                          <div className="text-sm text-gray-500">{app.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">{app.position}</div>
                      <div className="text-xs text-gray-500">{app.department}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPipelineColor(app.pipeline)}`}>
                        {app.pipeline}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(app.priority)}`} />
                        <span className="text-sm text-gray-700 capitalize">{app.priority}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-700 capitalize">{app.source}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < (app.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-700">
                        {new Date(app.appliedDate).toLocaleDateString('vi-VN')}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => setDetailView(app)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="py-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No applications found</p>
          </div>
        )}
      </div>

      {/* Detail View Modal */}
      <AnimatePresence>
        {detailView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDetailView(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                  <img
                    src={detailView.avatar}
                    alt={detailView.name}
                    className="w-16 h-16 rounded-full border-4 border-gray-200"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{detailView.name}</h2>
                    <p className="text-gray-600">{detailView.position}</p>
                  </div>
                </div>
                <button
                  onClick={() => setDetailView(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="text-sm font-medium text-gray-900">{detailView.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-xs text-gray-500">Phone</div>
                      <div className="text-sm font-medium text-gray-900">{detailView.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="text-sm font-medium text-gray-900">{detailView.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-xs text-gray-500">Availability</div>
                      <div className="text-sm font-medium text-gray-900">{detailView.availability}</div>
                    </div>
                  </div>
                </div>

                {/* Status & Pipeline */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pipeline Stage</label>
                    <select
                      value={detailView.pipeline}
                      onChange={(e) => {
                        setApplications(prev => prev.map(app =>
                          app.id === detailView.id ? { ...app, pipeline: e.target.value as any } : app
                        ));
                        setDetailView({ ...detailView, pipeline: e.target.value as any });
                        showNotification('success', 'Pipeline updated');
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">New</option>
                      <option value="screening">Screening</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="interview">Interview</option>
                      <option value="offer">Offer</option>
                      <option value="hired">Hired</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={detailView.priority}
                      onChange={(e) => {
                        setApplications(prev => prev.map(app =>
                          app.id === detailView.id ? { ...app, priority: e.target.value as any } : app
                        ));
                        setDetailView({ ...detailView, priority: e.target.value as any });
                        showNotification('success', 'Priority updated');
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                    <input
                      type="text"
                      value={detailView.assignedTo || ''}
                      onChange={(e) => {
                        setApplications(prev => prev.map(app =>
                          app.id === detailView.id ? { ...app, assignedTo: e.target.value } : app
                        ));
                        setDetailView({ ...detailView, assignedTo: e.target.value });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Professional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Experience</span>
                    </div>
                    <p className="text-gray-700">{detailView.experience} years</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Education</span>
                    </div>
                    <p className="text-gray-700">{detailView.education}</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Expected Salary</span>
                    </div>
                    <p className="text-gray-700">{detailView.expectedSalary?.toLocaleString()} USD</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 cursor-pointer ${i < (detailView.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          onClick={() => {
                            const newRating = i + 1;
                            setApplications(prev => prev.map(app =>
                              app.id === detailView.id ? { ...app, rating: newRating } : app
                            ));
                            setDetailView({ ...detailView, rating: newRating });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-gray-600" />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {detailView.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Links & Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {detailView.resumeUrl && (
                      <a
                        href={detailView.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FileText className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">View Resume</span>
                      </a>
                    )}
                    {detailView.linkedinUrl && (
                      <a
                        href={detailView.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900">LinkedIn Profile</span>
                      </a>
                    )}
                    {detailView.githubUrl && (
                      <a
                        href={detailView.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Github className="w-5 h-5 text-gray-900" />
                        <span className="text-sm font-medium text-gray-900">GitHub Profile</span>
                      </a>
                    )}
                    {detailView.portfolioUrl && (
                      <a
                        href={detailView.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Globe className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900">Portfolio</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Interview Schedule */}
                {detailView.interviewDate && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-amber-600" />
                      <span className="font-medium text-amber-900">Scheduled Interview</span>
                    </div>
                    <p className="text-amber-800">
                      {new Date(detailView.interviewDate).toLocaleString('vi-VN')} • {detailView.interviewType?.toUpperCase()}
                    </p>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={detailView.notes || ''}
                    onChange={(e) => {
                      setApplications(prev => prev.map(app =>
                        app.id === detailView.id ? { ...app, notes: e.target.value } : app
                      ));
                      setDetailView({ ...detailView, notes: e.target.value });
                    }}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add internal notes about this candidate..."
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Mail className="w-4 h-4" />
                    Send Email
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Calendar className="w-4 h-4" />
                    Schedule Interview
                  </button>
                  <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
              notification.type === 'success' ? 'bg-green-600 text-white' :
              notification.type === 'error' ? 'bg-red-600 text-white' :
              'bg-blue-600 text-white'
            }`}
          >
            {notification.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
            {notification.type === 'error' && <XCircle className="w-5 h-5" />}
            {notification.type === 'info' && <AlertCircle className="w-5 h-5" />}
            <span className="font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-2xl">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-700 mt-4 font-medium">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;

