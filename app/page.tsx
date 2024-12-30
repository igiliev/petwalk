import './styles.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Banner from '../components/banner/Banner';
import Services from '../components/services/Services';
import StepsSection from "../components/stepsSection/StepsSection";
import Testimonials from "../components/testimonials/Testimonials";
import TitleSectionIcons from "../components/titleSectionIcons/TitleSectionIcons";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mt-20">
        {/* 1 First Section - Banner */}
        <Banner />

        {/* 2 Second Section - Services */}
        <Services />

        {/* 3 Third Section - Steps to hire */}
        <StepsSection />

        {/* 4 Line Break Banner */}
        <div className="bg-green-2 p-8 text-white mb-12">
          <h1 className="text-3xl text-center pt-2 mb-7">Резервирайте <span className="text-gold font-semibold">доверени гледачи и разхождачи</span> които ще се отнасят към вашия домашен любимец като към семейство</h1>
        </div>

        {/* 5 Our advantages */}
        <TitleSectionIcons />

        {/* 6 Testimonials */}
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}