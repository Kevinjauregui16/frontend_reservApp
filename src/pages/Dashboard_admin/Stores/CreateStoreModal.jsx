import { useState, useEffect } from "react";
import Modal from "../../../components/modals/Modal";
import { useCreateStoreMutation } from "../../../services/stores";
import { useListCategoriesQuery } from "../../../services/categories";
import { toast } from "react-toastify";

export default function CreateStoreModal({ isOpen, onClose, onSuccess }) {
  const [createStore, { isLoading }] = useCreateStoreMutation();
  const { data: categories, refetch: refetchCategories } =
    useListCategoriesQuery();

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createStore(form).unwrap();
      toast.success("Tienda creada con éxito");
      setForm({
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
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating store:", error);
    }
  };

  const handleClose = () => {
    setForm({
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
    onClose();
  };

  useEffect(() => {
    refetchCategories();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Crear Tienda">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div>
          <input
            placeholder="Nombre de tu local o negocio"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-blue-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-blue-50 placeholder:text-gray-400"
            required
          />
        </div>
        <div>
          <select
            name="category_id"
            id="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="">Selecciona una categoría</option>
            {Array.isArray(categories?.categories) &&
              categories.categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <input
            placeholder="Calle"
            type="text"
            name="street"
            value={form.street}
            onChange={handleChange}
            className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
          />
        </div>
        <div>
          <input
            placeholder="Número Exterior"
            type="text"
            name="number_ext"
            value={form.number_ext}
            onChange={handleChange}
            className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
          />
        </div>
        <div>
          <input
            placeholder="Ciudad"
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
            required
          />
        </div>
        <div>
          <input
            placeholder="Estado"
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
            required
          />
        </div>
        <div>
          <input
            placeholder="Código Postal"
            type="text"
            name="postal_code"
            value={form.postal_code}
            onChange={handleChange}
            className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
            required
          />
        </div>
        <div>
          <input
            placeholder="Colonia"
            type="text"
            name="neighborhood"
            value={form.neighborhood}
            onChange={handleChange}
            className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
          />
        </div>
        <div className="md:col-span-2">
          <input
            placeholder="URL Google Maps"
            type="url"
            name="url_maps"
            value={form.url_maps}
            onChange={handleChange}
            className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
            required
          />
        </div>
        <div className="md:col-span-2">
          <input
            placeholder="Teléfono"
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="flex gap-4 mt-4 col-span-2 justify-center">
          <button
            type="button"
            onClick={handleClose}
            className="w-32 bg-gradient-to-r from-red-400 to-red-200 hover:scale-105 transition-all duration-300 rounded-xl py-2 text-white font-semibold shadow"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-32 bg-gradient-to-r from-blue-500 to-purple-400 hover:scale-105 transition-all duration-300 rounded-xl py-2 text-white font-semibold shadow disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
