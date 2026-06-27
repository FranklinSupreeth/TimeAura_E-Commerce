import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Linkedin, 
  Globe, 
  MapPin, 
  Clock, 
  Mail, 
  Phone 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 border-t border-zinc-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Brand & Location */}
          <div className="space-y-6">
            <h2 className="text-xl font-serif tracking-widest uppercase text-zinc-900">TimeAura</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-zinc-500 hover:text-black transition-colors">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <p className="text-xs leading-relaxed uppercase tracking-wider">
                  Heritage House, 4th Floor<br />
                  Lavelle Road, Bengaluru<br />
                  Karnataka 560001
                </p>
              </div>
              <div className="flex items-center gap-3 text-zinc-500">
                <Phone size={16} />
                <p className="text-xs tracking-widest">+91 80 4567 8900</p>
              </div>
            </div>
          </div>

          {/* Column 2: Timings */}
          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400">Atelier Hours</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-zinc-500">
                <Clock size={18} className="mt-0.5" />
                <div className="text-[10px] uppercase tracking-widest space-y-2">
                  <p className="flex justify-between gap-4"><span>Mon — Fri</span> <span>10:00 — 19:00</span></p>
                  <p className="flex justify-between gap-4"><span>Saturday</span> <span>11:00 — 17:00</span></p>
                  <p className="flex justify-between gap-4 text-zinc-300"><span>Sunday</span> <span>By Appointment</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-black transition-colors">Collection</Link></li>
              <li><Link to="/cart" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-black transition-colors">Your Bag</Link></li>
              <li><a href="#" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-black transition-colors">Watch Care</a></li>
              <li><a href="#" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-black transition-colors">Shipping Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Curators (Developers) */}
          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400">The Curators</h3>
            <div className="space-y-6">
              {/* Developer 1 */}
              <div className="group">
                <p className="text-xs uppercase tracking-widest font-bold text-zinc-900 mb-2">Franklin Supreeth</p>
                <div className="flex gap-4 text-zinc-400">
                  <a href="#" className="hover:text-black transition-colors"><Linkedin size={16} /></a>
                  <a href="#" className="hover:text-black transition-colors"><Instagram size={16} /></a>
                  <a href="#" className="hover:text-black transition-colors"><Globe size={16} /></a>
                </div>
              </div>
              {/* Developer 2 */}
              <div className="group">
                <p className="text-xs uppercase tracking-widest font-bold text-zinc-900 mb-2">Sanjana</p>
                <div className="flex gap-4 text-zinc-400">
                  <a href="#" className="hover:text-black transition-colors"><Linkedin size={16} /></a>
                  <a href="#" className="hover:text-black transition-colors"><Instagram size={16} /></a>
                  <a href="#" className="hover:text-black transition-colors"><Globe size={16} /></a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400">
            © {currentYear} TimeAura Horology India. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 hover:text-black">Privacy</a>
            <a href="#" className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 hover:text-black">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;