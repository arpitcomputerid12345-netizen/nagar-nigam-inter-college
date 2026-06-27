import React, { useState, useEffect } from "react";
import { GraduationCap, Menu, X, User, LogOut, Bell, Shield } from "lucide-react";

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  user: any;
  setUser: (user: any) => void;
}

export default function Navbar({ currentView, setCurrentView, user, setUser }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tickerNotice, setTickerNotice] = useState("Admissions Open 2026-27 • Scholarship Applications Open • Board Exam Results Felicitated");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch the latest urgent notice for the ticker
  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => {
        const urgent = data.filter((n: any) => n.isUrgent);
        if (urgent.length > 0) {
          setTickerNotice(urgent.map((n: any) => n.title).join(" • "));
        }
      })
      .catch((err) => console.log("Failed to fetch ticker notices", err));
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "academics", label: "Academics" },
    { id: "admission", label: "Admissions" },
    { id: "notices", label: "Notices" },
    { id: "faculty", label: "Faculty" },
    { id: "gallery", label: "Gallery" },
    { id: "downloads", label: "Downloads" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("home");
    setIsDropdownOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md">
      {/* Top Banner Marquee */}
      <div className="w-full bg-emerald-700 text-white text-xs sm:text-sm py-2 overflow-hidden flex items-center border-b border-emerald-800">
        <div className="bg-red-600 text-white font-semibold px-3 py-0.5 mx-2 rounded-sm text-xs uppercase shrink-0 flex items-center animate-pulse">
          <Bell className="w-3.5 h-3.5 mr-1" /> Notice
        </div>
        <div className="relative w-full overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer pl-4 font-medium tracking-wide">
            {tickerNotice} &nbsp;&nbsp;&bull;&nbsp;&nbsp; {tickerNotice}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center cursor-pointer space-x-3 group"
          >
            <div className="bg-indigo-900 text-amber-500 p-2.5 rounded-xl shadow-inner group-hover:bg-amber-500 group-hover:text-indigo-950 transition-all duration-300">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <span className="block font-display font-bold text-lg sm:text-xl text-indigo-950 leading-tight tracking-tight uppercase">
                Nagar Nigam Inter College
              </span>
              <span className="block text-xs text-amber-600 font-semibold tracking-wider uppercase">
                Taj Ganj, Agra • Established 1949
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                  currentView === item.id
                    ? "bg-indigo-50 text-indigo-900 font-bold border-b-2 border-indigo-700"
                    : "text-slate-600 hover:text-indigo-900 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Portal Authentication Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-indigo-950 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-900 transition shadow"
                >
                  <User className="w-4 h-4 text-amber-400" />
                  <span>{user.name}</span>
                  <span className="bg-amber-500 text-indigo-950 text-[10px] px-1.5 py-0.5 rounded-md uppercase font-bold">
                    {user.role}
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-semibold uppercase">Logged in as</p>
                      <p className="text-sm font-bold text-indigo-950 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 italic mt-0.5">ID: {user.rollNumber || user.username}</p>
                    </div>
                    <button
                      onClick={() => handleNavClick(user.role === "teacher" ? "teacher-dashboard" : "student-dashboard")}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-900 flex items-center space-x-2"
                    >
                      <Shield className="w-4 h-4 text-indigo-600" />
                      <span>Go to Dashboard</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 border-t border-slate-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout Account</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNavClick("contact")}
                className="bg-indigo-950 text-amber-500 border-2 border-amber-500 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-500 hover:text-indigo-950 hover:border-amber-500 transition-all duration-300 shadow-md"
              >
                Portal Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {user && (
              <button
                onClick={() => handleNavClick(user.role === "teacher" ? "teacher-dashboard" : "student-dashboard")}
                className="bg-indigo-950 text-white p-2 rounded-xl"
                title="Dashboard"
              >
                <User className="w-5 h-5 text-amber-400" />
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-indigo-950 hover:bg-slate-50 rounded-lg transition"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-50 border-t border-slate-150 py-4 px-4 shadow-inner space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                currentView === item.id
                  ? "bg-indigo-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="border-t border-slate-200 pt-3 mt-3">
            {user ? (
              <div className="space-y-2">
                <div className="px-4 py-2">
                  <p className="text-xs text-slate-400 font-bold uppercase">Active User</p>
                  <p className="text-sm font-bold text-indigo-900">{user.name}</p>
                </div>
                <button
                  onClick={() => handleNavClick(user.role === "teacher" ? "teacher-dashboard" : "student-dashboard")}
                  className="w-full text-center bg-indigo-900 text-white py-2.5 rounded-lg text-sm font-semibold block"
                >
                  My Portal Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-center bg-red-50 text-red-600 border border-red-200 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick("contact")}
                className="w-full text-center bg-indigo-950 text-amber-400 border border-amber-500 py-3 rounded-lg text-base font-bold shadow"
              >
                Access Portal Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
