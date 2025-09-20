import { useState } from "react";
import Modal from "../../../components/modals/Modal";
import { useCreatePlanMutation } from "../../../services/plans";
import { toast } from "react-toastify";

export default function CreatePlanModal({ isOpen, onClose, onSuccess }) {
  const [createPlan, { isLoading }] = useCreatePlanMutation();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount_price: "",
    duration_days: "",
    is_active: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggleActive = () => {
    setForm({ ...form, is_active: form.is_active === 1 ? 0 : 1 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPlan(form).unwrap();
      toast.success("Plan creado con éxito");
      setForm({
        name: "",
        description: "",
        price: "",
        discount_price: "",
        duration_days: "",
        is_active: 1,
      });
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating plan:", error);
    }
  };

  const handleClose = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      discount_price: "",
      duration_days: "",
      is_active: 1,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Crear Plan">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div className="w-full max-w-md m-auto">
            <input
              placeholder="Nombre"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-blue-50 placeholder:text-gray-400"
              required
              disabled={isLoading}
            />
          </div>
          <div className="w-full max-w-md m-auto">
            <input
              placeholder="Descripción"
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-blue-50 placeholder:text-gray-400"
              disabled={isLoading}
            />
          </div>
          <div className="w-full max-w-md m-auto">
            <input
              placeholder="Precio"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-blue-50 placeholder:text-gray-400"
              required
              disabled={isLoading}
            />
          </div>
          <div className="w-full max-w-md m-auto">
            <input
              placeholder="Precio con descuento"
              type="number"
              name="discount_price"
              value={form.discount_price}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-blue-50 placeholder:text-gray-400"
              disabled={isLoading}
            />
          </div>
          <div className="w-full max-w-md m-auto">
            <input
              placeholder="Duración (días)"
              type="number"
              name="duration_days"
              value={form.duration_days}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-blue-50 placeholder:text-gray-400"
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium ${
                form.is_active === 0 ? "text-gray-900" : "text-gray-400"
              }`}
            >
              Inactivo
            </span>
            <button
              type="button"
              onClick={handleToggleActive}
              disabled={isLoading}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                form.is_active === 1 ? "bg-blue-600" : "bg-gray-200"
              } ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  form.is_active === 1 ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                form.is_active === 1 ? "text-gray-900" : "text-gray-400"
              }`}
            >
              Activo
            </span>
          </div>
        </div>
        <div className="flex gap-4 justify-center mt-10">
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
