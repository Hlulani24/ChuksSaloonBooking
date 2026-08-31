import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import api from "../../api/axios";
import Loader from "../../components/Loader";

const STATUS_TABS = ["all", "pending", "confirmed", "declined", "completed", "cancelled"];

const statusColor = {
  pending: "border-champagne/40 text-champagne",
  confirmed: "border-sage/40 text-sage",
  declined: "border-mauve/40 text-mauve",
  completed: "border-cream/30 text-cream/60",
  cancelled: "border-cream/20 text-cream/40",
};

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");

  const loadBookings = () => {
    setLoading(true);
    api.get("/bookings").then((res) => setBookings(res.data)).finally(() => setLoading(false));
  };

  useEffect(loadBookings, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/bookings/${id}/status`, { status });
    loadBookings();
  };

  const filtered = tab === "all" ? bookings : bookings.filter((b) => b.status === tab);

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl">Appointments</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {STATUS_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
              tab === t ? "border-champagne bg-champagne/10 text-champagne" : "border-line text-cream/60 hover:text-cream"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader label="Loading appointments" />
      ) : filtered.length === 0 ? (
        <p className="py-10 text-center text-cream/50">No appointments in this category.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <div key={b._id} className="rounded-lg border border-line bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg">{b.name}</h3>
                  <p className="text-sm text-cream/50">{b.email} · {b.phone}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs capitalize ${statusColor[b.status]}`}>
                  {b.status}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-cream/70">
                <span>{b.date} at {b.time}</span>
                {b.stylist && b.stylist !== "No preference" && <span>Stylist: {b.stylist}</span>}
                {b.notes && <span className="text-cream/50">"{b.notes}"</span>}
              </div>

              {b.services?.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {b.services.map((s, idx) => (
                    <li key={idx} className="rounded-full border border-line px-3 py-1 text-xs text-cream/60">
                      {s.name}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {b.status === "pending" && (
                  <>
                    <button onClick={() => updateStatus(b._id, "confirmed")} className="rounded border border-sage/40 px-3 py-1.5 text-xs font-medium text-sage hover:bg-sage/10">
                      Confirm
                    </button>
                    <button onClick={() => updateStatus(b._id, "declined")} className="rounded border border-mauve/40 px-3 py-1.5 text-xs font-medium text-mauve hover:bg-mauve/10">
                      Decline
                    </button>
                  </>
                )}
                {b.status === "confirmed" && (
                  <button onClick={() => updateStatus(b._id, "completed")} className="rounded border border-cream/20 px-3 py-1.5 text-xs font-medium text-cream/70 hover:bg-line/40">
                    Mark completed
                  </button>
                )}
                <a
                  href={`https://wa.me/${b.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto flex items-center gap-1.5 text-xs text-cream/50 hover:text-champagne"
                >
                  <MessageCircle size={14} /> Message on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
