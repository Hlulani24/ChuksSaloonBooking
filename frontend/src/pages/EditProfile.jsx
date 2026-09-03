import React, { useState } from "react";
import { Settings } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

// Shared by both the customer dashboard (/account/settings) and the admin
// dashboard (/admin/settings) — same account model, same fields either way.
const EditProfile = () => {
  const { user, setSession } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [savingDetails, setSavingDetails] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [detailsMsg, setDetailsMsg] = useState(null); // { type: "success" | "error", text }
  const [passwordMsg, setPasswordMsg] = useState(null);

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    setDetailsMsg(null);
    setSavingDetails(true);
    try {
      const res = await api.put("/auth/profile", form);
      const token = localStorage.getItem("amara_token");
      setSession({ token, user: res.data.user });
      setDetailsMsg({ type: "success", text: "Your details have been updated." });
    } catch (err) {
      setDetailsMsg({ type: "error", text: err.response?.data?.message || "Could not save changes." });
    } finally {
      setSavingDetails(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg({ type: "error", text: "New passwords don't match." });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordMsg({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }

    setSavingPassword(true);
    try {
      const res = await api.put("/auth/profile", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      const token = localStorage.getItem("amara_token");
      setSession({ token, user: res.data.user });
      setPasswordMsg({ type: "success", text: "Your password has been changed." });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPasswordMsg({ type: "error", text: err.response?.data?.message || "Could not change password." });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <Settings size={22} className="text-champagne" />
        <h1 className="font-display text-3xl">Account settings</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-lg border border-line bg-surface p-6">
          <h2 className="mb-1 font-display text-xl">Your details</h2>
          <p className="mb-5 text-sm text-cream/50">Update the name, email and phone number on your account.</p>

          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div>
              <label className="label-field" htmlFor="name">Full name</label>
              <input id="name" className="input-field" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" required />
            </div>
            <div>
              <label className="label-field" htmlFor="email">Email</label>
              <input id="email" type="email" className="input-field" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required />
            </div>
            <div>
              <label className="label-field" htmlFor="phone">Phone</label>
              <input id="phone" className="input-field" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="e.g. 0821234567" />
            </div>

            {detailsMsg && (
              <p className={`text-sm ${detailsMsg.type === "success" ? "text-sage" : "text-mauve"}`}>{detailsMsg.text}</p>
            )}

            <button type="submit" disabled={savingDetails} className="btn-primary">
              {savingDetails ? "Saving…" : "Save details"}
            </button>
          </form>
        </section>

        <section className="rounded-lg border border-line bg-surface p-6">
          <h2 className="mb-1 font-display text-xl">Change password</h2>
          <p className="mb-5 text-sm text-cream/50">You'll need your current password to set a new one.</p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="label-field" htmlFor="currentPassword">Current password</label>
              <input id="currentPassword" type="password" className="input-field" placeholder="Your current password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} required />
            </div>
            <div>
              <label className="label-field" htmlFor="newPassword">New password</label>
              <input id="newPassword" type="password" className="input-field" placeholder="At least 6 characters"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} required />
            </div>
            <div>
              <label className="label-field" htmlFor="confirmPassword">Confirm new password</label>
              <input id="confirmPassword" type="password" className="input-field" placeholder="Re-enter your new password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} required />
            </div>

            {passwordMsg && (
              <p className={`text-sm ${passwordMsg.type === "success" ? "text-sage" : "text-mauve"}`}>{passwordMsg.text}</p>
            )}

            <button type="submit" disabled={savingPassword} className="btn-primary">
              {savingPassword ? "Updating…" : "Change password"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditProfile;
