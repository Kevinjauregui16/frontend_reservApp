import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>

        <p className="mb-4">
          Esta Política de Privacidad explica cómo recopilamos, usamos y
          protegemos tu información personal cuando utilizas nuestros servicios.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          1. Información que recopilamos
        </h2>
        <p className="mb-4">
          Podemos recopilar información personal como tu nombre, dirección de
          correo electrónico, número de teléfono y ubicación cuando usas nuestra
          plataforma.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          2. Cómo usamos tu información
        </h2>
        <p className="mb-4">
          Utilizamos tu información para ofrecer y mejorar nuestros servicios,
          procesar reservas, comunicarnos contigo y garantizar la seguridad.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          3. Compartir tu información
        </h2>
        <p className="mb-4">
          No vendemos tu información personal. Podemos compartirla con
          proveedores de servicios que nos ayudan a operar nuestra plataforma.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Tus derechos</h2>
        <p className="mb-4">
          Tienes derecho a acceder, actualizar o eliminar tus datos personales.
          También puedes oponerte al tratamiento de tus datos en determinadas
          circunstancias.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Contáctanos</h2>
        <p className="mb-4">
          Si tienes alguna pregunta sobre esta Política de Privacidad, puedes
          escribirnos a{" "}
          <a
            href="mailto:soporte@ejemplo.com"
            className="text-blue-600 hover:underline"
          >
            soporte@ejemplo.com
          </a>
          .
        </p>
      </div>
      <Footer />
    </>
  );
}
