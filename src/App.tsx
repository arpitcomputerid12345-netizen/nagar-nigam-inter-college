/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import AcademicsView from "./components/AcademicsView";
import AdmissionView from "./components/AdmissionView";
import FacultyView from "./components/FacultyView";
import GalleryView from "./components/GalleryView";
import DownloadsView from "./components/DownloadsView";
import ContactView from "./components/ContactView";
import NoticesView from "./components/NoticesView";
import DashboardStudent from "./components/DashboardStudent";
import DashboardTeacher from "./components/DashboardTeacher";
import Footer from "./components/Footer";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("home");
  const [user, setUser] = useState<any>(null);
  
  const [stats, setStats] = useState({
    visitorCount: 1423,
    totalAdmissions: 2,
    activeNotices: 5,
    totalStudents: 1250
  });

  // Fetch stats initially
  const fetchStats = () => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log("Failed to load visitor stats", err));
  };

  useEffect(() => {
    fetchStats();
  }, [currentView]);

  const incrementVisitor = () => {
    fetch("/api/stats/visit", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats((prev) => ({ ...prev, visitorCount: data.visitorCount }));
        }
      })
      .catch((err) => console.log("Failed to increment visitor stats", err));
  };

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <HomeView setCurrentView={setCurrentView} stats={stats} incrementVisitor={incrementVisitor} />;
      case "about":
        return <AboutView />;
      case "academics":
        return <AcademicsView />;
      case "admission":
        return <AdmissionView />;
      case "faculty":
        return <FacultyView />;
      case "gallery":
        return <GalleryView />;
      case "downloads":
        return <DownloadsView />;
      case "notices":
        return <NoticesView />;
      case "contact":
        return <ContactView setUser={setUser} setCurrentView={setCurrentView} />;
      case "student-dashboard":
        return user && user.role === "student" ? (
          <DashboardStudent user={user} />
        ) : (
          <ContactView setUser={setUser} setCurrentView={setCurrentView} />
        );
      case "teacher-dashboard":
        return user && user.role === "teacher" ? (
          <DashboardTeacher />
        ) : (
          <ContactView setUser={setUser} setCurrentView={setCurrentView} />
        );
      default:
        return <HomeView setCurrentView={setCurrentView} stats={stats} incrementVisitor={incrementVisitor} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <Navbar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          user={user} 
          setUser={setUser} 
        />

        {/* Dynamic Route View Content with Slide/Fade Animation */}
        <main className="w-full relative overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer Block */}
      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}
