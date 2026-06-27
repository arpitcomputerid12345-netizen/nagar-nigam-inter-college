import React, { useState } from "react";
import { Search, Mail, Phone, BookOpen, GraduationCap, Award } from "lucide-react";
import { Teacher } from "../types";

export default function FacultyView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDept, setActiveDept] = useState<'All' | 'Senior Secondary' | 'Secondary' | 'Admin'>('All');

  const teachers: Teacher[] = [
    {
      id: "t1",
      name: "Dr. Sila Roy",
      designation: "Principal & Academic Head",
      qualification: "M.Sc., B.Ed., Ph.D. in Physics",
      subjects: ["Physics", "Educational Administration"],
      phone: "98370 89745",
      email: "nnictajganjagra@gmail.com",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
      department: "Admin"
    },
    {
      id: "t2",
      name: "Shri R. S. Pathak",
      designation: "Senior Lecturer & Vice-Principal",
      qualification: "M.A., B.Ed., M.Phil in English Literature",
      subjects: ["English Core", "English Grammar"],
      phone: "98970 01607",
      email: "pathak.nnic@gmail.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
      department: "Senior Secondary"
    },
    {
      id: "t3",
      name: "Smt. Meera Gupta",
      designation: "Lecturer in Chemistry",
      qualification: "M.Sc. in Organic Chemistry, B.Ed.",
      subjects: ["Chemistry", "Lab Practicals"],
      phone: "98370 XXXXX",
      email: "meera.gupta@nnic.in",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
      department: "Senior Secondary"
    },
    {
      id: "t4",
      name: "Shri Rajesh Dixit",
      designation: "Lecturer in Mathematics",
      qualification: "M.Sc. in Mathematics, B.Ed.",
      subjects: ["Mathematics", "Calculus"],
      phone: "98970 XXXXX",
      email: "rajesh.dixit@nnic.in",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80",
      department: "Senior Secondary"
    },
    {
      id: "t5",
      name: "Smt. Shalini Yadav",
      designation: "Assistant Teacher (Biology)",
      qualification: "M.Sc. in Zoology, B.Ed.",
      subjects: ["Biology", "Environmental Science"],
      phone: "94110 XXXXX",
      email: "shalini.yadav@nnic.in",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&h=150&q=80",
      department: "Secondary"
    },
    {
      id: "t6",
      name: "Shri Anil Kumar Verma",
      designation: "Assistant Teacher (Social Studies)",
      qualification: "M.A. in History, B.Ed.",
      subjects: ["History", "Civics & Economics"],
      phone: "98372 XXXXX",
      email: "anil.verma@nnic.in",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
      department: "Secondary"
    }
  ];

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.subjects.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeDept === 'All') return matchesSearch;
    return matchesSearch && t.department === activeDept;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
          Our Team
        </span>
        <h1 className="text-display font-bold text-3xl sm:text-4xl md:text-5xl text-indigo-950 mt-4">
          Faculty & Administrative Mentors
        </h1>
        <p className="text-slate-600 text-sm sm:text-lg mt-3">
          Highly experienced government-aided instructors guiding UP Board excellence and character development.
        </p>
      </section>

      {/* Filter and Search Controls Row */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search input */}
        <div className="relative md:w-80">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by teacher or subject..."
            className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap gap-2">
          {(['All', 'Senior Secondary', 'Secondary', 'Admin'] as const).map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition ${
                activeDept === dept
                  ? "bg-indigo-950 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {dept === 'All' ? 'All Departments' : dept}
            </button>
          ))}
        </div>
      </section>

      {/* Teachers Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTeachers.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-slate-100">
            <p className="text-sm text-slate-500 italic">No faculty members match your filters.</p>
          </div>
        ) : (
          filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden flex flex-col justify-between hover:shadow-lg transition group"
            >
              {/* Profile Card Header */}
              <div className="p-6 pb-4 flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-900 rounded-full scale-105 group-hover:scale-110 transition duration-300 opacity-10" />
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-16 h-16 rounded-full object-cover relative z-10 border border-slate-150"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-indigo-950 leading-tight">
                    {teacher.name}
                  </h3>
                  <span className="text-xs text-amber-600 font-bold block mt-0.5">{teacher.designation}</span>
                  <span className="inline-block mt-1.5 bg-indigo-50 text-indigo-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {teacher.department}
                  </span>
                </div>
              </div>

              {/* Profile Card Details */}
              <div className="px-6 py-4 border-t border-b border-slate-50 bg-slate-50/50 space-y-3">
                <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600">
                  <GraduationCap className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-700">Credentials</span>
                    <span className="text-slate-500 block leading-relaxed">{teacher.qualification}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600">
                  <BookOpen className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-slate-700">Subjects Handled</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {teacher.subjects.map((sub, sIdx) => (
                        <span key={sIdx} className="bg-white border border-slate-200 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-md">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Card Action Contacts */}
              <div className="p-4 bg-white flex items-center justify-between text-xs text-slate-400 font-semibold px-6">
                <div className="flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{teacher.phone}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate max-w-[120px]" title={teacher.email}>{teacher.email}</span>
                </div>
              </div>

            </div>
          ))
        )}
      </section>

    </div>
  );
}
