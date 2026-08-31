import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutGrid, Scissors, CalendarCheck, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded px-4 py-2.5 text-sm font-medium transition-colors ${
    isActive ? "bg-mauve/15 text-champagne" : "text-cream/60 hover:bg-line/40 hover:text-cream"
  }`;

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container-page grid gap-8 py-10 lg:grid-cols-[220px_1fr]">
      <aside className="lg:sticky lg:top-28 lg:h-fit">
        <p className="mb-1 text-xs uppercase tracking-wide text-cream/40">Admin</p>
        <p className="mb-5 font-display text-lg">{user?.name}</p>
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          <NavLink to="/admin" end className={linkClass}>
            <LayoutGrid size={17} /> Overview
          </NavLink>
          <NavLink to="/admin/services" className={linkClass}>
            <Scissors size={17} /> Services
          </NavLink>
          <NavLink to="/admin/bookings" className={linkClass}>
            <CalendarCheck size={17} /> Appointments
          </NavLink>
        </nav>
        <button onClick={handleLogout} className="mt-6 flex items-center gap-3 rounded px-4 py-2.5 text-sm font-medium text-cream/50 hover:text-mauve">
          <LogOut size={17} /> Log out
        </button>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
