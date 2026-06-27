import React, { useState, useEffect } from "react";
import { Search, Bell, AlertTriangle, Calendar, Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react";

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: "Academic" | "Admission" | "Event" | "General";
  isUrgent: boolean;
  author: string;
}

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
}

export default function NoticesView() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<'All' | 'Academic' | 'Admission' | 'Event' | 'General'>('All');
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch notices
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data))
      .catch((err) => console.log("Failed to load notices list", err));

    // Fetch events
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log("Failed to load events list", err));
  }, []);

  const filteredNotices = notices.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeCategory === 'All') return matchesSearch;
    return matchesSearch && item.category === activeCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedNoticeId(expandedNoticeId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
          School Newsroom
        </span>
        <h1 className="text-display font-bold text-3xl sm:text-4xl md:text-5xl text-indigo-950 mt-4">
          Announcements & Event Circulars
        </h1>
        <p className="text-slate-600 text-sm sm:text-lg mt-3">
          Stay informed about examination schedules, scholarship updates, sports events, and parent-teacher assemblies.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Notices Archive List Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-display font-bold text-2xl text-indigo-950 flex items-center space-x-2">
              <Bell className="w-5 h-5 text-indigo-700 animate-pulse" />
              <span>Announcement Feed</span>
            </h2>

            {/* Notice Category filter dropdown */}
            <select
              value={activeCategory}
              onChange={(e: any) => setActiveCategory(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white"
            >
              <option value="All">All Categories</option>
              <option value="Academic">Academic</option>
              <option value="Admission">Admission</option>
              <option value="Event">Event</option>
              <option value="General">General</option>
            </select>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search announcements by keyword..."
              className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Notices Grid */}
          <div className="space-y-4">
            {filteredNotices.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
                <p className="text-sm text-slate-500 italic">No notices found matching the keyword.</p>
              </div>
            ) : (
              filteredNotices.map((notice) => {
                const isExpanded = expandedNoticeId === notice.id;
                return (
                  <div
                    key={notice.id}
                    className={`bg-white rounded-3xl p-6 border transition hover:shadow-md ${
                      notice.isUrgent
                        ? "border-red-200 bg-red-50/10"
                        : "border-slate-100"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-50 pb-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          notice.category === "Admission" ? "bg-amber-100 text-amber-800" :
                          notice.category === "Academic" ? "bg-indigo-100 text-indigo-800" :
                          notice.category === "Event" ? "bg-purple-100 text-purple-800" :
                          "bg-slate-200 text-slate-800"
                        }`}>
                          {notice.category}
                        </span>
                        {notice.isUrgent && (
                          <span className="bg-red-600 text-white font-bold text-[9px] px-2 py-0.5 rounded flex items-center uppercase tracking-wider">
                            <AlertTriangle className="w-3 h-3 mr-1" /> Urgent
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-slate-400">{notice.date}</span>
                    </div>

                    <div
                      onClick={() => toggleExpand(notice.id)}
                      className="cursor-pointer flex justify-between items-start group"
                    >
                      <h3 className="font-display font-bold text-lg sm:text-xl text-indigo-950 group-hover:text-indigo-800 transition">
                        {notice.title}
                      </h3>
                      <button className="text-slate-400 group-hover:text-indigo-900 transition mt-1 ml-2">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className={`mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed space-y-2 transition-all duration-300 ${
                      isExpanded ? "block opacity-100" : "line-clamp-2 opacity-90"
                    }`}>
                      <p>{notice.content}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                      <span>Authority: {notice.author}</span>
                      <span>Ref: NNIC-{notice.id.toUpperCase()}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Dynamic Event Calendar Column */}
        <div className="space-y-6 lg:col-span-1">
          <div className="border-b pb-4">
            <h2 className="text-display font-bold text-2xl text-indigo-950 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-indigo-700" />
              <span>Event Calendar</span>
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
            <p className="text-xs text-slate-400">Chronological calendar of school events and celebrations.</p>
            
            <div className="space-y-6">
              {events.length === 0 ? (
                <p className="text-sm text-slate-500 italic py-6">No calendar events posted.</p>
              ) : (
                events.map((evt) => {
                  const dateParts = evt.date.split("-");
                  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  const month = dateParts[1] ? monthNames[parseInt(dateParts[1]) - 1] : "Date";
                  const day = dateParts[2] || "01";

                  return (
                    <div key={evt.id} className="flex space-x-4 items-start border-b last:border-0 pb-4 last:pb-0">
                      {/* Date Block */}
                      <div className="flex flex-col items-center justify-center bg-indigo-950 text-white w-14 h-14 rounded-2xl shadow shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{month}</span>
                        <span className="text-xl font-display font-bold leading-none mt-1.5">{day}</span>
                      </div>
                      {/* Event details */}
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                          {evt.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{evt.description}</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-400 font-semibold uppercase mt-2 font-mono">
                          <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {evt.time || "All Day"}</span>
                          <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-red-600" /> {evt.location || "Campus"}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
