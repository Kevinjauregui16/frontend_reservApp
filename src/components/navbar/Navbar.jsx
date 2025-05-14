import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="bg-white bg-opacity-90 sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
            ✨ReservApp
          </span>
        </a>
        <div className="flex items-center md:order-2 md:space-x-0 rtl:space-x-reverse">
          <div className="flex items-center md:order-2 md:space-x-4 rtl:space-x-reverse">
            <UserButton />
            {user && (
              <span className="text-gray-900 font-medium hidden md:flex">
                {user.fullName || "Usuario"}
              </span>
            )}
          </div>

          {/* boton de herramientas mobile */}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
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
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-900 rounded-sm md:hover:text-secondary md:p-0"
              >
                Inicio
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm md:hover:text-secondary md:p-0"
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded-sm md:hover:text-secondary md:p-0"
              >
                Mis Reservas
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
