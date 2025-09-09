import Dashboard from "../pages/Dashboard";
import Services from "../pages/Services";
import Reservations from "../pages/Reservations";
import DashboardAdmin from "../pages/Dashboard_admin/DashboardAdmin";
import Login from "../pages/Login/Login";

export const routes = {
  private: [
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/reservations",
      element: <Reservations />,
    },
  ],
  public: [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard-admin",
      element: <DashboardAdmin />,
    }
    // {
    //   path: "/sign-in",
    //   element: <SignInPage />,
    // },
    // {
    //   path: "/sign-up",
    //   element: <SignUpPage />,
    // },
    // // Agrega esta ruta a tu configuración de rutas públicas
    // {
    //   path: "/sign-up/verify-email-address",
    //   element: <SignUp />, // o tu página de registro personalizada
    // },
    // {
    //   path: "/sign-in/factor-one",
    //   element: <SignIn />, // o <SignInPage /> si tienes una página personalizada
    // },
  ],
};
