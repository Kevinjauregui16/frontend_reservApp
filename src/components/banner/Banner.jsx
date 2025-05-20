import { IoLocationOutline, IoSearchOutline } from "react-icons/io5";
import { SignInButton } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

export default function Banner({ user }) {
  AOS.init();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Redirige a /services con los parámetros de búsqueda
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (location) params.append("location", location);
    navigate(`/services?${params.toString()}`);
  };
  return (
    <div className="h-bannerMobile md:h-banner bg-gradient-to-r from-purple-200 to-blue-200 flex">
      <div className="max-w-screen-xl flex flex-col md:flex-row justify-center items-center mx-auto px-4 py-4 md:pt-0">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-4">
          <h2 className="text-4xl md:text-6xl font-bold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
            Reserva servicios <br /> en segundos
          </h2>
          <p className="text-xl md:text-2xl text-white">
            Barberías, salones de belleza, dentistas y más. Todo en un solo
            lugar.
          </p>
          <div className="flex flex-col bg-white shadow-2xl rounded-xl p-6 mt-4 gap-4 w-full">
            <div className="flex items-center border rounded-xl px-4 py-2">
              <IoSearchOutline className="text-gray-500 mr-3 text-xl" />
              <input
                type="search"
                name=""
                id=""
                placeholder="¿Qué servicio buscas?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 outline-none border-none placeholder:text-gray-500"
              />
            </div>
            <div className="flex items-center border rounded-xl px-4 py-2">
              <IoLocationOutline className="text-gray-500 text-xl mr-3" />
              <input
                type="text"
                name=""
                id=""
                placeholder="Ubicación"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 outline-none border-none placeholder:text-gray-500"
              />
            </div>

            {user ? (
              <button
                className="bg-gradient-to-r from-secondary to-primary p-3 rounded-xl text-white hover:scale-105 transition-all duration-300"
                onClick={handleSearch}
              >
                Buscar
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-gradient-to-r from-secondary to-primary p-3 rounded-xl text-white hover:scale-105 transition-all duration-300">
                  Buscar
                </button>
              </SignInButton>
            )}
          </div>
        </div>
        <div className="hidden md:flex md:w-1/ justify-center items-center">
          <img src="/Banner.png" alt="Banner" className="max-w-[70%] h-auto" />
        </div>
      </div>
    </div>
  );
}
