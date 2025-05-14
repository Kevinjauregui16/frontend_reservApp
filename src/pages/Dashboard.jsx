import Banner from "../components/banner/Banner";
import Navbar from "../components/navbar/Navbar";
import BannerServices from "../components/services/BannerServices";
import BannerHowItWork from "../components/howItWork/BannerHowItWork";
import BannerFeaturedBusinesses from "../components/featuredBusinesses/BannerFeaturedBusinesses";
import BannerReadyToBook from "../components/readyToBook/BannerReadyToBook";
import Footer from "../components/footer/Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Banner />
      <BannerServices />
      <BannerHowItWork />
      <BannerFeaturedBusinesses />
      <BannerReadyToBook />
      <Footer />
    </>
  );
}
