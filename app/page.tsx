import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import PainProblemSection from "./components/Painproblem";
import TransformationSection from "./components/TransformationSection";
import TrustBar from "./components/Trustbar";

const page = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustBar />
      <TransformationSection />
      <PainProblemSection />
    </>
  );
};

export default page;
