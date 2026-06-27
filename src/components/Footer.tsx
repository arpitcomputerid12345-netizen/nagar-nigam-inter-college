import React from "react";
import { GraduationCap, Phone, Mail, MapPin, Heart } from "lucide-react";

interface FooterProps {
  setCurrentView: (view: string) => void;
}

export default function Footer({ setCurrentView }: FooterProps) {
  const handleLinkClick = (viewId: string) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: School Identity */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-white">
            <div className="bg-amber-500 text-slate-950 p-1.5 rounded-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-base uppercase leading-tight">
              Nagar Nigam Inter College
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            A premier co-educational, government-aided secondary school affiliated with the Uttar Pradesh Board. Cultivating moral clarity and academic excellence since 1949.
          </p>
          <span className="block text-[10px] font-bold font-mono text-slate-500 uppercase">
            School Code: 1045 &bull; DISE: 09150109903
          </span>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="space-y-3">
          <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider">Quick Directory</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => handleLinkClick("about")} className="hover:text-amber-500 transition">
                About School Heritage
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("academics")} className="hover:text-amber-500 transition">
                Curriculums & Streams
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("admission")} className="hover:text-amber-500 transition">
                Online Registrations
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("faculty")} className="hover:text-amber-500 transition">
                Faculty Directories
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Document links */}
        <div className="space-y-3">
          <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider">Student Room</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => handleLinkClick("notices")} className="hover:text-amber-500 transition">
                Notice Board Feeds
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("downloads")} className="hover:text-amber-500 transition">
                Syllabus & Material Downloads
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("gallery")} className="hover:text-amber-500 transition">
                Photo Snapshot Galleries
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("contact")} className="hover:text-amber-500 transition">
                Support & Contact Desk
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact details */}
        <div className="space-y-3 text-xs">
          <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider">Secretariat Location</h4>
          <ul className="space-y-2 leading-relaxed text-slate-400">
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Purani Mandi Road, Taj Ganj, Agra, Uttar Pradesh - 282001</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span>+91 98370 89745 / 98970 01607</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-amber-500 font-semibold truncate">nnictajganjagra@gmail.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest">
        <span>&copy; 2026 Nagar Nigam Inter College. All Rights Reserved.</span>
        <span className="flex items-center mt-2 sm:mt-0">
          Crafted with &nbsp;<Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />&nbsp; for Taj Ganj scholars
        </span>
      </div>
    </footer>
  );
}
