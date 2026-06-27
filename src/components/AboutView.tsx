import React from "react";
import { Award, Compass, Heart, History, BookOpen, MapPin } from "lucide-react";

export default function AboutView() {
  const highlights = [
    {
      icon: <History className="w-6 h-6 text-indigo-700" />,
      title: "Rich History (Est. 1949)",
      description: "Founded in the post-independence era to provide quality, accessible secondary education to Agra's historic Taj Ganj neighborhood."
    },
    {
      icon: <Award className="w-6 h-6 text-amber-600" />,
      title: "UP Board Affiliation",
      description: "Affiliated with the Board of High School and Intermediate Education, Uttar Pradesh. Continuously yielding high performance."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
      title: "Co-educational Legacy",
      description: "Nurturing co-educational synergy in high school and intermediate programs, preparing young boys and girls as equal citizens."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
          Who We Are
        </span>
        <h1 className="text-display font-bold text-3xl sm:text-4xl md:text-5xl text-indigo-950 mt-4">
          About Nagar Nigam Inter College
        </h1>
        <p className="text-slate-600 text-sm sm:text-lg mt-3 leading-relaxed">
          Celebrating over 75 years of academic stewardship, moral grooming, and intellectual growth in Agra Division.
        </p>
      </section>

      {/* Main Narrative & Values */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-display font-bold text-2xl sm:text-3xl text-indigo-950">
            Our Journey of Over Seven Decades
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Established in <strong>1949</strong>, Nagar Nigam Inter College was instituted with a deep-seated mission: to establish high-integrity, co-educational learning paths for Agra's community. Originally launched as a local school, it expanded rapidly through official recognition and governmental support.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            As a <strong>government-aided institution</strong>, we maintain minimal, community-friendly fee structures while housing highly qualified staff selected via standard state commissions. Generations of Agra's scholars have walked our historic corridors, going on to serve in civil, corporate, academic, and industrial sectors across India and the globe.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
              <span className="font-bold text-indigo-950 block text-base">Our Mission</span>
              <span className="text-xs text-slate-500 mt-1 block leading-relaxed">
                To dispense high-caliber, affordable instruction, sharpening character, civic obedience, and cognitive capacity.
              </span>
            </div>
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
              <span className="font-bold text-amber-900 block text-base">Our Vision</span>
              <span className="text-xs text-slate-500 mt-1 block leading-relaxed">
                To transform students into critical thinkers and innovative contributors, anchoring secular harmony.
              </span>
            </div>
          </div>
        </div>

        {/* Heritage Image Frame */}
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-900 rounded-3xl translate-x-4 translate-y-4 -z-10 opacity-10" />
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
            alt="School Heritage Building"
            className="w-full h-[400px] object-cover rounded-3xl shadow-lg border border-slate-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 shadow flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <span className="block font-bold text-xs text-indigo-950 uppercase">Agra, Uttar Pradesh</span>
                <span className="block text-[10px] text-slate-500">Located near Purani Mandi Road</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100/60 px-2 rounded font-mono">CODE: 1045</span>
          </div>
        </div>
      </section>

      {/* Legacy Highlights Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-3">
            <div className="p-3 bg-slate-50 rounded-2xl w-max">{item.icon}</div>
            <h3 className="font-display font-bold text-lg text-indigo-950">{item.title}</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </section>

      {/* Leadership Messaging Row */}
      <section className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10">
        <div className="border-b border-slate-200 pb-5 mb-8 text-center sm:text-left">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest font-mono">Leadership Desk</span>
          <h2 className="text-display font-bold text-2xl sm:text-3xl text-indigo-950 mt-1">Steward Messages</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Principal message card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <p className="text-slate-600 text-sm italic leading-relaxed">
              "Educational rigor is not merely about syllabus retention. It is about instilling deep analytical focus, standard human empathy, and creative confidence. Over the years, Nagar Nigam Inter College has served as a beacon of growth for families in Agra. Our UP board record reflects our meticulous care."
            </p>
            <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=60&h=60&q=80"
                alt="Principal Portrait"
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <span className="block font-bold text-indigo-950 text-sm">Dr. Sila Roy</span>
                <span className="block text-xs text-slate-400 font-medium">Principal & Academic Head</span>
              </div>
            </div>
          </div>

          {/* Manager message card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <p className="text-slate-600 text-sm italic leading-relaxed">
              "We strive to upgrade our school infrastructure dynamically—improving science laboratories, expanding high-speed computer setups, and delivering free post-matric counseling. We work continuously with the state authorities to maintain standard learning quality at completely democratic and affordable budgets."
            </p>
            <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=60&h=60&q=80"
                alt="Manager Portrait"
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <span className="block font-bold text-indigo-950 text-sm">Shri Alok Sharma</span>
                <span className="block text-xs text-slate-400 font-medium">Manager & Administrative Board</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
