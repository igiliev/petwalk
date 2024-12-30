import Image from "next/image";
import './styles.css';
import ladyDog from '../public/assets/images/home-second.png';
import dollar from '../public/assets/images/icons/dollar-tag.svg';
import pin from '../public/assets/images/icons/geo-locator.svg';
import list from '../public/assets/images/icons/list.png';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Banner from '../components/banner/Banner';
import Services from '../components/services/Services';
import StepsSection from "../components/stepsSection/StepsSection";
import Testimonials from "../components/testimonials/Testimonials";

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
        <section className='mb-12 our-advantages'>
          <h1 className="text-center text-5xl mb-20">Нашите предимства</h1>
          <div className="flex flex-col justify-evenly lg:flex-row">
            <div className="flex flex-col justify-evenly lg:w-6/12 px-5">

              <div className="flex border-b-2 pb-5 mb-5">
                <Image src={pin} height="60" width="40" alt="geolocation pin icon" className="mr-5" />
                <div>
                  <h3 className='text-2xl font-semibold mb-2'>Надеждни гледачи близо до вас</h3>
                  <p className='text-slate-500 leading-6'>Вашият домашен любимец е част от семейството ви и това е начинът, по който се отнасяме към него. В нашата платформа ще намерите само надеждни гледачи на домашни любимци, намиращи се близо до вас.</p>
                </div>
              </div>

              <div className="flex border-b-2 pb-5 mb-5">
                <Image src={dollar} height="60" width="40" alt="geolocation pin icon" className="mr-5" />
                <div>
                  <h3 className='text-2xl font-semibold mb-2'>Лесно намиране на подходящ гледач</h3>
                  <p className='text-slate-500 leading-6'>С помощта на различни опции за филтриране и нашата уникална платформа за търсене, ви предлагаме най-подходящите гледачи на домашни любимци. Независимо дали става дума за космат, пернат или люспест приятел, ние имаме подходящата опция за вас!</p>
                </div>
              </div>

              <div className="flex items-center border-b-2 pb-5">
                <Image src={list} alt="list icon" className="mr-5 h-14 w-auto" />
                <div>
                  <h3 className='text-2xl font-semibold mb-2'>Гледач за всеки повод</h3>
                  <p className='text-slate-500 leading-6'>От бърза разходка в парка до едномесечна ваканция - през цялата година можете да намерите подходящ гледач за всеки повод.</p>
                </div>
              </div>
            </div>
            <div className='m-auto lg:m-0 max-w-full'>
              <Image className='my-8 our-advantages-img' src={ladyDog} alt="lady on laptop with a dog next to her" />
            </div>
          </div>
        </section>

        {/* 6 Testimonials */}
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}