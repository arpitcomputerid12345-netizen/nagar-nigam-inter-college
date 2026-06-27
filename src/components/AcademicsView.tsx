import React from "react";
import { BookOpen, Award, CheckCircle, FileText, Monitor, Microscope, Library, HelpCircle } from "lucide-react";

export default function AcademicsView() {
  const academicStreams = [
    {
      title: "Senior Secondary (Classes XI - XII)",
      subtitle: "Uttar Pradesh Board Intermediate Streams",
      description: "Comprehensive scientific & commercial grooming with standard theoretical training and state-mandated practical experiments.",
      streams: [
        {
          name: "Science Stream (Aided)",
          subjects: ["Physics (Theory & Practical)", "Chemistry (Theory & Practical)", "Mathematics or Biology (Practical)", "General Hindi", "English Core"]
        },
        {
          name: "Commerce Stream (Aided)",
          subjects: ["Book-keeping & Accountancy", "Business Organisation", "Commercial Economics / Math", "General Hindi", "English Core"]
        }
      ],
      bgColor: "bg-indigo-50/50 border-indigo-100"
    },
    {
      title: "High School (Classes IX - X)",
      subtitle: "UP Board Matriculation Curriculum",
      description: "Laying rigid core concepts in natural sciences, calculations, history, and linguistic expression, preceding career streamline choices.",
      streams: [
        {
          name: "General Matric Syllabus",
          subjects: ["Science (Physics/Chem/Bio)", "Mathematics", "Social Science (Hist/Civics/Geog/Econ)", "Hindi (Compulsory)", "English", "Sanskrit or Art"]
        }
      ],
      bgColor: "bg-amber-50/50 border-amber-100"
    },
    {
      title: "Middle School (Classes VI - VIII)",
      subtitle: "Basic Foundation Phase",
      description: "Developing robust cognitive habits, reading comprehension, social sciences, sports participation, and environmental ethics.",
      streams: [
        {
          name: "Foundation Syllabus",
          subjects: ["Mathematics", "General Science", "Social Studies", "Hindi & English Prose/Poetry", "Sanskrit Language", "Physical Education"]
        }
      ],
      bgColor: "bg-emerald-50/50 border-emerald-100"
    }
  ];

  const regulations = [
    "75% minimum classroom attendance is mandatory for participating in final board examinations.",
    "First quarterly tests are conducted in August, followed by Half-Yearly in November and Pre-Boards in January.",
    "Practical files and science records must be updated weekly and verified by the designated department mentors.",
    "Continuous comprehensive evaluation (CCE) weights are active for Classes VI through X as per state guidelines."
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
          Learning Framework
        </span>
        <h1 className="text-display font-bold text-3xl sm:text-4xl md:text-5xl text-indigo-950 mt-4">
          Academic Streams & Curriculum
        </h1>
        <p className="text-slate-600 text-sm sm:text-lg mt-3">
          Our co-educational streams are structured as per the curriculum regulations set by the UP Board, Prayagraj.
        </p>
      </section>

      {/* Main Streams List */}
      <section className="space-y-8">
        {academicStreams.map((stream, idx) => (
          <div key={idx} className={`p-6 sm:p-10 rounded-3xl border ${stream.bgColor} grid grid-cols-1 lg:grid-cols-3 gap-8`}>
            {/* Context block */}
            <div className="lg:col-span-1 space-y-4">
              <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest bg-white px-3 py-1 rounded-md border w-max block">
                {stream.subtitle}
              </span>
              <h2 className="text-display font-bold text-2xl text-indigo-950">{stream.title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed">{stream.description}</p>
            </div>

            {/* Stream subjects blocks */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stream.streams.map((subStream, sIdx) => (
                <div key={sIdx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-2 mb-3">
                      {subStream.name}
                    </h3>
                    <ul className="space-y-2">
                      {subStream.subjects.map((sub, subIdx) => (
                        <li key={subIdx} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Facilities/Assets row */}
      <section className="bg-slate-50 border border-slate-150 rounded-3xl p-6 sm:p-10">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest font-mono">Infrastructure</span>
          <h2 className="text-display font-bold text-2xl sm:text-3xl text-indigo-950 mt-1">Resource Centers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl text-center space-y-2 border">
            <div className="p-3 bg-indigo-50 text-indigo-900 rounded-xl w-max mx-auto"><Microscope className="w-6 h-6" /></div>
            <h4 className="font-bold text-indigo-950 text-base">Science Labs</h4>
            <p className="text-xs text-slate-400">Separate modern laboratories for Physics, Chemistry, and Biology experiments.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl text-center space-y-2 border">
            <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl w-max mx-auto"><Monitor className="w-6 h-6" /></div>
            <h4 className="font-bold text-indigo-950 text-base">Computer Lab</h4>
            <p className="text-xs text-slate-400">Broadband-connected PCs allowing basic computer courses and coding literacy.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl text-center space-y-2 border">
            <div className="p-3 bg-amber-50 text-amber-900 rounded-xl w-max mx-auto"><Library className="w-6 h-6" /></div>
            <h4 className="font-bold text-indigo-950 text-base">Rich Library</h4>
            <p className="text-xs text-slate-400">Houses textbook reserves, board reference publications, and reading desks.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl text-center space-y-2 border">
            <div className="p-3 bg-purple-50 text-purple-900 rounded-xl w-max mx-auto"><FileText className="w-6 h-6" /></div>
            <h4 className="font-bold text-indigo-950 text-base">Exam Cell</h4>
            <p className="text-xs text-slate-400">Administers internal unit evaluations, half-yearly reports, and pre-board drills.</p>
          </div>
        </div>
      </section>

      {/* Academic Guidelines */}
      <section className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100">
        <div className="flex items-center space-x-3 mb-6">
          <HelpCircle className="w-6 h-6 text-amber-600" />
          <h2 className="text-display font-bold text-2xl text-indigo-950">Academic Regulations & Code of Conduct</h2>
        </div>
        <ul className="space-y-4">
          {regulations.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              <span className="bg-indigo-900 text-amber-400 font-bold rounded-full w-6 h-6 shrink-0 flex items-center justify-center text-xs mt-0.5">
                {idx + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}
