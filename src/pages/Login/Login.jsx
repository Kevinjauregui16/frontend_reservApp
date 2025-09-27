import { useLoginUserMutation } from "../../services/login";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function AuthPage() {
  const [loginUser, { isLoading: isLoadingLogin }] = useLoginUserMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password }).unwrap();
      localStorage.setItem("token", response.token);
      navigate("/dashboard-super-admin");
    } catch (error) {
      toast.error(error?.data?.message || "Credenciales incorrectas");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Formas decorativas */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-primary to-secondary opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-secondary to-primary opacity-20 rounded-full blur-3xl z-0" />
      
      {/* Contenedor principal con dos columnas */}
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between px-8">
        {/* Lado izquierdo - Logo */}
        <div className="flex-1 flex items-center justify-center">
          <span className="text-3xl font-extrabold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">
            ✨ReservaPro
          </span>
        </div>
        
        {/* Lado derecho - Formulario */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/40">
              <h2 className="text-4xl font-bold pb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary drop-shadow-lg">
                Iniciar Sesión
              </h2>
              <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-lg">
                <FaEnvelope />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Correo electrónico"
                className="w-full pl-10 pr-3 py-3 border border-gray-200 bg-gray-100 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-lg">
                <FaLock />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Contraseña"
                className="w-full pl-10 pr-3 py-3 border border-gray-200 bg-gray-100 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
              />
            </div>
            {/* <div className="flex justify-between items-center text-sm mt-2">
              <a href="#" className="text-primary hover:underline">¿Olvidaste tu contraseña?</a>
              <a href="/signup" className="text-secondary hover:underline">Crear cuenta</a>
            </div> */}
            <button
              type="submit"
              disabled={isLoadingLogin}
              className="w-full bg-gradient-to-r from-secondary to-primary shadow-lg hover:scale-105 transition-all duration-300 mt-6 rounded-xl py-3 text-white font-semibold text-lg tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoadingLogin ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
