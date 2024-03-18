import Hero from "../components/Hero";
import MainServices from "../components/MainServices";
import Services from "../components/Services";
import Doctors from "../components/Doctors";
import FrequentQuestions from "../components/FrequentQuestions";

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <MainServices />
      <Doctors />
      <FrequentQuestions />
    </>
  );
}

export default Home;
