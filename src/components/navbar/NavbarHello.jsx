import { HiOutlineUserGroup } from "react-icons/hi";

export default function NavbarHello({ isLoading, user_name }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-6 mb-10 border-b border-gray-200 py-6">
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full p-2">
          <HiOutlineUserGroup className="w-10 h-10" />
        </div>
        <div className="text-right">
          <p className="text-lg text-gray-500 font-medium leading-tight">
            Hola,
          </p>
          {!isLoading && (
            <a
              href="/profile"
              className="text-2xl font-bold text-blue-700 hover:text-blue-600 transition-all leading-tight flex items-center gap-2"
            >
              {user_name}
            </a>
          )}
          <span className="text-xs text-gray-400">¡Bienvenido de nuevo!</span>
        </div>
      </div>
    </div>
  );
}
