import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "admin" ? "/admin" : "/account");
    } catch (err) {
      setError(err.response?.data?.message || "Could not log in, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 font-display text-3xl">Welcome back</h1>
        <p className="mb-8 text-cream/60">Log in to view or manage your bookings.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label-field" htmlFor="email">Email</label>
            <input id="email" type="email" required className="input-field"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="label-field" htmlFor="password">Password</label>
            <input id="password" type="password" required className="input-field"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          {error && <p className="text-sm text-mauve">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Logging in…" : "Log in"}
          </button>
        </form>
        <p className="mt-6 text-sm text-cream/50">
          New here? <Link to="/register" className="text-champagne hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
