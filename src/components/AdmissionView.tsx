import React, { useState } from "react";
import { Send, FileSearch, Check, AlertCircle, PhoneCall, HelpCircle, Loader2 } from "lucide-react";

export default function AdmissionView() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    classApplied: "Class XI (Science)",
    gender: "Male",
    dob: "",
    phone: "",
    email: "",
    previousSchool: "",
    marksPercentage: "",
    address: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any>(null);
  const [formError, setFormError] = useState("");

  // Status Tracker State
  const [trackId, setTrackId] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [trackingError, setTrackingError] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  const classesList = [
    "Class VI", "Class VII", "Class VIII", "Class IX", 
    "Class X", "Class XI (Science)", "Class XI (Commerce)", 
    "Class XII (Science)", "Class XII (Commerce)"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    setSubmissionSuccess(null);

    // Validation
    if (!formData.fullName || !formData.fatherName || !formData.dob || !formData.phone || !formData.marksPercentage || !formData.address) {
      setFormError("Please fill in all mandatory fields indicated by *.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit admission form");
      }

      const data = await response.json();
      setSubmissionSuccess(data);
      // Reset form
      setFormData({
        fullName: "",
        fatherName: "",
        classApplied: "Class XI (Science)",
        gender: "Male",
        dob: "",
        phone: "",
        email: "",
        previousSchool: "",
        marksPercentage: "",
        address: ""
      });
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingError("");
    setTrackingResult(null);
    setIsTracking(true);

    if (!trackId.trim()) {
      setTrackingError("Please enter a valid Application ID.");
      setIsTracking(false);
      return;
    }

    try {
      const response = await fetch(`/api/admissions/status?application_id=${encodeURIComponent(trackId.trim())}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Application ID not found in database. Double-check your ID (e.g. APP1001).");
        }
        throw new Error("Could not retrieve application status.");
      }
      const data = await response.json();
      setTrackingResult(data);
    } catch (err: any) {
      setTrackingError(err.message || "An unexpected error occurred.");
    } finally {
      setIsTracking(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
          Admissions 2026-27
        </span>
        <h1 className="text-display font-bold text-3xl sm:text-4xl md:text-5xl text-indigo-950 mt-4">
          Online Admission Registration
        </h1>
        <p className="text-slate-600 text-sm sm:text-lg mt-3">
          Submit your educational portfolio details and track your application screening progress live.
        </p>
      </section>

      {/* Grid: Registration Form and Status Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Application Form Column */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-10 rounded-3xl shadow-md border border-slate-100 space-y-8">
          <div>
            <h2 className="text-display font-bold text-2xl text-indigo-950">Online Registration Form</h2>
            <p className="text-slate-400 text-xs mt-1">Nagar Nigam Inter College Registration Desk • Co-educational Secondary Programs</p>
          </div>

          {submissionSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 sm:p-8 rounded-2xl text-center space-y-4">
              <div className="bg-emerald-500 text-white p-3 rounded-full w-max mx-auto shadow-md">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-2xl text-emerald-950">Registration Submitted!</h3>
              <p className="text-slate-700 text-sm max-w-md mx-auto leading-relaxed">
                Congratulations! The registration for <strong>{submissionSuccess.fullName}</strong> was received successfully.
              </p>
              
              <div className="bg-white border border-emerald-100 p-4 rounded-xl shadow-inner max-w-sm mx-auto space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Your Application Tracking ID</span>
                <span className="text-2xl font-mono font-bold text-indigo-950 tracking-widest">{submissionSuccess.id}</span>
              </div>

              <div className="text-xs text-slate-500 max-w-md mx-auto pt-2 space-y-1">
                <p>&bull; Write down this ID to track your application status anytime.</p>
                <p>&bull; Submit original transfers, marksheets, and birth proofs at the school main office for verification.</p>
              </div>

              <button
                onClick={() => setSubmissionSuccess(null)}
                className="bg-indigo-950 text-amber-500 px-6 py-2.5 rounded-xl text-sm font-bold shadow hover:bg-indigo-900 transition-all uppercase"
              >
                Submit New Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {formError && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start space-x-3 text-red-800 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-1">1. Student Details</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Student's Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Saurabh Mishra"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Father's Full Name *</label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Chandra Mishra"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Gender *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Class & Academic Details */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-1">2. Academic Stream Selection</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Class Applied For *</label>
                    <select
                      name="classApplied"
                      value={formData.classApplied}
                      onChange={handleInputChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                      required
                    >
                      {classesList.map((cls, idx) => (
                        <option key={idx} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Marks in Qualifying Exam (%) *</label>
                    <input
                      type="number"
                      name="marksPercentage"
                      value={formData.marksPercentage}
                      onChange={handleInputChange}
                      placeholder="e.g. 84.5"
                      step="0.01"
                      min="0"
                      max="100"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Previous School Attended</label>
                    <input
                      type="text"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleInputChange}
                      placeholder="Previous School Name"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. guardian@example.com"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Complete Address */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b pb-1">3. Contact Address</h3>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Complete Residential Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House No, Ward No, Locality, Taj Ganj, Agra"
                    rows={3}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Submission Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-950 text-amber-500 hover:bg-indigo-900 font-bold py-4 rounded-xl shadow transition duration-200 uppercase tracking-wider flex items-center justify-center space-x-2 text-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Submission...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Secure Application</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Live Application Status Tracker Column */}
        <div className="space-y-8 lg:col-span-1">
          
          <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-50 p-2 rounded-lg text-indigo-700">
                <FileSearch className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-indigo-950">Track Registration</h3>
            </div>
            <p className="text-xs text-slate-400">Enter your generated Application ID (e.g. APP1001) to search database records.</p>
            
            <form onSubmit={handleTrackStatus} className="space-y-3">
              <input
                type="text"
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder="e.g. APP1001"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm uppercase font-mono tracking-widest text-indigo-950 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={isTracking}
                className="w-full bg-indigo-950 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wide flex items-center justify-center space-x-2 hover:bg-indigo-900 transition"
              >
                {isTracking ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Fetch Application</span>}
              </button>
            </form>

            {trackingError && (
              <p className="text-xs text-red-600 font-semibold bg-red-50 p-2 rounded-lg border border-red-100">{trackingError}</p>
            )}

            {/* Tracking Results Output */}
            {trackingResult && (
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-bold uppercase font-mono">{trackingResult.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    trackingResult.status === "Approved" ? "bg-emerald-100 text-emerald-800" :
                    trackingResult.status === "Rejected" ? "bg-red-100 text-red-800" :
                    "bg-amber-100 text-amber-800"
                  }`}>
                    {trackingResult.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Student Name</span>
                  <span className="text-sm font-bold text-indigo-950 block">{trackingResult.fullName}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Class Applied</span>
                  <span className="text-xs font-semibold text-slate-600 block">{trackingResult.classApplied}</span>
                </div>

                <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Reviewer Remarks</span>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{trackingResult.remarks || "No remarks posted yet."}</p>
                </div>

                {trackingResult.status === "Approved" && (
                  <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-[10px] text-emerald-800 leading-relaxed font-semibold">
                    Congratulations! Please contact school office for payment of Admission Fees and book issuance.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Guidelines Box */}
          <div className="bg-indigo-950 text-white p-6 rounded-3xl space-y-4 shadow">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <h4 className="font-display font-bold text-base text-white">Guidelines for Admission</h4>
            </div>
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              <p><strong>Step 1:</strong> Submit the registration form online to generate an Application ID.</p>
              <p><strong>Step 2:</strong> Wait 2-3 business days for school administrative review.</p>
              <p><strong>Step 3:</strong> Present student birth proof, transfer certificate (TC), and previous class marksheet at the physical office during school hours (08:30 AM to 01:30 PM).</p>
            </div>
            <div className="pt-3 border-t border-indigo-900 flex items-center justify-between text-[11px] text-amber-400 font-semibold font-mono">
              <PhoneCall className="w-4 h-4" />
              <span>Office: 98370 89745</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
