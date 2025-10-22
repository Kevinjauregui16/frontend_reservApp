import Home from "../pages/Home/Home";
import Services from "../pages/Home/Services";
import Reservations from "../pages/Home/Reservations";

import Dashboard from "../pages/Dashboard_admin/Dashboard";

import Login from "../pages/Login/Login";

import TokenRoute from "./guards/TokenRoute";

export const routes = {
  //rutas para usuarios autenticados con clerk
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

  //rutas para super admin y admins
  tokenRoute: [
    {
      path: "/dashboard",
      element: (
        <TokenRoute>
          <Dashboard />
        </TokenRoute>
      ),
    },
  ],

  //rutas publicas
  public: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
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
