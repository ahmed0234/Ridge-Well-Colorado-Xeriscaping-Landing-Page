import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import TransformationSection from "./components/TransformationSection";
import TrustBar from "./components/Trustbar";

const page = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustBar />
      <TransformationSection />
    </>
  );
};

export default page;
