import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import { NavbarHello } from "../components/navbar";

import { useGetDashboardSuperAdminQuery } from "../services/dashboardSuperAdmin";

export default function MainLayout({ children }) {
  const { data, isLoading} = useGetDashboardSuperAdminQuery();
  const user_name = data?.user_name;
  const user_role = data?.user_role;

  return (
    <div className="min-h-screen flex">
      <Sidebar user_role={user_role} />
      <div className="flex-1 ml-64 px-6">
        <NavbarHello user_name={user_name} isLoading={isLoading} />
        {children}
        <Footer data={data} />
      </div>
    </div>
  );
}
