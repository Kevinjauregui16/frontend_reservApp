import { SignIn, SignUp } from "@clerk/clerk-react";

//import Dashboard from "../components/Dashboard";
import Dashboard from "../pages/Dashboard";

export const routes = {
  private: [
    {
      path: "/",
      element: <Dashboard />,
    },
  ],
  public: [
    {
      path: "/sign-in",
      element: <SignIn routing="path" path="/sign-in" />,
    },
    {
      path: "/sign-up",
      element: <SignUp routing="path" path="/sign-up" />,
    },
  ],
};
