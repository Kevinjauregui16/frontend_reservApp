import {
  HiOutlineHome,
  HiOutlineCog,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLogoutUserMutation } from "../../services/login";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ user_role }) {
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

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
    <aside className="h-full bg-white shadow-lg w-64 flex flex-col py-8 px-4 fixed left-0 top-0 z-30">
      <div>
        <div className="flex flex-col items-center mb-10">
          <span className="text-3xl font-extrabold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">
            ✨ReservaPro
          </span>
          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wide shadow-sm">
            {user_role}
          </span>
        </div>
        <nav className="flex flex-col gap-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition"
          >
            <HiOutlineHome className="w-6 h-6" />
            Dashboard
          </Link>
          <Link
            to="/clientes"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition"
          >
            <HiOutlineUserGroup className="w-6 h-6" />
            Clientes
          </Link>
          <Link
            to="/configuracion"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition"
          >
            <HiOutlineCog className="w-6 h-6" />
            Configuración
          </Link>
          {/* Agrega más enlaces según tus rutas */}
        </nav>
      </div>
      <button
        onClick={handleLogout}
        title="Cerrar sesión"
        className="flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-red-100 text-red-400 font-semibold transition mt-auto"
      >
        <FiLogOut className="w-5 h-5" />
        Cerrar sesión
      </button>
    </aside>
  );
}
