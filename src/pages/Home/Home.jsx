import Banner from "../../components/banner/Banner";
import Navbar from "../../components/navbar/Navbar";
import BannerServices from "../../components/services/BannerServices";
import BannerHowItWork from "../../components/howItWork/BannerHowItWork";
import BannerFeaturedBusinesses from "../../components/featuredBusinesses/BannerFeaturedBusinesses";
import BannerReadyToBook from "../../components/readyToBook/BannerReadyToBook";
import Footer from "../../components/footer/Footer";

import { useUser } from "@clerk/clerk-react";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <>
      <Navbar user={user} />
      <Banner user={user} />
      <BannerServices user={user} />
      <BannerHowItWork />
      <BannerFeaturedBusinesses />
      <BannerReadyToBook user={user} />
      <Footer />
    </>
  );
}
