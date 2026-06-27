import React, { useState, useEffect } from "react";
import { User, Bell, Download, Mail, Check, X, FileText, Send, Trash, Edit3, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Notice, AdmissionApplication, DownloadItem, Message } from "../types";

export default function DashboardTeacher() {
  const [activeTab, setActiveTab] = useState<'admissions' | 'notices' | 'downloads' | 'messages'>('admissions');

  // Database Data States
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Action/Form States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appRemarks, setAppRemarks] = useState<{ [key: string]: string }>({});
  
  // Notice Form State
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    content: "",
    category: "General" as any,
    isUrgent: false,
    author: "Principal Desk"
  });

  // Download Form State
  const [downloadForm, setDownloadForm] = useState({
    title: "",
    category: "Syllabus" as any,
    size: "1.2 MB"
  });

  // Initial Fetches
  const fetchAllData = () => {
    fetch("/api/admissions")
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.log("Failed to fetch admissions in admin", err));

    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data))
      .catch((err) => console.log("Failed to fetch notices in admin", err));

    fetch("/api/downloads")
      .then((res) => res.json())
      .then((data) => setDownloads(data))
      .catch((err) => console.log("Failed to fetch downloads in admin", err));

    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.log("Failed to fetch messages in admin", err));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Update Admission Application status
  const handleUpdateStatus = async (id: string, newStatus: 'Approved' | 'Rejected') => {
    const remarks = appRemarks[id] || `Form review processed. Result: ${newStatus}`;
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, remarks })
      });
      if (res.ok) {
        alert(`Application ${id} status successfully marked as ${newStatus}!`);
        fetchAllData();
      } else {
        throw new Error("Failed to update status");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Submit Notice Form
  const handleNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.content) {
      alert("Please fill in notice title and announcement text.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noticeForm)
      });
      if (res.ok) {
        alert("Announcement posted successfully to Notice Board!");
        setNoticeForm({
          title: "",
          content: "",
          category: "General",
          isUrgent: false,
          author: "Principal Desk"
        });
        fetchAllData();
      } else {
        throw new Error("Failed to post notice");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Notice
  const handleDeleteNotice = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice? This action is permanent.")) return;
    try {
      const res = await fetch(`/api/notices/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchAllData();
      }
    } catch (err) {
      console.log("Failed to delete notice", err);
    }
  };

  // Submit Download Form
  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadForm.title) {
      alert("Please enter file title.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(downloadForm)
      });
      if (res.ok) {
        alert("Downloadable resource file registered successfully!");
        setDownloadForm({
          title: "",
          category: "Syllabus",
          size: "1.2 MB"
        });
        fetchAllData();
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Download
  const handleDeleteDownload = async (id: string) => {
    if (!confirm("Are you sure you want to remove this file link?")) return;
    try {
      const res = await fetch(`/api/downloads/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchAllData();
      }
    } catch (err) {
      console.log("Failed to delete download", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Dashboard Welcome Header */}
      <section className="bg-indigo-950 text-white p-6 sm:p-10 rounded-3xl relative overflow-hidden shadow">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-900 rounded-full filter blur-3xl opacity-30 -mr-10 -mt-10" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-amber-500 text-indigo-950 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
              Control Center Portal
            </span>
            <h1 className="text-display font-bold text-3xl sm:text-4xl text-white mt-2">
              Principal & Admin Desk
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">
              Nagar Nigam Inter College Secretariat &bull; Taj Ganj, Agra
            </p>
          </div>
          <div className="bg-white/10 border border-white/20 px-6 py-4 rounded-2xl shrink-0 flex items-center space-x-3">
            <div className="p-2 bg-amber-500 rounded-xl text-indigo-950"><User className="w-5 h-5" /></div>
            <div>
              <span className="block text-[10px] text-slate-300 font-bold uppercase">Authorized Access</span>
              <span className="block font-bold text-sm text-white uppercase tracking-wider">Super Administrator</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs navigation row */}
      <section className="flex flex-wrap border-b border-slate-200 pb-3 gap-2">
        <button
          onClick={() => setActiveTab('admissions')}
          className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition uppercase flex items-center space-x-2 ${
            activeTab === 'admissions' ? "bg-indigo-900 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Screen Admissions ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition uppercase flex items-center space-x-2 ${
            activeTab === 'notices' ? "bg-indigo-900 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Post Notices ({notices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('downloads')}
          className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition uppercase flex items-center space-x-2 ${
            activeTab === 'downloads' ? "bg-indigo-900 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Publish Downloads ({downloads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition uppercase flex items-center space-x-2 ${
            activeTab === 'messages' ? "bg-indigo-900 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Queries Inbox ({messages.length})</span>
        </button>
      </section>

      {/* Dynamic Content Panels based on Active Tab */}
      <section className="space-y-6">
        
        {/* Tab 1: Screen Admissions */}
        {activeTab === 'admissions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-display font-bold text-2xl text-indigo-950">Online Admission Applications</h2>
                <p className="text-xs text-slate-400 mt-0.5">Approve, reject, or comment on submitted registrations.</p>
              </div>
            </div>

            <div className="space-y-6">
              {applications.length === 0 ? (
                <p className="text-sm text-slate-500 italic py-8 text-center bg-white rounded-3xl border">No application logs submitted yet.</p>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between gap-6 hover:shadow-md transition">
                    {/* App info */}
                    <div className="space-y-4 md:max-w-xl flex-1">
                      <div className="flex items-center justify-between sm:justify-start sm:space-x-3">
                        <span className="font-mono text-xs font-bold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-md">{app.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          app.status === "Approved" ? "bg-emerald-100 text-emerald-800" :
                          app.status === "Rejected" ? "bg-red-100 text-red-800" :
                          "bg-amber-100 text-amber-800"
                        }`}>
                          {app.status}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">{app.submissionDate}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-600">
                        <div><strong className="text-indigo-950 font-bold uppercase text-[10px] tracking-wide block">Candidate</strong> <span className="text-base font-bold text-slate-800">{app.fullName}</span></div>
                        <div><strong className="text-indigo-950 font-bold uppercase text-[10px] tracking-wide block">Father's Name</strong> {app.fatherName}</div>
                        <div className="mt-1"><strong className="text-indigo-950 font-bold uppercase text-[10px] tracking-wide block">Applied Class</strong> <span className="font-semibold text-slate-700">{app.classApplied}</span></div>
                        <div className="mt-1"><strong className="text-indigo-950 font-bold uppercase text-[10px] tracking-wide block">Prior Score</strong> <span className="font-bold text-indigo-900">{app.marksPercentage}%</span></div>
                        <div className="col-span-2 mt-1"><strong className="text-indigo-950 font-bold uppercase text-[10px] tracking-wide block">Address</strong> {app.address}</div>
                        <div className="col-span-2 mt-1"><strong className="text-indigo-950 font-bold uppercase text-[10px] tracking-wide block">Contact Phone</strong> {app.phone} &bull; {app.email || "No Email"}</div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                        <span className="font-bold text-slate-500 uppercase text-[9px]">Active Remarks</span>
                        <p className="text-slate-600 italic">"{app.remarks || "No evaluation remarks posted yet."}"</p>
                      </div>
                    </div>

                    {/* App actions */}
                    <div className="md:w-64 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6 flex flex-col justify-between space-y-4 shrink-0">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">Write Remarks / Reason</label>
                        <textarea
                          placeholder="e.g. Approved. Submit fees; or Missing marksheets"
                          value={appRemarks[app.id] || ""}
                          onChange={(e) => setAppRemarks({ ...appRemarks, [app.id]: e.target.value })}
                          rows={2}
                          className="w-full border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Approved')}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-lg text-xs font-bold uppercase flex items-center justify-center space-x-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Rejected')}
                          className="bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-lg text-xs font-bold uppercase flex items-center justify-center space-x-1"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Post Notices */}
        {activeTab === 'notices' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Post notices form block */}
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-100 h-max space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-indigo-950">Add Notice Board Circular</h3>
                <p className="text-xs text-slate-400">Post new notices that will reflect on the home marquee and archive.</p>
              </div>

              <form onSubmit={handleNoticeSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Notice Title *</label>
                  <input
                    type="text"
                    value={noticeForm.title}
                    onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                    placeholder="e.g. Mid-Term Schedule Released"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Category *</label>
                    <select
                      value={noticeForm.category}
                      onChange={(e: any) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs bg-white focus:ring-1"
                    >
                      <option value="General">General</option>
                      <option value="Academic">Academic</option>
                      <option value="Admission">Admission</option>
                      <option value="Event">Event</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Author Desk *</label>
                    <input
                      type="text"
                      value={noticeForm.author}
                      onChange={(e) => setNoticeForm({ ...noticeForm, author: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Notice Circular Content *</label>
                  <textarea
                    value={noticeForm.content}
                    onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                    placeholder="Type official notification body text..."
                    rows={4}
                    className="w-full border border-slate-200 rounded-xl p-4 text-xs focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isUrgent"
                    checked={noticeForm.isUrgent}
                    onChange={(e) => setNoticeForm({ ...noticeForm, isUrgent: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-200"
                  />
                  <label htmlFor="isUrgent" className="text-xs font-bold text-red-600 uppercase flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" /> Mark as URGENT Notification
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-950 text-amber-500 font-bold py-3 rounded-xl text-xs uppercase transition tracking-wide flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Post Official Notice</span>}
                </button>
              </form>
            </div>

            {/* List notices board */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-display font-bold text-lg text-indigo-950 border-b pb-2 mb-4">Active Board Circulars</h3>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {notices.map((notice) => (
                  <div key={notice.id} className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold text-indigo-900 bg-indigo-50 px-2.5 py-0.5 rounded uppercase tracking-wider">{notice.category}</span>
                        {notice.isUrgent && <span className="text-red-600 text-[10px] font-bold">[URGENT]</span>}
                        <span className="text-xs text-slate-400 font-mono">{notice.date}</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-base leading-snug">{notice.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{notice.content}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteNotice(notice.id)}
                      className="bg-red-50 text-red-600 hover:bg-red-100 p-2.5 rounded-xl border border-red-100 transition shrink-0"
                      title="Delete notice"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Publish Downloads */}
        {activeTab === 'downloads' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Block */}
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-100 h-max space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-indigo-950">Publish Student Download</h3>
                <p className="text-xs text-slate-400">Add syllabus PDFs, academic calendars, or sample sheets.</p>
              </div>

              <form onSubmit={handleDownloadSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">File Title *</label>
                  <input
                    type="text"
                    value={downloadForm.title}
                    onChange={(e) => setDownloadForm({ ...downloadForm, title: e.target.value })}
                    placeholder="e.g. Class XII Commerce Syllabus"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Category *</label>
                    <select
                      value={downloadForm.category}
                      onChange={(e: any) => setDownloadForm({ ...downloadForm, category: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs bg-white"
                    >
                      <option value="Syllabus">Syllabus</option>
                      <option value="Date Sheet">Date Sheet</option>
                      <option value="Admission">Admission</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Estimated Size *</label>
                    <input
                      type="text"
                      value={downloadForm.size}
                      onChange={(e) => setDownloadForm({ ...downloadForm, size: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-950 text-amber-500 font-bold py-3 rounded-xl text-xs uppercase flex items-center justify-center space-x-2"
                >
                  <span>Publish Resource Document</span>
                </button>
              </form>
            </div>

            {/* List Block */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-display font-bold text-lg text-indigo-950 border-b pb-2 mb-4">Published Resource Repository</h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {downloads.map((d) => (
                  <div key={d.id} className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-50 text-emerald-700 p-2 rounded-xl">
                        <Download className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-indigo-950 block text-sm sm:text-base leading-snug">{d.title}</span>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5 block">{d.category} &bull; Size: {d.size}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteDownload(d.id)}
                      className="bg-red-50 text-red-600 hover:bg-red-100 p-2 rounded-xl transition shrink-0"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Messages Inbox */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-display font-bold text-2xl text-indigo-950">Visitor Queries & Inquiries</h2>
              <p className="text-xs text-slate-400 mt-0.5 font-medium uppercase">Direct Messages received from school Contact Desk.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {messages.length === 0 ? (
                <p className="col-span-full text-center py-10 text-slate-400 italic bg-white rounded-3xl border">No direct inquiry logs present in databases.</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                      <div>
                        <span className="font-bold text-indigo-950 text-sm block">{msg.name}</span>
                        <span className="text-xs text-indigo-600 block leading-tight">{msg.email}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">{msg.dateAdded}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Subject Topic</span>
                      <span className="font-bold text-slate-800 text-sm block leading-snug mt-0.5">{msg.subject}</span>
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-xl border text-xs text-slate-600 leading-relaxed font-semibold italic">
                      "{msg.message}"
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </section>

    </div>
  );
}
