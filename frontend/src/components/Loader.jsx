import React from "react";

const Loader = ({ label = "Loading" }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 text-cream/60">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-cream/20 border-t-gold" />
    <p className="text-sm">{label}…</p>
  </div>
);

export default Loader;
