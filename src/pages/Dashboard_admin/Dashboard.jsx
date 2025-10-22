import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetDashboardSuperAdminQuery } from "../../services/dashboardSuperAdmin";
import { HiOutlineUserGroup } from "react-icons/hi2";
import ButtonFast from "../../components/buttons/ButtonFast";
import Footer from "../../components/footer/Footer";
import CreateCategoryModal from "./Categories/CreateCategoryModal";
import CreateStoreModal from "./Stores/CreateStoreModal";
import CreateClientModal from "./Clients/CreateClientModal";
import CreatePlanModal from "./Plans/CreatePlanModal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { PieChart } from "@mui/x-charts";
import Sidebar from "../../components/sidebar/Sidebar";

import { superAdminActions } from "../../contentSections/dashboard/superAdminActions";
import { adminActions } from "../../contentSections/dashboard/adminActions";
import { getStatsSuperAdmin } from "../../contentSections/dashboard/getStatsSuperAdmin";

export default function DashboardAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  const { data, isLoading, refetch } = useGetDashboardSuperAdminQuery();

  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const stores_count = data?.stores_count || 0;
  const users_count = data?.users_count || 0;
  const clients_count = data?.clients_count || 0;
  const plans_count = data?.plans_count || 0;
  const user_role = data?.user_role;
  const user_name = data?.user_name;

  const isAdmin = user_role === "admin";
  const isSuperAdmin = user_role === "superadmin";

  const statsSuperAdmin = getStatsSuperAdmin({
    stores_count,
    clients_count,
    users_count,
    plans_count,
  });

  useEffect(() => {
    refetch();
  }, [stores_count, users_count, clients_count, plans_count]);

  const handleModalSuccess = {
    category: () => refetch(),
    store: () => refetch(),
    client: () => refetch(),
    plan: () => refetch(),
  };

  const modalHandlers = {
    setIsStoreModalOpen,
    setIsClientModalOpen,
    setIsCategoryModalOpen,
    setIsPlanModalOpen,
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar user_role={user_role} />
      <div className="flex-1 ml-64">
        <div className="max-w-7xl mx-auto p-0 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-6 mb-10 border-b border-gray-200 pb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full p-2">
                <HiOutlineUserGroup className="w-10 h-10" />
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-500 font-medium leading-tight">
                  Hola,
                </p>
                {!isLoading && (
                  <a
                    href="/profile"
                    className="text-2xl font-bold text-blue-700 hover:text-blue-600 transition-all leading-tight flex items-center gap-2"
                  >
                    {user_name}
                  </a>
                )}
                <span className="text-xs text-gray-400">
                  ¡Bienvenido de nuevo!
                </span>
              </div>
            </div>
          </div>

          {isSuperAdmin && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
                {statsSuperAdmin.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl shadow-md p-2 flex flex-col items-center"
                  >
                    <div className="mb-2">{stat.icon}</div>
                    <span className="text-4xl font-bold text-gray-600">
                      {isLoading ? (
                        <span className="animate-pulse">...</span>
                      ) : (
                        stat.value
                      )}
                    </span>
                    <span
                      className={`${stat.textClass} text-base mt-2 text-center font-medium`}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-6">
                <div className="rounded-2xl shadow-md p-8 w-1/2">
                  <h2 className="text-xl font-bold text-gray-400 mb-6">
                    Acciones rápidas
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {superAdminActions(modalHandlers).map((action, index) => (
                      <ButtonFast
                        key={index}
                        icon={action.icon()}
                        text={action.text}
                        bgClass={action.bgClass}
                        textClass={action.textClass}
                        borderClass={action.borderClass}
                        onClick={action.action}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl shadow-md p-8 w-1/2">
                  {/* Graficas */}
                </div>
              </div>
            </>
          )}

          {isAdmin && (
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Calendario */}
                <div className="md:col-span-1 bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">
                  <h2 className="text-xl font-bold text-gray-400 mb-6">
                    Calendario
                  </h2>
                  {/* Si tienes react-calendar instalado, descomenta la siguiente línea y controla el estado */}
                  {/* <Calendar onChange={setSelectedDate} value={selectedDate} /> */}
                  <Calendar
                  // value={date}
                  // onChange={(e) => setDate(e.value)}
                  // inline
                  // showWeek
                  />
                </div>

                {/* Listado de reservaciones pendientes */}
                <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6 flex flex-col">
                  <h2 className="text-xl font-bold text-gray-400 mb-6">
                    Reservaciones
                  </h2>
                  <ul className="flex flex-col gap-4">
                    {/* Ejemplo de reservaciones, reemplaza por tu mapeo real */}
                    <li className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 shadow-sm">
                      <div>
                        <span className="font-semibold text-yellow-700">
                          10:00
                        </span>{" "}
                        - Corte de cabello con Juan Pérez
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-semibold transition">
                          Editar
                        </button>
                        <button className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-sm font-semibold transition">
                          Cancelar
                        </button>
                      </div>
                    </li>
                    <li className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 shadow-sm">
                      <div>
                        <span className="font-semibold text-yellow-700">
                          12:00
                        </span>{" "}
                        - Manicure con Ana López
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-semibold transition">
                          Editar
                        </button>
                        <button className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-sm font-semibold transition">
                          Cancelar
                        </button>
                      </div>
                    </li>
                    {/* ...más reservaciones */}
                  </ul>
                </div>
                {/* Acciones rápidas */}
                <div className="rounded-2xl shadow-md p-8">
                  <h2 className="text-xl font-bold text-gray-400 mb-6">
                    Acciones rápidas
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {adminActions.map((action, index) => (
                      <ButtonFast
                        key={index}
                        icon={action.icon()}
                        text={action.text}
                        bgClass={action.bgClass}
                        textClass={action.textClass}
                        borderClass={action.borderClass}
                        onClick={action.action}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl shadow-md p-8 md:col-span-2">
                  <h2 className="text-xl font-bold text-gray-400 mb-6">
                    Estadisticas
                  </h2>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 10, label: "Reservas" },
                          { id: 1, value: 20, label: "Clientes" },
                          { id: 2, value: 30, label: "Tiendas" },
                        ],
                        innerRadius: 50,
                        outerRadius: 90,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -45,
                        endAngle: 360,
                        cx: 150,
                        cy: 100,
                      },
                    ]}
                    width={400}
                    height={200}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer data={data} />

        {/* Modals */}
        <CreateCategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onSuccess={handleModalSuccess.category}
        />
        <CreateStoreModal
          isOpen={isStoreModalOpen}
          onClose={() => setIsStoreModalOpen(false)}
          onSuccess={handleModalSuccess.store}
        />
        <CreateClientModal
          isOpen={isClientModalOpen}
          onClose={() => setIsClientModalOpen(false)}
          onSuccess={handleModalSuccess.client}
        />
        <CreatePlanModal
          isOpen={isPlanModalOpen}
          onClose={() => setIsPlanModalOpen(false)}
          onSuccess={handleModalSuccess.plan}
        />
      </div>
    </div>
  );
}
