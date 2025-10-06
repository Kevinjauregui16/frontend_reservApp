import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../services/login";

export default function Footer({ data }) {
  const user_role = data?.user_role || "";
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const isAdminAndSuperAdmin =
    user_role === "admin" || user_role === "superadmin";

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                ✨ReservaPro
              </span>
            </a>
          </div>
          {isAdminAndSuperAdmin ? (
            <div className="flex flex-col items-end">
              <button
                onClick={handleLogout}
                title="Cerrar sesión"
                className="flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-red-100 text-red-400 font-semibold transition"
              >
                <FiLogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <a
                href="/login"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary text-sm"
              >
                Ingresar como Administrador
              </a>
            </div>
          )}
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2025 desarrollado con ❤️ por KevinDev.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href="https://github.com/Kevinjauregui16"
              target="_blank"
              className="text-gray-500 hover:text-primary"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
