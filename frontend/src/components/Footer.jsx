import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-line bg-surface">
    <div className="container-page grid gap-10 py-14 md:grid-cols-4">
      <div>
        <div className="mb-3 flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mauve text-cream">
            <Sparkles size={16} />
          </span>
          <span className="font-display text-xl font-semibold">CHUKS</span>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-cream/60">
          Hair, nails, skin and bridal styling from a team that treats every chair like the only one in the room.
        </p>
      </div>

      <div>
        <h4 className="mb-3 font-display text-base">Explore</h4>
        <ul className="space-y-2 text-sm text-cream/60">
          <li><Link to="/services" className="hover:text-cream">Services</Link></li>
          <li><Link to="/booking" className="hover:text-cream">Book an appointment</Link></li>
          <li><Link to="/about" className="hover:text-cream">Our story</Link></li>
          <li><Link to="/contact" className="hover:text-cream">Contact</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="mb-3 font-display text-base">Visit</h4>
        <ul className="space-y-3 text-sm text-cream/60">
          <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-champagne" /> 45 Rivonia Road, Johannesburg</li>
          <li className="flex items-start gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-champagne" /> +27 65 376 4313</li>
          <li className="flex items-start gap-2"><Mail size={16} className="mt-0.5 shrink-0 text-champagne" /> malulekehlulani04@gmail.com.com</li>
        </ul>
      </div>

      <div>
        <h4 className="mb-3 font-display text-base">Hours</h4>
        <ul className="space-y-1.5 text-sm text-cream/60">
          <li>Mon – Fri: 09:00 – 19:00</li>
          <li>Sat: 08:00 – 17:00</li>
          <li>Sun – Mon: Closed</li>
        </ul>
        <div className="mt-4 flex gap-3">
          <a href="#" aria-label="Instagram" className="text-cream/60 hover:text-champagne"><Instagram size={18} /></a>
          <a href="#" aria-label="Facebook" className="text-cream/60 hover:text-champagne"><Facebook size={18} /></a>
        </div>
      </div>
    </div>
    <div className="border-t border-line py-5 text-center text-xs text-cream/40">
      © {new Date().getFullYear()} CHUKS Hair & Beauty. All rights reserved || Designed By Maluleke Hlulani.
    </div>
  </footer>
);

export default Footer;
