import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoutIcon } from "../utils/logoutIcon";
import { Menu, X } from "lucide-react";

export const NavBar = () => {
  const location = useLocation();
  const hideNavBar = location.pathname.includes("/auth") || location.pathname=="/";  ;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div className="flex justify-center">
      {!hideNavBar && (
        <div className="flex justify-between w-[80%] bg-gray-700/20 h-16 rounded-xl items-center px-8 backdrop-blur-lg shadow-md relative z-50">
          <span className="font-semibold text-lg text-white">NextStep AI</span>

          <div className="w-3/5">
            {/* Desktop Navbar */}
            <div className="hidden sm:flex justify-around items-center space-x-6">
              <span
                className="relative cursor-pointer transition-all duration-300 ease-in-out text-white text-md after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Home
              </span>

              <span
                className="relative cursor-pointer transition-all duration-300 ease-in-out text-white text-md after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
                onClick={() => {
                  navigate("/recents");
                }}
              >
                Recents
              </span>

              <span
                className="relative cursor-pointer transition-all duration-300 ease-in-out text-white text-md after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
                onClick={() => {
                  navigate("/contact");
                }}
              >
                Contacts
              </span>

              <span
                className="relative cursor-pointer transition-all duration-300 ease-in-out text-white text-md"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </span>
            </div>

            {/* Mobile Navbar */}
            <div className="sm:hidden flex items-center justify-end m-3">
              <button
                className="text-white/80 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Mobile Dropdown */}
            <div
              className={`absolute top-16 right-4 w-40 h-50 bg-slate-600/90 backdrop-blur-3xl border border-white/20 rounded-xl shadow-lg flex flex-col p-4 space-y-4 sm:hidden transform transition-all duration-300 ease-in-out ${
                isOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              <span
                className="nav-link text-white cursor-pointer"
                onClick={() => {
                  navigate("/");
                  setIsOpen(false);
                }}
              >
                Home
              </span>
              <span
                className="nav-link text-white cursor-pointer"
                onClick={() => {
                  navigate("/recents");
                  setIsOpen(false);
                }}
              >
                Recents
              </span>
              <span
                className="nav-link text-white cursor-pointer"
                onClick={() => {
                  navigate("/contact");
                  setIsOpen(false);
                }}
              >
                Contacts
              </span>
              <span
                className="cursor-pointer text-white flex items-center"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                <LogoutIcon /> Logout
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
