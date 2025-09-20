import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import TokenRoute from "./TokenRoute";
import { routes } from "..";

export default function AppRouter() {
  return (
    <Routes>
      {routes.public.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
      {routes.private.map(({ path, element }, index) => (
        <Route
          key={index}
          path={path}
          element={<PrivateRoute element={element} />}
        />
      ))}
      {routes.tokenRoute.map(({ path, element }, index) => (
        <Route
          key={index}
          path={path}
          element={<TokenRoute>{element}</TokenRoute>}
        />
      ))}
    </Routes>
  );
}
