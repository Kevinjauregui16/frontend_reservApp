import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { useRegisterUserMutation } from "../../services/users";
import { useEffect, useState } from "react";

export default function Navbar({ user }) {
  const [registerUser] = useRegisterUserMutation();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const userName =
    user && user.fullName && user.fullName.trim() !== ""
      ? user.fullName
      : user && user.primaryEmailAddress
      ? user.primaryEmailAddress.emailAddress.split("@")[0]
      : "Usuario";

  useEffect(() => {
    if (user) {
      const userData = {
        clerk_id: user.id,
        name: userName,
        email: user.primaryEmailAddress.emailAddress,
      };
      registerUser(userData);
    }
  }, [user, registerUser]);

  // Cierra el menú móvil al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-white bg-opacity-90 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
            ✨ReservApp
          </span>
        </Link>

        {/* Links y botón de sesión (escritorio) */}
        <SignedIn>
          <div className="hidden md:flex flex-1 items-center justify-center">
            <ul className="flex flex-row space-x-8 font-medium">
              <li>
                <Link
                  to="/"
                  className="py-2 px-3 text-gray-900 rounded-sm hover:text-secondary"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="py-2 px-3 text-gray-900 rounded-sm hover:text-secondary"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  to="/reservations"
                  className="py-2 px-3 text-gray-900 rounded-sm hover:text-secondary"
                >
                  Mis Reservas
                </Link>
              </li>
            </ul>
          </div>
        </SignedIn>

        {/* Usuario y botón sesión (escritorio) */}
        <div className="hidden md:flex items-center space-x-4">
          <UserButton />
          {user && (
            <span className="text-gray-900 font-medium">{userName}</span>
          )}
          <SignedOut>
            <SignInButton
              mode="modal"
              className="text-white bg-gradient-to-r from-secondary to-primary px-3 py-1 rounded-xl hover:scale-105 transition-all duration-300"
            >
              Iniciar Sesión
            </SignInButton>
          </SignedOut>
        </div>

        {/* Botón menú móvil */}
        <div className="md:hidden flex items-center gap-2">
          <UserButton />
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`md:hidden transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        }`}
        id="navbar-user"
      >
        <ul className="flex flex-col font-medium p-4 space-y-2 bg-white rounded-lg shadow">
          <li>
            <Link
              to="/"
              className="block py-2 px-3 text-gray-900 rounded-sm hover:text-secondary"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="block py-2 px-3 text-gray-900 rounded-sm hover:text-secondary"
            >
              Servicios
            </Link>
          </li>
          <SignedIn>
            <li>
              <Link
                to="/reservations"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:text-secondary"
              >
                Mis Reservas
              </Link>
            </li>
          </SignedIn>
          <SignedOut>
            <li>
              <SignInButton mode="modal">
                <button className="block w-full py-2 px-3 text-white bg-gradient-to-r from-secondary to-primary rounded-xl text-center">
                  Iniciar Sesión
                </button>
              </SignInButton>
            </li>
          </SignedOut>
        </ul>
      </div>
    </nav>
  );
}
