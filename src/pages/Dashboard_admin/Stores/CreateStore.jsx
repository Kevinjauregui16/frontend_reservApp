import { useState } from "react";
import { useCreateStoreMutation } from "../../../services/stores";
import { useNavigate } from "react-router-dom";

export default function CreateStore() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category_id: "",
    street: "",
    number_ext: "",
    city: "",
    state: "",
    postal_code: "",
    neighborhood: "",
    url_maps: "",
    phone: "",
  });

  const [createStore] = useCreateStoreMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createStore(form);
    navigate("/dashboard-admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl space-y-2 py-4 flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
          Crear Tienda
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block mb-2 text-blue-900 font-semibold">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-primary rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-blue-900 font-semibold">
              Categoría (ID) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              className="w-full border border-primary rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-blue-900 font-semibold">
              Calle
            </label>
            <input
              type="text"
              name="street"
              value={form.street}
              onChange={handleChange}
              className="w-full border border-primary rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block mb-2 text-blue-900 font-semibold">
              Número Exterior
            </label>
            <input
              type="text"
              name="number_ext"
              value={form.number_ext}
              onChange={handleChange}
              className="w-full border border-primary rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block mb-2 text-blue-900 font-semibold">
              Ciudad <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full border border-primary rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-blue-900 font-semibold">
              Estado <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full border border-primary rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-blue-900 font-semibold">
              Código Postal <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="postal_code"
              value={form.postal_code}
              onChange={handleChange}
              className="w-full border border-primary rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-blue-900 font-semibold">
              Colonia
            </label>
            <input
              type="text"
              name="neighborhood"
              value={form.neighborhood}
              onChange={handleChange}
              className="w-full border border-primary rounded-lg px-4 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2 text-blue-900 font-semibold">
              URL Google Maps <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="url_maps"
              value={form.url_maps}
              onChange={handleChange}
              className="w-full border border-primary rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2 text-blue-900 font-semibold">
              Teléfono
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-primary rounded-lg px-4 py-2"
            />
          </div>
        </div>
        <div className="w-1/2 space-x-4 flex">
          <button
            onClick={() => navigate("/dashboard-admin")}
            className="w-1/2 bg-gradient-to-r from-red-500 to-red-200 hover:scale-105 transition-all duration-300 mt-6 rounded-xl py-2 text-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-1/2 bg-gradient-to-r from-secondary to-primary hover:scale-105 transition-all duration-300 mt-6 rounded-xl py-2 text-white"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
