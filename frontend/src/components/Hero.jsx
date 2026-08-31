import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkle, Clock } from "lucide-react";

const Hero = () => (
  <section className="relative overflow-hidden border-b border-line">
    <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-mauve/20 blur-3xl" />
    <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-champagne/10 blur-3xl" />

    <div className="container-page relative grid gap-12 py-16 md:grid-cols-12 md:py-24">
      <div className="md:col-span-7">
        <p className="mb-5 flex items-center gap-2 text-sm font-medium text-champagne">
          <Sparkle size={16} /> Open today, 09:00 — 19:00
        </p>
        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Look good,
          <br />
          feel <span className="italic text-mauve">unstoppable</span>,
          <br />
          on your schedule.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/70">
          CHUKS is a hair, nails and beauty studio built around one idea — you shouldn't have to
          call five times to book a chair. Reserve your slot in under a minute, no card required.
        </p>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link to="/booking" className="btn-primary text-base">
            Book an appointment <ArrowRight size={18} />
          </Link>
          <Link to="/services" className="btn-outline text-base">
            See our services
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap gap-8 border-t border-line pt-8">
          <div>
            <div className="font-display text-3xl text-champagne">4.9/5</div>
            <div className="text-sm text-cream/50">from 800+ clients</div>
          </div>
          <div>
            <div className="font-display text-3xl text-champagne">6</div>
            <div className="text-sm text-cream/50">specialist stylists</div>
          </div>
          <div>
            <div className="font-display text-3xl text-champagne">30+</div>
            <div className="text-sm text-cream/50">services on offer</div>
          </div>
        </div>
      </div>

      <div className="md:col-span-5">
        <div className="relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-lg border border-line bg-surface p-7">
          <div>
            <p className="mb-1 text-sm text-cream/50">Limited offer</p>
            <h3 className="font-display text-3xl">Silk Press & Trim</h3>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-sm text-cream/40 line-through">R350.00</div>
              <div className="font-display text-4xl text-champagne">R280.00</div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-cream/60">
              <Clock size={13} /> This week only
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-mauve/10 blur-2xl" />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
