import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck } from "lucide-react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/bookings/mine").then((res) => setBookings(res.data)).finally(() => setLoading(false));
  }, []);

  const upcoming = bookings.filter((b) => ["pending", "confirmed"].includes(b.status));

  return (
    <div>
      <h1 className="mb-2 font-display text-3xl">Hey {user?.name.split(" ")[0]}</h1>
      <p className="mb-8 text-cream/60">Here's what's coming up.</p>

      {loading ? (
        <Loader label="Loading your appointments" />
      ) : upcoming.length === 0 ? (
        <div className="rounded-lg border border-line bg-surface p-8 text-center">
          <CalendarCheck className="mx-auto mb-3 text-cream/30" size={28} />
          <p className="mb-4 text-cream/60">You don't have any upcoming appointments yet.</p>
          <Link to="/booking" className="btn-primary inline-flex">Book an appointment <ArrowRight size={16} /></Link>
        </div>
      ) : (
        <div className="space-y-4">
          {upcoming.map((b) => (
            <div key={b._id} className="rounded-lg border border-line bg-surface p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg">{b.date} at {b.time}</h3>
                <span className="rounded-full border border-champagne/40 px-3 py-1 text-xs capitalize text-champagne">{b.status}</span>
              </div>
              {b.stylist && b.stylist !== "No preference" && <p className="mt-1 text-sm text-cream/50">Stylist: {b.stylist}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
