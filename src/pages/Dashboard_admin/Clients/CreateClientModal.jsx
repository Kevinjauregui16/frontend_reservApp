import { useState, useEffect } from "react";
import Modal from "../../../components/modals/Modal";
import { useListStoresQuery } from "../../../services/stores";
import { useListplansQuery } from "../../../services/plans";
import { useRegisterClientMutation } from "../../../services/clients";
import { toast } from "react-toastify";

export default function CreateClientModal({ isOpen, onClose, onSuccess }) {
  const [registerClient, { isLoading }] = useRegisterClientMutation();
  const { data: stores, refetch: refetchStores } = useListStoresQuery();
  const { data: plans, refetch: refetchPlans } = useListplansQuery();

  const [form, setForm] = useState({
    plan_id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    store_id: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerClient(form).unwrap();
      toast.success("Cliente creado con éxito");
      setForm({
        plan_id: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        store_id: "",
      });
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  const handleClose = () => {
    setForm({
      plan_id: "",
      name: "",
      email: "",
      password: "",
      phone: "",
      store_id: "",
    });
    onClose();
  };

  useEffect(() => {
    refetchStores();
    refetchPlans();
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Registrar Cliente"
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <select
                placeholder="Seleccionar Tienda"
                name="store_id"
                id="store_id"
                value={form.store_id}
                onChange={handleChange}
                className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
                required
              >
                <option value="">Seleccionar Tienda</option>
                {stores?.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                placeholder="Seleccionar Plan"
                name="plan_id"
                id="plan_id"
                value={form.plan_id}
                onChange={handleChange}
                className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
                required
              >
                <option value="">Seleccionar Plan</option>
                {plans?.plans?.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                placeholder="Nombre completo"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-blue-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none bg-blue-50 placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <input
                placeholder="Telefono o Celular"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
              />
            </div>
            <div>
              <input
                placeholder="Correo electrónico"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <input
                placeholder="Contraseña"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-blue-200 rounded-xl px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400"
                required
              />
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
        </div>
      </form>
    </Modal>
  );
}
