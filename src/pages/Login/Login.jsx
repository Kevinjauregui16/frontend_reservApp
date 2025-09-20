import { useLoginUserMutation } from "../../services/login";
import { useRegisterClientMutation } from "../../services/clients";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [loginUser, { isLoading: isLoadingLogin }] = useLoginUserMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Register states
  const [saveClient, { isLoading: isLoadingRegister }] =
    useRegisterClientMutation();
  const [nameClient, setNameClient] = useState("");
  const [emailClient, setEmailClient] = useState("");
  const [passwordClient, setPasswordClient] = useState("");
  const [phoneClient, setPhoneClient] = useState("");
  const [storeIdClient, setStoreIdClient] = useState("");
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

  const handleSaveClient = async (e) => {
    e.preventDefault();
    try {
      const response = await saveClient({
        name: nameClient,
        email: emailClient,
        password: passwordClient,
        phone: phoneClient,
        store_id: storeIdClient,
      }).unwrap();
      toast.success("Has sido registrado con éxito");
      setNameClient("");
      setEmailClient("");
      setPasswordClient("");
      setPhoneClient("");
      setStoreIdClient("");
      setMode("login");
    } catch (error) {
      toast.error("Error al registrar cliente");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 to-blue-200">
      <div className="bg-transparent p-8 rounded-xl shadow-2xl w-full max-w-md">
        {mode === "login" ? (
          <>
            <h2 className="text-3xl font-bold pb-6 text-center text-gray-500 text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              Iniciar Sesión
            </h2>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Correo electrónico"
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-xl placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Contraseña"
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-xl placeholder-gray-500"
                />
              </div>
              <button
                type="submit"
                disabled={isLoadingLogin}
                className="w-full bg-gradient-to-r from-secondary to-primary hover:scale-105 transition-all duration-300 mt-6 rounded-xl py-2 text-white"
              >
                Ingresar
              </button>
              <p className="text-center text-gray-500">
                ¿No tienes una cuenta?{" "}
                <button
                  type="button"
                  className="text-primary font-semibold"
                  onClick={() => setMode("register")}
                >
                  Regístrate
                </button>
              </p>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold pb-6 text-center text-gray-500 text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              Regístrate como Cliente
            </h2>
            <form onSubmit={handleSaveClient} className="space-y-5">
              <div>
                <input
                  type="text"
                  value={nameClient}
                  onChange={(e) => setNameClient(e.target.value)}
                  required
                  placeholder="Nombre completo"
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-xl placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={emailClient}
                  onChange={(e) => setEmailClient(e.target.value)}
                  required
                  placeholder="Correo electrónico"
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-xl placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={passwordClient}
                  onChange={(e) => setPasswordClient(e.target.value)}
                  required
                  placeholder="Contraseña"
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-xl placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={phoneClient}
                  onChange={(e) => setPhoneClient(e.target.value)}
                  required
                  placeholder="Teléfono"
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-xl placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={storeIdClient}
                  onChange={(e) => setStoreIdClient(e.target.value)}
                  required
                  placeholder="ID de tienda"
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-xl placeholder-gray-500"
                />
              </div>
              <button
                type="submit"
                disabled={isLoadingRegister}
                className="w-full bg-gradient-to-r from-secondary to-primary hover:scale-105 transition-all duration-300 mt-6 rounded-xl py-2 text-white"
              >
                Registrar
              </button>
              <p className="text-center text-gray-500">
                ¿Ya tienes una cuenta?{" "}
                <button
                  type="button"
                  className="text-primary font-semibold"
                  onClick={() => setMode("login")}
                >
                  Iniciar sesión
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
