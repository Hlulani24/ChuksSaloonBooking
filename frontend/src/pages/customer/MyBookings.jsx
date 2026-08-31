import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader";

const statusColor = {
  pending: "border-champagne/40 text-champagne",
  confirmed: "border-sage/40 text-sage",
  declined: "border-mauve/40 text-mauve",
  completed: "border-cream/30 text-cream/60",
  cancelled: "border-cream/20 text-cream/40",
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/bookings/mine").then((res) => setBookings(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl">My appointments</h1>
      {loading ? (
        <Loader label="Loading" />
      ) : bookings.length === 0 ? (
        <p className="text-cream/50">No appointments yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="rounded-lg border border-line bg-surface p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg">{b.date} at {b.time}</h3>
                <span className={`rounded-full border px-3 py-1 text-xs capitalize ${statusColor[b.status]}`}>{b.status}</span>
              </div>
              {b.stylist && b.stylist !== "No preference" && <p className="mt-1 text-sm text-cream/50">Stylist: {b.stylist}</p>}
              {b.services?.length > 0 && <p className="mt-1 text-sm text-cream/50">{b.services.map((s) => s.name).join(", ")}</p>}
              {b.notes && <p className="mt-2 text-sm text-cream/60">"{b.notes}"</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
