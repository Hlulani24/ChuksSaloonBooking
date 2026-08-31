import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AppointmentForm from "../components/AppointmentForm";

const Booking = () => {
  const location = useLocation();
  const [services, setServices] = useState(location.state?.services || []);

  const removeService = (id) => setServices((s) => s.filter((i) => i._id !== id));

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl">
        <p className="mb-2 text-sm font-medium text-champagne">Reserve your slot</p>
        <h1 className="mb-3 font-display text-4xl sm:text-5xl">Book an appointment at AMARA</h1>
        <p className="mb-10 text-cream/60">
          Fill in your details below. We'll email you a confirmation and can also confirm over WhatsApp — no payment needed to reserve.
        </p>
        <AppointmentForm preselectedServices={services} onRemoveService={removeService} />
      </div>
    </div>
  );
};

export default Booking;
