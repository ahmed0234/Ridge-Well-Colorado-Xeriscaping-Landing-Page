import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import OurServicesSection from "./components/OurServicesSection";
import WhatsIncludedSection from "./components/WhatsIncludedSection";
import HowItWorksSection from "./components/HowItWorksSection";
import PainProblemSection from "./components/Painproblem";
import TransformationSection from "./components/TransformationSection";
import TrustBar from "./components/Trustbar";

const page = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <OurServicesSection />
      <WhatsIncludedSection />
      <TransformationSection />
      <HowItWorksSection />
      <PainProblemSection />
      <TrustBar />
    </>
  );
};

export default page;
