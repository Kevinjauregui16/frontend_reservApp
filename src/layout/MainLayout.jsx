import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import { NavbarHello } from "../components/navbar";

export default function MainLayout({ children, data, isLoading }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar user_role={data?.user_role} />
      <div className="flex-1 ml-64 px-6">
        <NavbarHello user_name={data?.user_name} isLoading={isLoading} />
        {children}
        <Footer data={data} />
      </div>
    </div>
  );
}
