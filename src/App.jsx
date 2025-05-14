import { BrowserRouter } from "react-router-dom";
import AppRouter from "./rbac/guards/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
