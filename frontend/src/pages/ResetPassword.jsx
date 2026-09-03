import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post(`/auth/reset-password/${token}`, { password });
      setSession(res.data);
      setDone(true);
      setTimeout(() => {
        navigate(res.data.user.role === "admin" ? "/admin" : "/account");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "This reset link is invalid or has expired.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-sm text-center">
          <h1 className="mb-3 font-display text-3xl">Password updated</h1>
          <p className="text-cream/60 text-sm">Taking you to your dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 font-display text-3xl">Choose a new password</h1>
        <p className="mb-8 text-cream/60">Make it at least 6 characters.</p>

        {error && (
          <p className="mb-4 text-sm text-mauve">
            {error}{" "}
            {error.toLowerCase().includes("expired") && (
              <Link to="/forgot-password" className="underline font-medium">Request a new link</Link>
            )}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label-field" htmlFor="password">New password</label>
            <input id="password" type="password" required placeholder="At least 6 characters" className="input-field"
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label className="label-field" htmlFor="confirmPassword">Confirm new password</label>
            <input id="confirmPassword" type="password" required placeholder="Re-enter your new password" className="input-field"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
