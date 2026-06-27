import React, { useState, useEffect } from "react";
import { Download, Search, FileText, Calendar, BookOpen, ExternalLink } from "lucide-react";

interface DownloadItem {
  id: string;
  title: string;
  category: "Syllabus" | "Date Sheet" | "Admission" | "Other";
  fileUrl: string;
  dateAdded: string;
  size: string;
}

export default function DownloadsView() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<'All' | 'Syllabus' | 'Date Sheet' | 'Admission' | 'Other'>('All');

  useEffect(() => {
    fetch("/api/downloads")
      .then((res) => res.json())
      .then((data) => setDownloads(data))
      .catch((err) => console.log("Failed to load downloads list", err));
  }, []);

  const filteredDownloads = downloads.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeCategory === 'All') return matchesSearch;
    return matchesSearch && item.category === activeCategory;
  });

  const handleDownloadClick = (item: DownloadItem) => {
    // Generate a simulated secure file stream alert
    alert(`Starting download of document: "${item.title}" (${item.size})\nSecurity check... Done. Transfer complete!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
          Student Resources
        </span>
        <h1 className="text-display font-bold text-3xl sm:text-4xl md:text-5xl text-indigo-950 mt-4">
          Downloads & Circular Files
        </h1>
        <p className="text-slate-600 text-sm sm:text-lg mt-3">
          Access latest syllabus structures, board sample questions, holiday calendars, and intermediate exam schedules.
        </p>
      </section>

      {/* Control panel: Search and categories */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search input */}
        <div className="relative md:w-80">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents by title..."
            className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Categories filters */}
        <div className="flex flex-wrap gap-2">
          {(['All', 'Syllabus', 'Date Sheet', 'Admission', 'Other'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition ${
                activeCategory === cat
                  ? "bg-indigo-950 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat === 'All' ? 'All Files' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Downloads Table Grid */}
      <section className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="px-6 py-4.5">Document Details</th>
                <th className="px-6 py-4.5 hidden md:table-cell">Category</th>
                <th className="px-6 py-4.5 hidden sm:table-cell">Added Date</th>
                <th className="px-6 py-4.5">File Size</th>
                <th className="px-6 py-4.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs sm:text-sm text-slate-700">
              {filteredDownloads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-400 italic">
                    No documents found matching the search criteria.
                  </td>
                </tr>
              ) : (
                filteredDownloads.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition duration-150">
                    <td className="px-6 py-4.5">
                      <div className="flex items-center space-x-3">
                        <div className="bg-emerald-50 text-emerald-700 p-2 rounded-xl shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-indigo-950 block max-w-xs sm:max-w-md truncate" title={item.title}>
                            {item.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide md:hidden mt-0.5 block">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 hidden md:table-cell">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                        item.category === "Syllabus" ? "bg-indigo-50 text-indigo-950 border border-indigo-100" :
                        item.category === "Admission" ? "bg-amber-50 text-amber-950 border border-amber-100" :
                        item.category === "Date Sheet" ? "bg-purple-50 text-purple-950 border border-purple-100" :
                        "bg-slate-100 text-slate-800"
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 hidden sm:table-cell text-slate-400 font-mono text-xs">
                      {item.dateAdded}
                    </td>
                    <td className="px-6 py-4.5 font-mono text-slate-500 text-xs">
                      {item.size}
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <button
                        onClick={() => handleDownloadClick(item)}
                        className="bg-indigo-950 text-amber-400 hover:bg-indigo-900 border border-indigo-950 p-2 sm:px-4 sm:py-2 rounded-xl text-xs font-bold uppercase transition shadow-sm inline-flex items-center space-x-1.5"
                      >
                        <Download className="w-3.5 h-3.5 shrink-0" />
                        <span className="hidden sm:inline">Download File</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Help Section Card */}
      <section className="bg-slate-50 border border-slate-150 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <h4 className="font-display font-bold text-lg text-indigo-950">Looking for Old Board Results or Syllabus?</h4>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
            Board results can also be tracked directly on the official Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP) web portal using your standard exam credentials.
          </p>
        </div>
        <a
          href="https://upmsp.edu.in"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-indigo-900 hover:bg-slate-100 px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold uppercase shadow-sm inline-flex items-center space-x-2 shrink-0 transition"
        >
          <span>Visit UPMSP Portal</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </section>

    </div>
  );
}
