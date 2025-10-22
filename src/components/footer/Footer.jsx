export default function Footer({ data }) {
  const user_role = data?.user_role || "";

  const isAdminAndSuperAdmin =
    user_role === "admin" || user_role === "superadmin";

  return (
    <footer>
      <div className="mx-auto w-full max-w-screen-xl py-6">
        <hr className="mb-6 border-gray-200 sm:mx-auto" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                  ✨ReservaPro
                </span>
              </a>
            </div>
            <span className="text-sm text-gray-500 sm:text-center">
              © 2025 desarrollado con ❤️ por KevinDev.
            </span>
          </div>
          {!isAdminAndSuperAdmin && (
            <div className="flex gap-2 mt-4 sm:justify-center sm:mt-0">
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
      </div>
    </footer>
  );
}
