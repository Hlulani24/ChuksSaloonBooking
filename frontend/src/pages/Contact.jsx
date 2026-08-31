import React from "react";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const Contact = () => (
  <div className="container-page py-16">
    <div className="mb-12">
      <p className="mb-2 text-sm font-medium text-champagne">Get in touch</p>
      <h1 className="font-display text-4xl sm:text-5xl">We'd love to hear from you</h1>
    </div>

    <div className="grid gap-6 sm:grid-cols-2">
      <a href="tel:+27821234567" className="flex items-start gap-4 rounded-lg border border-line bg-surface p-6 transition-colors hover:border-champagne">
        <Phone className="mt-0.5 text-champagne" size={22} />
        <div>
          <h3 className="font-display text-lg">Call us</h3>
          <p className="mt-1 text-sm text-cream/60">+27 60 861 8775</p>
        </div>
      </a>
      <a href="https://wa.me/27608618775" target="_blank" rel="noreferrer" className="flex items-start gap-4 rounded-lg border border-line bg-surface p-6 transition-colors hover:border-champagne">
        <MessageCircle className="mt-0.5 text-champagne" size={22} />
        <div>
          <h3 className="font-display text-lg">WhatsApp</h3>
          <p className="mt-1 text-sm text-cream/60">Chat with us directly</p>
        </div>
      </a>
      <a href="mailto:hello@amarabeauty.com" className="flex items-start gap-4 rounded-lg border border-line bg-surface p-6 transition-colors hover:border-champagne">
        <Mail className="mt-0.5 text-champagne" size={22} />
        <div>
          <h3 className="font-display text-lg">Email</h3>
          <p className="mt-1 text-sm text-cream/60">malulekehlulani04@gmail.com</p>
        </div>
      </a>
      <div className="flex items-start gap-4 rounded-lg border border-line bg-surface p-6">
        <MapPin className="mt-0.5 text-champagne" size={22} />
        <div>
          <h3 className="font-display text-lg">Visit</h3>
          <p className="mt-1 text-sm text-cream/60">45 Cape Vulture Road, Johannesburg</p>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
