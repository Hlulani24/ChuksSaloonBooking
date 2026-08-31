import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Scissors, CalendarCheck, Clock, Sparkle } from "lucide-react";
import api from "../../api/axios";
import Loader from "../../components/Loader";

const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="rounded-lg border border-line bg-surface p-6">
    <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full ${accent}`}>
      <Icon size={18} />
    </div>
    <div className="font-display text-3xl">{value}</div>
    <div className="mt-1 text-sm text-cream/50">{label}</div>
  </div>
);

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/services"), api.get("/bookings")])
      .then(([servicesRes, bookingsRes]) => {
        setServices(servicesRes.data);
        setBookings(bookingsRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading dashboard" />;

  const pending = bookings.filter((b) => b.status === "pending");
  const offers = services.filter((s) => s.isSpecial);

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl">Overview</h1>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Scissors} label="Services" value={services.length} accent="bg-mauve/15 text-mauve" />
        <StatCard icon={Sparkle} label="Active offers" value={offers.length} accent="bg-champagne/15 text-champagne" />
        <StatCard icon={CalendarCheck} label="Total appointments" value={bookings.length} accent="bg-sage/15 text-sage" />
        <StatCard icon={Clock} label="Pending review" value={pending.length} accent="bg-mauveDark/15 text-mauveDark" />
      </div>

      <div className="mt-10 rounded-lg border border-line bg-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl">Needs your attention</h2>
          <Link to="/admin/bookings" className="text-sm text-champagne hover:underline">View all</Link>
        </div>
        {pending.length === 0 ? (
          <p className="text-sm text-cream/50">No pending appointments right now — you're all caught up.</p>
        ) : (
          <ul className="divide-y divide-line">
            {pending.slice(0, 5).map((b) => (
              <li key={b._id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <span className="font-medium">{b.name}</span>
                  <span className="ml-2 text-cream/50">{b.date} at {b.time}</span>
                </div>
                <span className="rounded-full border border-champagne/40 px-3 py-1 text-xs text-champagne">Pending</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
