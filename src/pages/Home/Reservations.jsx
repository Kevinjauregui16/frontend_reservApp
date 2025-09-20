import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import ListReservations from "../../components/reservations/ListReservations";
import { useUser } from "@clerk/clerk-react";

export default function Reservations() {
  const { user } = useUser();
  return (
    <>
      <Navbar user={user} />
      <ListReservations user={user} />
      <Footer />
    </>
  );
}
