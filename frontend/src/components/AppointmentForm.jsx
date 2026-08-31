import React, { useState } from "react";
import { X } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const emptyForm = { name: "", email: "", phone: "", date: "", time: "", stylist: "No preference", notes: "" };

const AppointmentForm = ({ preselectedServices = [], onRemoveService }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    ...emptyForm,
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [whatsappLink, setWhatsappLink] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const payload = {
        ...form,
        userId: user?._id,
        services: preselectedServices.map((s) => ({
          service: s._id,
          name: s.name,
          price: s.price,
          durationMinutes: s.durationMinutes,
        })),
      };
      const res = await api.post("/bookings", payload);
      setWhatsappLink(res.data.whatsappLink);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong, please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-line bg-surface p-8 text-center">
        <h3 className="font-display text-2xl text-champagne">Appointment request sent</h3>
        <p className="mt-3 text-cream/70">
          We've emailed you the details. Our team will confirm your appointment shortly — keep an eye on your inbox.
        </p>
        {whatsappLink && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-6 inline-flex"
          >
            Confirm via WhatsApp instead
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-line bg-surface p-6 sm:p-8">
      {preselectedServices.length > 0 && (
        <div className="mb-6 rounded border border-line bg-noir p-4">
          <p className="mb-2 text-sm font-medium text-cream/70">Selected services</p>
          <ul className="space-y-1.5">
            {preselectedServices.map((service) => (
              <li key={service._id} className="flex items-center justify-between text-sm">
                <span>{service.name}</span>
                <span className="flex items-center gap-3">
                  <span className="text-champagne">R{Number(service.price).toFixed(2)}</span>
                  {onRemoveService && (
                    <button
                      type="button"
                      onClick={() => onRemoveService(service._id)}
                      aria-label={`Remove ${service.name}`}
                      className="text-cream/40 hover:text-mauve"
                    >
                      <X size={14} />
                    </button>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-field" htmlFor="name">Full name</label>
          <input id="name" name="name" required value={form.name} onChange={handleChange} className="input-field" placeholder="Naledi Dube" />
        </div>
        <div>
          <label className="label-field" htmlFor="phone">Phone number</label>
          <input id="phone" name="phone" required value={form.phone} onChange={handleChange} className="input-field" placeholder="082 123 4567" />
        </div>
        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" />
        </div>
        <div>
          <label className="label-field" htmlFor="date">Date</label>
          <input id="date" name="date" type="date" required value={form.date} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="label-field" htmlFor="time">Time</label>
          <input id="time" name="time" type="time" required value={form.time} onChange={handleChange} className="input-field" />
        </div>
        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="stylist">Preferred stylist (optional)</label>
          <input id="stylist" name="stylist" value={form.stylist} onChange={handleChange} className="input-field" placeholder="No preference" />
        </div>
        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="notes">Notes (optional)</label>
          <textarea id="notes" name="notes" rows="3" value={form.notes} onChange={handleChange} className="input-field resize-none" placeholder="Allergies, hair length, reference photos to bring…" />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-mauve">{errorMsg}</p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary mt-6 w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Confirm appointment request"}
      </button>
      <p className="mt-3 text-xs text-cream/40">
        No payment needed now. We'll confirm by email and WhatsApp — you only pay in-salon.
      </p>
    </form>
  );
};

export default AppointmentForm;
