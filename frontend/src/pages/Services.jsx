import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import Loader from "../components/Loader";
import api from "../api/axios";

const CATEGORIES = ["All", "Hair", "Nails", "Skin & Facials", "Makeup", "Spa & Massage", "Bridal"];

const Services = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/services")
      .then((res) => setItems(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (category === "All" ? items : items.filter((i) => i.category === category)),
    [items, category]
  );

  const handleAdd = (service) => {
    setSelected((s) => (s.find((i) => i._id === service._id) ? s : [...s, service]));
  };

  const goToBooking = () => {
    navigate("/booking", { state: { services: selected } });
  };

  return (
    <div className="container-page py-16">
      <div className="mb-10">
        <p className="mb-2 text-sm font-medium text-champagne">Full service list</p>
        <h1 className="font-display text-4xl sm:text-5xl">What we offer</h1>
        <p className="mt-3 max-w-lg text-cream/60">
          Every service is delivered by a specialist. Tap "Add to appointment" on anything you'd like included when you book.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              category === c
                ? "border-champagne bg-champagne/10 text-champagne"
                : "border-line text-cream/60 hover:border-cream/40 hover:text-cream"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader label="Loading services" />
      ) : filtered.length === 0 ? (
        <p className="py-10 text-center text-cream/50">Nothing in this category yet — check back soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service._id} service={service} onAdd={handleAdd} />
          ))}
        </div>
      )}

      {selected.length > 0 && (
        <div className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 rounded-full border border-line bg-surface px-6 py-3 shadow-2xl">
          <span className="text-sm text-cream/70">{selected.length} service{selected.length > 1 ? "s" : ""} added</span>
          <button onClick={goToBooking} className="btn-primary !px-5 !py-2 text-sm">
            Book appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
