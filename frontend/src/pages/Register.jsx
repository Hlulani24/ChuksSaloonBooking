import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form);
      navigate("/account");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create your account, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 font-display text-3xl">Create your account</h1>
        <p className="mb-8 text-cream/60">Track your bookings and book faster next time.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label-field" htmlFor="name">Full name</label>
            <input id="name" name="name" required placeholder="Full name" className="input-field" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label className="label-field" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" className="input-field" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label className="label-field" htmlFor="phone">Phone</label>
            <input id="phone" name="phone" placeholder="e.g. 0821234567" className="input-field" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <label className="label-field" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required minLength={6} placeholder="At least 6 characters" className="input-field" value={form.password} onChange={handleChange} />
          </div>
          {error && <p className="text-sm text-mauve">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-sm text-cream/50">
          Already have an account? <Link to="/login" className="text-champagne hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
