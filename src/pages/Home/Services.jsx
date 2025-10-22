import Footer from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar";
import AllServices from "../../components/services/AllServices";
import { useUser } from "@clerk/clerk-react";

export default function Services() {
  const { user } = useUser();
  return (
    <>
      <Navbar user={user} />
      <AllServices />
      <Footer />
    </>
  );
}
