import { useState } from "react";
import Modal from "../../../components/modals/Modal";
import { useCreateCategoryMutation } from "../../../services/categories";
import { toast } from "react-toastify";

export default function CreateCategoryModal({ isOpen, onClose, onSuccess }) {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [form, setForm] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCategory(form).unwrap();
      toast.success("Categoría creada con éxito");
      setForm({ name: "" });
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleClose = () => {
    setForm({ name: "" });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Crear Categoría">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="flex flex-col justify-center">
          <div className="w-full max-w-md m-auto">
            <input
              placeholder="Nombre categoría"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-blue-50 placeholder:text-gray-400"
              required
              disabled={isLoading}
            />
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
        </div>
      </form>
    </Modal>
  );
}
