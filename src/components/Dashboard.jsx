import { useUser, RedirectToSignIn, UserButton } from "@clerk/clerk-react";
import ServicesList from "./ServicesList";

export default function Dashboard() {
  const { isSignedIn } = useUser();
  console.log("isSignedIn", isSignedIn);

  if (!isSignedIn) return <RedirectToSignIn />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between bg-white shadow-md p-4 rounded">
        <h2 className="text-xl font-semibold">Estás autenticado 🎉</h2>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
      <h3 className="text-lg mt-6 font-semibold">Servicios Disponibles:</h3>
      <ServicesList />
    </div>
  );
}
