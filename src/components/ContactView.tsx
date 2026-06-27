import React, { useState } from "react";
import { Send, MapPin, Phone, Mail, ShieldAlert, Key, Loader2, Sparkles, CheckCircle, GraduationCap } from "lucide-react";

interface ContactViewProps {
  setUser: (user: any) => void;
  setCurrentView: (view: string) => void;
}

export default function ContactView({ setUser, setCurrentView }: ContactViewProps) {
  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSending, setIsSending] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Portal Login Form State
  const [loginRole, setLoginRole] = useState<'student' | 'teacher'>('student');
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert("Please fill in mandatory fields.");
      return;
    }
    setIsSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm)
      });
      if (res.ok) {
        setContactSuccess(true);
        setContactForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      console.log("Failed to submit contact query", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    if (!loginForm.username) {
      setLoginError("Please enter your Username / Roll Number.");
      setIsLoggingIn(false);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password,
          role: loginRole
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login authorization failed.");
      }

      // Login success
      setUser(data.user);
      if (data.user.role === "teacher") {
        setCurrentView("teacher-dashboard");
      } else {
        setCurrentView("student-dashboard");
      }
    } catch (err: any) {
      setLoginError(err.message || "Invalid credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
          Contact Desk & Login
        </span>
        <h1 className="text-display font-bold text-3xl sm:text-4xl md:text-5xl text-indigo-950 mt-4">
          Contact Details & Portal Portal Login
        </h1>
        <p className="text-slate-600 text-sm sm:text-lg mt-3">
          Reach out to the school administration desk or log in to your active student & teacher panels.
        </p>
      </section>

      {/* Grid containing contact form, info details, and portal login */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Contact Info and Queries (Col-span 2) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Info Panels grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-3">
              <div className="p-3 bg-indigo-50 text-indigo-900 rounded-2xl w-max"><Phone className="w-5 h-5" /></div>
              <h4 className="font-display font-bold text-base text-indigo-950">Helpline Calls</h4>
              <p className="text-xs sm:text-sm text-slate-500 font-mono leading-relaxed">
                +91 98370 89745 <br />
                +91 98970 01607
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-2xl w-max"><Mail className="w-5 h-5" /></div>
              <h4 className="font-display font-bold text-base text-indigo-950">Email Support</h4>
              <p className="text-xs sm:text-sm text-indigo-600 font-semibold leading-relaxed truncate">
                nnictajganjagra<br className="hidden sm:block" />@gmail.com
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-3">
              <div className="p-3 bg-amber-50 text-amber-900 rounded-2xl w-max"><MapPin className="w-5 h-5" /></div>
              <h4 className="font-display font-bold text-base text-indigo-950">School Location</h4>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Purani Mandi Road,<br />
                Taj Ganj, Agra (U.P.)
              </p>
            </div>
          </div>

          {/* Contact Form card */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-md border border-slate-100 space-y-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-indigo-950">Send a Query / Message</h3>
              <p className="text-xs text-slate-400 mt-1">If you have inquiries regarding admissions, syllabus, or school fees.</p>
            </div>

            {contactSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
                <div className="bg-emerald-500 text-white p-2.5 rounded-full w-max mx-auto"><CheckCircle className="w-6 h-6" /></div>
                <h4 className="font-display font-bold text-lg text-emerald-950">Query Sent Successfully!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for writing to us. Our school administrative desk will respond to your email coordinates soon.
                </p>
                <button
                  onClick={() => setContactSuccess(false)}
                  className="bg-indigo-950 text-white px-5 py-2 rounded-xl text-xs font-bold uppercase hover:bg-indigo-900 transition mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Coordinates *</label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="e.g. parent@gmail.com"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject Topic</label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    placeholder="e.g. Class XI Stream Vacancy Inquiry"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Detailed Message *</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="Type details of your inquiry or grievance here..."
                    rows={4}
                    className="w-full border border-slate-200 rounded-xl p-4 text-sm focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-indigo-950 text-amber-500 hover:bg-indigo-900 font-bold py-3.5 rounded-xl text-xs uppercase transition tracking-wider flex items-center justify-center space-x-2"
                >
                  {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Send Message Inquiry</span><Send className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Portal Login Frame Column (Col-span 1) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-150 space-y-6">
          <div className="flex items-center space-x-3 border-b pb-3.5">
            <div className="bg-indigo-950 text-amber-400 p-2.5 rounded-xl"><Key className="w-5 h-5" /></div>
            <div>
              <h3 className="font-display font-bold text-lg text-indigo-950">Portal Authentication</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Access student & staff rooms</p>
            </div>
          </div>

          {/* Role selection tab */}
          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
            <button
              onClick={() => { setLoginRole('student'); setLoginError(""); }}
              className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                loginRole === 'student' ? "bg-white text-indigo-950 shadow-sm" : "text-slate-500 hover:text-indigo-950"
              }`}
            >
              Student Portal
            </button>
            <button
              onClick={() => { setLoginRole('teacher'); setLoginError(""); }}
              className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                loginRole === 'teacher' ? "bg-white text-indigo-950 shadow-sm" : "text-slate-500 hover:text-indigo-950"
              }`}
            >
              Teacher Admin
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <p className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-lg border border-red-100 leading-relaxed">
                {loginError}
              </p>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                {loginRole === 'student' ? "Application ID or Roll No *" : "Admin Username *"}
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                placeholder={loginRole === 'student' ? "e.g. ROLL2026 or APP1001" : "e.g. admin"}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono uppercase tracking-widest text-indigo-950 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

            {loginRole === 'teacher' && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Account Password *</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Password keys"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-indigo-950 text-amber-500 hover:bg-indigo-900 font-bold py-3 rounded-xl text-xs uppercase tracking-wide flex items-center justify-center space-x-2 shadow-sm"
            >
              {isLoggingIn ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <GraduationCap className="w-4 h-4" />
                  <span>Authorize Entrance</span>
                </>
              )}
            </button>
          </form>

          {/* Quick tips panel for testing */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-2 text-[10px] text-amber-800 leading-relaxed font-semibold">
            <span className="uppercase tracking-widest block font-bold text-amber-900 border-b border-amber-200 pb-0.5">Testing Key Credentials</span>
            {loginRole === 'teacher' ? (
              <p>Username: <code className="bg-white px-1 py-0.5 rounded border">admin</code> <br /> Password: <code className="bg-white px-1 py-0.5 rounded border">password123</code></p>
            ) : (
              <p>Use <code className="bg-white px-1 py-0.5 rounded border">ROLL2026</code> or copy/paste any submitted Application ID (like <code className="bg-white px-1 py-0.5 rounded border">APP1001</code>).</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
