import React from "react";
import { User, Award, CheckCircle, FileText, Calendar, CreditCard, Clock, Activity, AlertCircle } from "lucide-react";

interface DashboardStudentProps {
  user: {
    name: string;
    role: string;
    rollNumber: string;
    classApplied: string;
    status: string;
  };
}

export default function DashboardStudent({ user }: DashboardStudentProps) {
  // Mock Student Performance metrics
  const attendancePercentage = 84.6;
  
  const reportCard = [
    { subject: "General Hindi", maxMarks: 100, passingMarks: 33, obtainedMarks: 82, status: "Pass" },
    { subject: "English Core", maxMarks: 100, passingMarks: 33, obtainedMarks: 78, status: "Pass" },
    { subject: "Physics (Theory + Lab)", maxMarks: 100, passingMarks: 33, obtainedMarks: 88, status: "Pass" },
    { subject: "Chemistry (Theory + Lab)", maxMarks: 100, passingMarks: 33, obtainedMarks: 85, status: "Pass" },
    { subject: "Mathematics / Biology", maxMarks: 100, passingMarks: 33, obtainedMarks: 91, status: "Pass" },
  ];

  const totalMarks = reportCard.reduce((sum, item) => sum + item.obtainedMarks, 0);
  const totalMax = reportCard.length * 100;
  const averagePercentage = (totalMarks / totalMax) * 100;

  const mockFees = [
    { name: "First Quarterly Registration Fee", amount: "₹450", dueBy: "2026-07-15", status: "Paid" },
    { name: "Science Practical Lab Asset Charge", amount: "₹200", dueBy: "2026-08-01", status: "Due" },
    { name: "UPMSP Board Exam Registration Fee", amount: "₹600", dueBy: "2026-09-10", status: "Due" },
  ];

  const handleFeePayment = (feeName: string, amt: string) => {
    alert(`Initiating simulated payment of ${amt} for "${feeName}"...\nConnecting to Bank... Secure payment successful!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Dashboard Welcome Header */}
      <section className="bg-indigo-950 text-white p-6 sm:p-10 rounded-3xl relative overflow-hidden shadow">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-900 rounded-full filter blur-3xl opacity-30 -mr-10 -mt-10" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-amber-500 text-indigo-950 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
              Student Portal Dashboard
            </span>
            <h1 className="text-display font-bold text-3xl sm:text-4xl text-white mt-2">
              Welcome, {user.name}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">
              Class Stream: {user.classApplied} &bull; Registration Number: {user.rollNumber}
            </p>
          </div>
          <div className="bg-white/10 border border-white/20 px-6 py-4 rounded-2xl shrink-0 flex items-center space-x-3">
            <div className="p-2 bg-amber-500 rounded-xl text-indigo-950"><Award className="w-5 h-5" /></div>
            <div>
              <span className="block text-[10px] text-slate-300 font-bold uppercase">Screening Status</span>
              <span className="block font-bold text-sm text-white uppercase tracking-wider">{user.status}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Quick Performance Widgets */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Attendance Widget */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg text-indigo-950 flex items-center space-x-2">
              <Activity className="w-5 h-5 text-indigo-700" />
              <span>Attendance Track</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Academic Term 2026</span>
          </div>

          <div className="py-6 flex flex-col items-center justify-center relative">
            {/* Visual Attendance circle */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 border-[10px] border-slate-100 rounded-full" />
              <div 
                className="absolute inset-0 border-[10px] border-emerald-500 rounded-full rotate-[120deg]" 
                style={{ clipPath: "polygon(50% 50%, -50% -50%, 150% -50%, 150% 150%, -50% 150%)" }}
              />
              <div className="text-center z-10">
                <span className="text-2xl font-bold text-indigo-950 font-display">{attendancePercentage}%</span>
                <span className="block text-[10px] text-slate-400 font-bold uppercase mt-0.5">Verified</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-center text-xs font-semibold border border-emerald-100">
            Excellent! Your attendance is above the state mandated 75% limit.
          </div>
        </div>

        {/* Report Summary Widget */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg text-indigo-950 flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Performance Core</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Quarterly Drills</span>
          </div>

          <div className="py-6 text-center space-y-2">
            <span className="text-4xl sm:text-5xl font-display font-bold text-indigo-950">{averagePercentage.toFixed(1)}%</span>
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-widest">Average Marks Percentage</span>
            <div className="flex items-center justify-center space-x-1.5 text-xs text-slate-500 mt-2 font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Result: First Division (Distinction)</span>
            </div>
          </div>

          <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-100/60 text-center text-xs text-amber-800 font-semibold flex items-center justify-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Next examinations scheduled for mid-November.</span>
          </div>
        </div>

        {/* Fee Management Widget */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg text-indigo-950 flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-indigo-700" />
              <span>Fidelity & Fees</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Portal Fee-Desk</span>
          </div>

          <div className="space-y-3 my-4">
            {mockFees.map((fee, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-50 hover:bg-slate-50 transition">
                <div>
                  <span className="block font-bold text-indigo-950 text-xs">{fee.name}</span>
                  <span className="block text-[9px] text-slate-400 font-semibold uppercase mt-0.5">Due: {fee.dueBy}</span>
                </div>
                <div className="text-right flex items-center space-x-2">
                  <span className="font-bold text-slate-700 text-xs">{fee.amount}</span>
                  {fee.status === "Paid" ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">Paid</span>
                  ) : (
                    <button
                      onClick={() => handleFeePayment(fee.name, fee.amount)}
                      className="bg-indigo-950 text-amber-400 hover:bg-indigo-900 text-[9px] px-2.5 py-1 rounded font-bold uppercase transition shadow-sm"
                    >
                      Pay
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-slate-400 italic text-center leading-relaxed">
            All portal transactions are secured and backed up in real-time.
          </p>
        </div>

      </section>

      {/* Report Card Detailed Sheet */}
      <section className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <h3 className="font-display font-bold text-xl text-indigo-950 flex items-center space-x-2.5">
            <FileText className="w-5.5 h-5.5 text-indigo-700" />
            <span>Verified Quarterly Evaluation Progress Report</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">Nagar Nigam Inter College Registry Desk &bull; Affiliated to UP Board Prayagraj</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Subject Stream</th>
                <th className="px-6 py-4">Maximum Score</th>
                <th className="px-6 py-4">Passing Score</th>
                <th className="px-6 py-4">Obtained Score</th>
                <th className="px-6 py-4 text-right">Result status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs sm:text-sm text-indigo-950">
              {reportCard.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/40">
                  <td className="px-6 py-4 font-bold">{item.subject}</td>
                  <td className="px-6 py-4 font-mono text-xs">{item.maxMarks}</td>
                  <td className="px-6 py-4 font-mono text-xs">{item.passingMarks}</td>
                  <td className="px-6 py-4 font-mono font-bold text-sm text-indigo-900">{item.obtainedMarks}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {/* Totals row */}
              <tr className="bg-indigo-50/50 font-bold text-indigo-950">
                <td className="px-6 py-4 uppercase">Total Aggregations</td>
                <td className="px-6 py-4 font-mono text-xs">{totalMax}</td>
                <td className="px-6 py-4">N/A</td>
                <td className="px-6 py-4 font-mono text-base text-indigo-900">{totalMarks}</td>
                <td className="px-6 py-4 text-right uppercase tracking-wider text-xs">PASSED ( {averagePercentage.toFixed(1)}% )</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
