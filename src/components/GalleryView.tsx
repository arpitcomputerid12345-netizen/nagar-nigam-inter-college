import React, { useState } from "react";
import { Maximize2, X, Play, Image, Video } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "Events" | "Campus" | "Sports" | "Celebrations";
  imageUrl: string;
  type: "image" | "video";
  videoUrl?: string;
}

export default function GalleryView() {
  const [activeTab, setActiveTab] = useState<'All' | 'Events' | 'Campus' | 'Sports' | 'Celebrations'>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "g1",
      title: "School Flag Hoisting Independence Day",
      category: "Celebrations",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      type: "image"
    },
    {
      id: "g2",
      title: "Science Lab Practical Physics Experiment",
      category: "Campus",
      imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      type: "image"
    },
    {
      id: "g3",
      title: "Annual Sports Meet Athletics Track Run",
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      type: "image"
    },
    {
      id: "g4",
      title: "Inter-School Science Model Exhibition",
      category: "Events",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      type: "image"
    },
    {
      id: "g5",
      title: "Senior Secondary Computer Classroom Study",
      category: "Campus",
      imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
      type: "image"
    },
    {
      id: "g6",
      title: "Annual Function Folk Dance Performance",
      category: "Celebrations",
      imageUrl: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
      type: "image"
    }
  ];

  const videosList = [
    {
      title: "Annual Science Exhibition & Lab Demonstration Tour",
      duration: "5:20 Mins",
      embedPlaceholder: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Inter-School Sports Meet March Past & Drills",
      duration: "12:15 Mins",
      embedPlaceholder: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
          Visual Memories
        </span>
        <h1 className="text-display font-bold text-3xl sm:text-4xl md:text-5xl text-indigo-950 mt-4">
          Photo & Video Galleries
        </h1>
        <p className="text-slate-600 text-sm sm:text-lg mt-3">
          Relive annual celebrations, academic workshops, co-curricular highlights, and historical moments.
        </p>
      </section>

      {/* Photo Gallery Tab Filter */}
      <section className="space-y-8">
        <div className="flex flex-wrap items-center justify-between border-b pb-4 gap-4">
          <h2 className="text-display font-bold text-2xl text-indigo-950 flex items-center space-x-2">
            <Image className="w-5 h-5 text-indigo-700" />
            <span>Campus Snapshot Grid</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {(['All', 'Events', 'Campus', 'Sports', 'Celebrations'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition ${
                  activeTab === tab
                    ? "bg-indigo-950 text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 group cursor-pointer hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-indigo-950/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="bg-white/95 text-indigo-950 p-3 rounded-full shadow shadow-indigo-950/20">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest font-mono block">
                  {item.category}
                </span>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base mt-1.5 leading-snug truncate">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="space-y-8">
        <div className="border-b pb-4">
          <h2 className="text-display font-bold text-2xl text-indigo-950 flex items-center space-x-2">
            <Video className="w-5 h-5 text-red-600" />
            <span>Interactive Video Showcase</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videosList.map((vid, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow flex flex-col md:flex-row group hover:shadow-md transition">
              {/* Media box */}
              <div className="relative md:w-56 overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={vid.embedPlaceholder}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 min-h-[140px]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <span className="bg-red-600 text-white p-3 rounded-full shadow hover:bg-red-500 transition">
                    <Play className="w-5 h-5 fill-white" />
                  </span>
                </div>
              </div>
              {/* Info block */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded uppercase font-mono tracking-wider">
                    Official Video
                  </span>
                  <h3 className="font-bold text-indigo-950 text-sm sm:text-base mt-2 leading-snug">
                    {vid.title}
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono mt-3 block">Duration: {vid.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full screen modal image previewer */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 flex items-center justify-center p-4 backdrop-blur-sm">
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 bg-white/10 text-white hover:bg-white/20 p-2.5 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 text-white">
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.title}
              className="w-full max-h-[70vh] object-contain rounded-2xl mx-auto"
              referrerPolicy="no-referrer"
            />
            <div className="px-2">
              <span className="text-xs text-amber-500 font-bold font-mono uppercase tracking-wider">{selectedItem.category}</span>
              <h3 className="text-display font-bold text-base sm:text-xl mt-1 leading-snug">{selectedItem.title}</h3>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
