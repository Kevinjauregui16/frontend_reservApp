import Banner from "../components/banner/Banner";
import Navbar from "../components/navbar/Navbar";
import BannerServices from "../components/services/BannerServices";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Banner />
      <BannerServices />
    </>
  );
}
