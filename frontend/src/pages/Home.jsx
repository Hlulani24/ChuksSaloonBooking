import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Mail, LayoutDashboard } from "lucide-react";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import Loader from "../components/Loader";
import api from "../api/axios";

const Home = () => {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/services")
      .then((res) => setSpecials(res.data.filter((i) => i.isSpecial).slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Hero />

      <section className="container-page py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-medium text-champagne">This week</p>
            <h2 className="font-display text-3xl sm:text-4xl">Offers worth booking for</h2>
          </div>
          <Link to="/services" className="flex items-center gap-1.5 text-sm font-medium text-cream/70 hover:text-cream">
            View all services <ArrowRight size={15} />
          </Link>
        </div>

        {loading ? (
          <Loader label="Loading offers" />
        ) : specials.length === 0 ? (
          <p className="text-cream/50">No offers running right now — check back soon, or browse the full service list.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {specials.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </section>

      <section className="border-y border-line bg-surface py-20">
        <div className="container-page grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-mauve/15 text-mauve">
              <LayoutDashboard size={20} />
            </div>
            <h3 className="font-display text-xl">Book in a minute</h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/60">
              Pick your service, stylist and time slot. No account, no card, no waiting on hold.
            </p>
          </div>
          <div>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-champagne/15 text-champagne">
              <Mail size={20} />
            </div>
            <h3 className="font-display text-xl">Instant confirmation</h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/60">
              You'll get an email the moment your appointment is confirmed, with every detail on hand.
            </p>
          </div>
          <div>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/15 text-sage">
              <MessageCircle size={20} />
            </div>
            <h3 className="font-display text-xl">Or just WhatsApp us</h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/60">
              Prefer to chat? Every booking can be confirmed straight through WhatsApp too.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl sm:text-4xl">
          Ready for your next appointment? It's two taps away.
        </h2>
        <Link to="/booking" className="btn-primary mt-8 inline-flex text-base">
          Book an appointment <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
};

export default Home;
