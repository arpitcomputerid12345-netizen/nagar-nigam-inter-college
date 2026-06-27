import React, { useState, useEffect } from "react";
import { ArrowRight, Bell, Calendar, Download, Trophy, Users, Eye, Sparkles, BookOpen, Clock, Heart, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

interface HomeViewProps {
  setCurrentView: (view: string) => void;
  stats: {
    visitorCount: number;
    totalAdmissions: number;
    activeNotices: number;
    totalStudents: number;
  };
  incrementVisitor: () => void;
}

export default function HomeView({ setCurrentView, stats, incrementVisitor }: HomeViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notices, setNotices] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  const slides = [
    {
      title: "Empowering Future Leaders Since 1949",
      subtitle: "Nagar Nigam Inter College, Taj Ganj, Agra",
      description: "Providing high-quality UP Board education, modern labs, and comprehensive sports curricula in Agra division for over 75 years.",
      ctaText: "Apply Online Registration",
      ctaView: "admission",
      bgClass: "from-indigo-950 via-slate-900 to-transparent",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Excellent Academic Record & Faculty",
      subtitle: "UP Board High School & Intermediate Co-education",
      description: "Mentoring children with expert co-educational training, standard science laboratories, and high-scoring topper boards.",
      ctaText: "Explore Faculty Directory",
      ctaView: "faculty",
      bgClass: "from-blue-950 via-slate-900 to-transparent",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Comprehensive Student Development",
      subtitle: "Beyond Classrooms: Co-curricular & Sports Programs",
      description: "Annual Science exhibitions, Sports meets, post-matric scholarship programs, and highly dynamic student council events.",
      ctaText: "Download Resource Files",
      ctaView: "downloads",
      bgClass: "from-purple-950 via-slate-900 to-transparent",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  useEffect(() => {
    // Auto slide
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch top 3 notices
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data.slice(0, 3)))
      .catch((err) => console.log("Failed to load home notices", err));

    // Fetch events
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log("Failed to load home events", err));

    // Increment visitor count
    incrementVisitor();
  }, []);

  const toppers = [
    {
      name: "Sanjay Dixit",
      score: "96.4%",
      class: "Class XII (Intermediate Science)",
      rank: "District Rank 3",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Komal Yadav",
      score: "95.8%",
      class: "Class XII (Intermediate Commerce)",
      rank: "School Topper",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Ravi Pathak",
      score: "94.6%",
      class: "Class X (High School)",
      rank: "School Topper",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80"
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Dynamic Animated Hero Slider Section */}
      <section className="relative w-full h-[520px] bg-slate-900 overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 scale-105"
            }`}
          >
            {/* Background image */}
            <div className="absolute inset-0 bg-slate-950/40">
              <img
                src={slide.image}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60 mix-blend-overlay"
              />
            </div>
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgClass} z-10`} />

            {/* Slide Content */}
            <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center z-20 text-white space-y-4">
              <span className="inline-block bg-amber-500 text-slate-950 px-3 py-1 rounded-md text-xs sm:text-sm font-bold tracking-wider uppercase w-max">
                {slide.subtitle}
              </span>
              <h1 className="text-display font-bold text-3xl sm:text-5xl md:text-6xl text-white leading-tight max-w-4xl tracking-tight">
                {slide.title}
              </h1>
              <p className="text-slate-300 text-sm sm:text-lg max-w-2xl font-normal leading-relaxed">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => setCurrentView(slide.ctaView)}
                  className="bg-amber-500 text-indigo-950 hover:bg-amber-400 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 text-sm uppercase tracking-wider"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentView("notices")}
                  className="bg-white/10 text-white hover:bg-white/20 font-bold px-6 py-3.5 rounded-xl transition border border-white/30 text-sm uppercase tracking-wider"
                >
                  Latest Announcements
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-35 flex space-x-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "bg-amber-500 w-8" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Counter Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-100">
          <div className="flex flex-col items-center justify-center p-4 text-center border-r border-slate-100 last:border-0">
            <div className="p-3 bg-indigo-50 text-indigo-900 rounded-2xl mb-3">
              <Eye className="w-6 h-6 text-indigo-800" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-display text-indigo-950">
              {stats.visitorCount}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase mt-1">Total Visitors</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 text-center md:border-r border-slate-100">
            <div className="p-3 bg-amber-50 text-amber-900 rounded-2xl mb-3">
              <BookOpen className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-display text-indigo-950">
              {stats.totalAdmissions}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase mt-1">Admissions Filed</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 text-center border-r border-slate-100">
            <div className="p-3 bg-emerald-50 text-emerald-900 rounded-2xl mb-3">
              <Bell className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-display text-indigo-950">
              {stats.activeNotices}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase mt-1">Active Notices</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="p-3 bg-purple-50 text-purple-900 rounded-2xl mb-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-display text-indigo-950">
              {stats.totalStudents}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase mt-1">Enrolled Pupils</span>
          </div>
        </div>
      </section>

      {/* Grid: Notice Board & Event Calendar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Notice Board Column */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-red-50 p-2.5 rounded-xl text-red-600">
                  <Bell className="w-5 h-5 animate-bounce" />
                </div>
                <h2 className="text-display font-bold text-2xl text-indigo-950">Notice Board</h2>
              </div>
              <button
                onClick={() => setCurrentView("notices")}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-950 flex items-center space-x-1 uppercase tracking-wider"
              >
                <span>View Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {notices.length === 0 ? (
                <p className="text-sm text-slate-500 italic py-6">No recent notices available.</p>
              ) : (
                notices.map((notice) => (
                  <div
                    key={notice.id}
                    className={`p-4 rounded-2xl border transition-all hover:shadow-sm ${
                      notice.isUrgent
                        ? "bg-red-50/50 border-red-100"
                        : "bg-slate-50/50 border-slate-100 hover:border-indigo-100"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        notice.category === "Admission" ? "bg-amber-100 text-amber-800" :
                        notice.category === "Academic" ? "bg-indigo-100 text-indigo-800" :
                        notice.category === "Event" ? "bg-purple-100 text-purple-800" :
                        "bg-slate-200 text-slate-800"
                      }`}>
                        {notice.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{notice.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 mt-2 text-base leading-snug">
                      {notice.isUrgent && <span className="text-red-600 mr-1.5">[Urgent]</span>}
                      {notice.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-1.5 line-clamp-2 leading-relaxed">
                      {notice.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 bg-amber-50/50 p-4 rounded-2xl flex items-center justify-between border-dashed border-amber-200">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-100 p-2 rounded-xl text-amber-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Ready to Apply?</p>
                <p className="text-xs text-slate-600">Secure your seat for session 2026-27 online today.</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView("admission")}
              className="bg-indigo-950 text-white hover:bg-indigo-900 px-4 py-2 rounded-lg text-xs font-bold uppercase transition shadow-sm"
            >
              Apply Form
            </button>
          </div>
        </div>

        {/* Mini Event Calendar Column */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-700">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-display font-bold text-2xl text-indigo-950">Upcoming Events</h2>
          </div>

          <div className="space-y-4">
            {events.length === 0 ? (
              <p className="text-sm text-slate-500 italic py-6">No scheduled events at the moment.</p>
            ) : (
              events.map((evt) => {
                const dateParts = evt.date.split("-");
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const month = dateParts[1] ? monthNames[parseInt(dateParts[1]) - 1] : "Date";
                const day = dateParts[2] || "01";

                return (
                  <div key={evt.id} className="flex items-start space-x-4 p-3 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                    {/* Date Badge */}
                    <div className="flex flex-col items-center justify-center bg-indigo-900 text-white w-14 h-14 rounded-xl shadow-inner shrink-0">
                      <span className="text-xs font-bold uppercase tracking-wide leading-none">{month}</span>
                      <span className="text-lg font-display font-bold leading-none mt-1">{day}</span>
                    </div>
                    {/* Event Info */}
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight hover:text-indigo-900 transition cursor-pointer">
                        {evt.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{evt.description}</p>
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-semibold mt-1.5 uppercase font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{evt.time || "All Day"}</span>
                        <span>&bull;</span>
                        <span>{evt.location || "Campus"}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Special Principal Desk Card */}
          <div className="mt-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start space-x-3">
            <div className="bg-white p-1 rounded-full border shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=40&h=40&q=80"
                alt="Principal Portrait"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] font-bold text-amber-700 tracking-wider uppercase font-mono">Principal Message</p>
              <p className="text-xs text-slate-600 mt-1 italic leading-relaxed">
                "Welcome to NNIC. Our legacy of 75 years guides us to build intellectual clarity and strong ethical discipline."
              </p>
              <p className="text-[10px] font-bold text-indigo-950 mt-1.5">— Dr. Sila Roy, Principal</p>
            </div>
          </div>

        </div>
      </section>

      {/* Board Toppers Section */}
      <section className="bg-indigo-950 py-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-900 rounded-full filter blur-3xl opacity-20 -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl opacity-10 -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="bg-amber-500 text-indigo-950 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
              Academic Hall of Fame
            </span>
            <h2 className="text-display font-bold text-3xl sm:text-4xl text-white mt-4">
              Our Outstanding UP Board Toppers
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Saluting the exceptional intellect, dedication, and diligence of our students in the board exams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {toppers.map((topper, idx) => (
              <div
                key={idx}
                className="bg-indigo-900/60 backdrop-blur-sm border border-indigo-800 p-6 rounded-3xl flex flex-col items-center text-center transition hover:border-amber-400 group"
              >
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-amber-500 rounded-full scale-105 group-hover:scale-110 transition duration-300 opacity-80" />
                  <img
                    src={topper.image}
                    alt={topper.name}
                    className="w-24 h-24 rounded-full object-cover relative z-10 border-2 border-indigo-900"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 text-indigo-950 rounded-full p-1.5 z-20">
                    <Trophy className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-xl text-white group-hover:text-amber-400 transition">
                  {topper.name}
                </h3>
                <p className="text-amber-500 font-semibold text-lg mt-1 tracking-wider">{topper.score}</p>
                <p className="text-xs text-slate-300 mt-1 font-medium">{topper.class}</p>
                <span className="mt-3 inline-block bg-indigo-950/80 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-slate-200 uppercase border border-indigo-800">
                  {topper.rank}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Nagar Nigam Inter College Details Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6 sm:p-8 overflow-hidden">
          <div className="border-b border-slate-100 pb-5 mb-6">
            <span className="text-amber-600 text-xs font-bold tracking-wider uppercase">Registry & Profile Details</span>
            <h2 className="text-display font-bold text-2xl text-indigo-950 mt-1">Official School Directory</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Table block */}
            <div className="lg:col-span-3 overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <tbody>
                  <tr className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 font-semibold text-indigo-950 w-1/3">Affiliation</td>
                    <td className="py-3 text-slate-600">Uttar Pradesh Board (UP Board, Prayagraj)</td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 font-semibold text-indigo-950">Source Status</td>
                    <td className="py-3 text-slate-600">State Government Aided Institution</td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 font-semibold text-indigo-950">Address Location</td>
                    <td className="py-3 text-slate-600">Purani Mandi Road, Taj Ganj, Agra, Uttar Pradesh</td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 font-semibold text-indigo-950">Educational Type</td>
                    <td className="py-3 text-slate-600">Co-educational (Boys & Girls)</td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 font-semibold text-indigo-950">Established</td>
                    <td className="py-3 text-slate-600">Year 1949 (Over 75 Years of Legacy)</td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 font-semibold text-indigo-950">Contact Helplines</td>
                    <td className="py-3 text-slate-600">+91 98370 89745 / +91 98970 01607</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 font-semibold text-indigo-950">Official Email</td>
                    <td className="py-3 text-indigo-600 font-semibold">nnictajganjagra@gmail.com</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Visual Card Block */}
            <div className="lg:col-span-2 bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-col justify-between h-full space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-indigo-900 bg-indigo-100/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Heritage Campus
                </span>
                <h3 className="text-display font-bold text-xl text-indigo-950">Located Near Taj Mahal</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Our historic campus is nestled in Taj Ganj, catering to families in the historic district of Agra. We bridge classical discipline with technological development.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>D-DISE CODE: 09150109903</span>
                <span>UP BOARD CODE: 1045</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
