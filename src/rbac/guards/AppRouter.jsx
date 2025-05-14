import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
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
    </Routes>
  );
}
