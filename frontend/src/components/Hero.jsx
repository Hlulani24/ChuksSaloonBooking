import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkle, Clock, Scissors, CalendarCheck } from "lucide-react";

const formatPrice = (n) => `R${Number(n).toFixed(2)}`;
const formatDuration = (mins) =>
  mins >= 60 ? `${Math.floor(mins / 60)}h${mins % 60 ? ` ${mins % 60}m` : ""}` : `${mins} min`;

// Right-hand feature card: renders the salon's real top offer (with its real photo,
// if the admin has uploaded one), a tasteful fallback when there's a special but no
// photo yet, or a generic booking prompt when nothing is on special right now.
const FeatureCard = ({ featured, loading }) => {
  if (loading) {
    return (
      <div className="relative h-full min-h-[360px] animate-pulse overflow-hidden rounded-lg border border-line bg-surface" />
    );
  }

  if (!featured) {
    return (
      <div className="relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-lg border border-line bg-surface p-7">
        <div>
          <p className="mb-1 flex items-center gap-1.5 text-sm text-cream/50">
            <CalendarCheck size={14} /> Ready when you are
          </p>
          <h3 className="font-display text-3xl">Your next appointment, booked in a minute</h3>
        </div>
        <p className="text-sm text-cream/60">
          No card needed to reserve — we'll confirm by email and WhatsApp.
        </p>
        <Link to="/services" className="btn-outline mt-2 self-start !px-5 !py-2.5 text-sm">
          Browse services
        </Link>
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-mauve/10 blur-2xl" />
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-lg border border-line bg-surface p-7">
      {featured.image ? (
        <>
          <img
            src={featured.image}
            alt={featured.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-noir/10" />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-mauve/25 to-noir text-cream/15">
          <Scissors size={64} />
        </div>
      )}

      <p className="relative z-10 mb-1 text-sm text-cream/70">Limited offer</p>
      <div className="relative z-10 flex flex-1 flex-col justify-end gap-4">
        <h3 className="font-display text-3xl leading-tight">{featured.name}</h3>
        <div className="flex items-end justify-between">
          <div>
            {featured.originalPrice ? (
              <div className="text-sm text-cream/50 line-through">{formatPrice(featured.originalPrice)}</div>
            ) : null}
            <div className="font-display text-4xl text-champagne">{formatPrice(featured.price)}</div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-cream/20 bg-noir/40 px-3 py-1.5 text-xs text-cream/70">
            <Clock size={13} /> {formatDuration(featured.durationMinutes)}
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ featured = null, loading = false }) => (
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
        <FeatureCard featured={featured} loading={loading} />
      </div>
    </div>
  </section>
);

export default Hero;
