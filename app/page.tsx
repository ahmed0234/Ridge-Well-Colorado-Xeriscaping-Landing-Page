import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import WhatsIncludedSection from "./components/WhatsIncludedSection";
import HowItWorksSection from "./components/HowItWorksSection";
import PainProblemSection from "./components/Painproblem";
import TransformationSection from "./components/TransformationSection";
import TrustBar from "./components/Trustbar";
import AreasServed from "./components/Areasserved";
import RidgewellFAQCTA from "./components/Faq";
import ReviewsSection from "./components/Review";
import MobileConsultationSection from "./components/MobileConsultationSection";

const page = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhatsIncludedSection />
      <TransformationSection />
      <HowItWorksSection />
      <PainProblemSection />
      <AreasServed />
      <TrustBar />
      <ReviewsSection />
      <RidgewellFAQCTA />
      <MobileConsultationSection />
    </>
  );
};

export default page;
