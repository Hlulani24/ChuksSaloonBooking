import React from "react";
import { Link } from "react-router-dom";

const About = () => (
  <div className="container-page py-16">
    <div className="grid gap-14 md:grid-cols-2 md:items-center">
      <div>
        <p className="mb-2 text-sm font-medium text-champagne">Our story</p>
        <h1 className="mb-6 font-display text-4xl leading-tight sm:text-5xl">
          Started in a spare room. Still treats you like family.
        </h1>
        <div className="space-y-4 text-cream/70 leading-relaxed">
          <p>
            CHUKS began with one chair, one mirror, and a founder who was tired of watching friends
            leave salons feeling rushed. Word travelled faster than the appointment book could keep up.
          </p>
          <p>
            Today we're a full studio covering hair, nails, skin and bridal styling — but the rule hasn't
            changed: every appointment gets your stylist's full attention, start to finish.
          </p>
          <p>
            We keep booking simple on purpose. Pick a time, tell us what you want done, and we'll hold
            your chair. That's the whole deal.
          </p>
        </div>
        <Link to="/booking" className="btn-primary mt-8 inline-flex">Book an appointment</Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="aspect-square rounded-lg border border-line bg-gradient-to-br from-mauve/25 to-surface" />
        <div className="mt-8 aspect-square rounded-lg border border-line bg-gradient-to-br from-champagne/20 to-surface" />
        <div className="aspect-square rounded-lg border border-line bg-gradient-to-br from-sage/20 to-surface" />
        <div className="mt-8 aspect-square rounded-lg border border-line bg-gradient-to-br from-mauveDark/25 to-surface" />
      </div>
    </div>
  </div>
);

export default About;
