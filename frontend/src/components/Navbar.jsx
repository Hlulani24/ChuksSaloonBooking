import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu as MenuIcon, X, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navLink = ({ isActive }) =>
  `text-sm font-medium transition-colors ${isActive ? "text-champagne" : "text-cream/80 hover:text-cream"}`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const dashboardPath = user?.role === "admin" ? "/admin" : "/account";

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-noir/95 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mauve text-cream">
            <Sparkles size={18} />
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight">CHUKS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navLink}>Home</NavLink>
          <NavLink to="/services" className={navLink}>Services</NavLink>
          <NavLink to="/booking" className={navLink}>Book Appointment</NavLink>
          <NavLink to="/about" className={navLink}>About</NavLink>
          <NavLink to="/contact" className={navLink}>Contact</NavLink>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <>
              <Link to={dashboardPath} className="text-sm font-medium text-cream/80 hover:text-cream">
                Hi, {user.name.split(" ")[0]}
              </Link>
              <button onClick={handleLogout} className="btn-outline !px-4 !py-2 text-sm">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-cream/80 hover:text-cream">
                Log in
              </Link>
              <Link to="/booking" className="btn-primary !px-5 !py-2.5 text-sm">
                Book Appointment
              </Link>
            </>
          )}
        </div>

        <button
          className="text-cream md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={26} /> : <MenuIcon size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-noir md:hidden">
          <div className="container-page flex flex-col gap-4 py-6">
            <NavLink to="/" end className={navLink} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/services" className={navLink} onClick={() => setOpen(false)}>Services</NavLink>
            <NavLink to="/booking" className={navLink} onClick={() => setOpen(false)}>Book Appointment</NavLink>
            <NavLink to="/about" className={navLink} onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={navLink} onClick={() => setOpen(false)}>Contact</NavLink>
            <div className="mt-2 flex flex-col gap-3 border-t border-line pt-4">
              {user ? (
                <>
                  <Link to={dashboardPath} className="text-sm font-medium text-cream/80" onClick={() => setOpen(false)}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="btn-outline w-full text-sm">Log out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-cream/80" onClick={() => setOpen(false)}>
                    Log in
                  </Link>
                  <Link to="/booking" className="btn-primary w-full text-sm" onClick={() => setOpen(false)}>
                    Book Appointment
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
