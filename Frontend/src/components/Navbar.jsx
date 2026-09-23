import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUploadCloud, FiLogOut, FiMenu, FiX, FiFileText } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const headFont = "'Space Grotesk','Inter Tight','Helvetica Neue',Arial,sans-serif";
const monoFont = "'JetBrains Mono','IBM Plex Mono','SFMono-Regular',Menlo,Consolas,monospace";

const navLinks = [
  { to: "/", label: "Scan", icon: FiUploadCloud, end: true },
  { to: "/reports", label: "Reports", icon: FiFileText },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const desktopLink = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm transition-colors border ${
      isActive
        ? "text-[#FF8A3D] bg-[#14171A] border-[#262B30]"
        : "text-[#7A828A] border-transparent hover:text-[#E8E6E1]"
    }`;

  const mobileLink = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors border ${
      isActive
        ? "text-[#FF8A3D] bg-[#14171A] border-[#262B30]"
        : "text-[#C7C1B4] border-transparent hover:bg-[#14171A]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#262B30] bg-[#0A0C0E]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#14171A] border border-[#262B30] flex items-center justify-center">
              <FiUploadCloud className="text-[#FF8A3D] text-base" />
            </div>
            <div>
              <h1 className="text-lg text-[#E8E6E1]" style={{ fontFamily: headFont, fontWeight: 700 }}>
                ResumePro
              </h1>
              <p className="text-xs text-[#7A828A]" style={{ fontFamily: monoFont }}>
                ai_resume_analyzer
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={desktopLink}>
                <Icon size={14} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full bg-[#14171A] border border-[#262B30] text-[#FF8A3D] flex items-center justify-center text-xs shrink-0"
              style={{ fontFamily: monoFont }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="leading-tight">
              <p className="text-sm text-[#E8E6E1]">{user?.name}</p>
              <p className="text-xs text-[#7A828A]">{user?.email}</p>
            </div>
          </div>

          <span className="w-px h-7 bg-[#262B30]" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-sm text-[#7A828A] border border-transparent hover:text-[#FF5D5D] hover:border-[#262B30] hover:bg-[#14171A] transition-colors"
          >
            <FiLogOut size={16} />
            <span className="text-sm">Logout</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-sm text-[#C7C1B4] border border-[#262B30] bg-[#14171A]"
          aria-label="Toggle menu"
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t border-[#262B30] bg-[#0A0C0E] px-4 py-4 space-y-1">
          {navLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)} className={mobileLink}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}

          <div className="flex items-center gap-3 px-3 py-3 mt-2 border-t border-[#262B30]">
            <div
              className="w-8 h-8 rounded-full bg-[#14171A] border border-[#262B30] text-[#FF8A3D] flex items-center justify-center text-xs shrink-0"
              style={{ fontFamily: monoFont }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="leading-tight min-w-0">
              <p className="text-sm text-[#E8E6E1] truncate">{user?.name}</p>
              <p className="text-xs text-[#7A828A] truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-[#FF5D5D] border border-transparent hover:bg-[#14171A] transition-colors"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;