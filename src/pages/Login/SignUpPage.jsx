import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 to-blue-200">
      <div className="w-full max-w-4xl py-8 px-4 md:px-8 bg-white bg-opacity-70 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center md:items-stretch gap-8">
        {/* Columna izquierda: Logo y textos */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start mb-8 md:mb-0">
          <Link to="/" className="flex items-center mb-6">
            <span className="text-4xl font-bold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary drop-shadow-lg">
              ✨ReservApp
            </span>
          </Link>
          <p className="mb-6 text-left text-gray-500 text-base md:text-lg">
            Accede para disfrutar de todas las funcionalidades de ReservApp
          </p>
          <Link
            to="/"
            className="text-white bg-gradient-to-r from-secondary to-primary w-full sm:w-1/2 md:w-1/3 text-center py-2 rounded-xl hover:scale-105 transition-all duration-300"
          >
            Volver
          </Link>
        </div>
        {/* Columna derecha: SignIn */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
          </div>
        </div>
      </div>
    </div>
  );
}
