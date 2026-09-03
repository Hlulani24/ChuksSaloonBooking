import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-sm text-center">
          <h1 className="mb-3 font-display text-3xl">Check your email</h1>
          <p className="text-cream/60 text-sm">
            If an account exists for <strong>{email}</strong>, we've sent a link to reset your
            password. It expires in 30 minutes.
          </p>
          <Link to="/login" className="mt-6 inline-block text-champagne hover:underline">Back to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 font-display text-3xl">Forgot your password?</h1>
        <p className="mb-8 text-cream/60">Enter the email on your account and we'll send you a reset link.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label-field" htmlFor="email">Email</label>
            <input id="email" type="email" required placeholder="you@example.com" className="input-field"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {error && <p className="text-sm text-mauve">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Sending…" : "Send reset link"}
          </button>
        </form>
        <p className="mt-6 text-sm text-cream/50">
          Remembered it? <Link to="/login" className="text-champagne hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
