import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import BannerImg from "../../public/assets/images/banner-petsitter.jpeg";

const Banner = () => {
    return (
        <section className="flex lg:flex-row flex-col justify-evenly items-center py-20 bg-green-2 mb-12 px-5 lg:px-0 home-banner">
          <div className="flex flex-col items-center lg:w-6/12">
            <h1 className="text-3xl lg:text-4xl text-white text-center mb-7">
              Резервирайте <span className="text-gold font-semibold">доверени гледачи и разхождачи</span> които ще се отнасят към вашия домашен любимец като към семейство
            </h1>
            <p className="leading-6 text-grey-1 mb-7 text-base">
              Вече повече от 1 000 души използват PetSit.bg за да се грижат за домашните си любимци по време на дните в офиса или при пътувания
            </p>
            <div className="lg:my-5 max-sm:flex max-sm:flex-col text-center">
              <Link href="/register/regOptions" className="sm:mr-5 bg-gold max-sm:mb-3 text-white p-5 rounded hover:bg-white hover:text-black">
                Намерете гледач
              </Link>
              <Link href="/listSitters" className="bg-transparent text-white border-3 bg-gold-outline p-4 rounded">
                Разгледайте гледачите
              </Link>
            </div>
            <Link href="/register/regOptions" className="underline text-lg text-white my-5 font-semibold">
              Търсите работа като гледач на домашни любимци?
            </Link>
          </div>
    
          <div className="flex items-center justify-center max-w-full">
            <Image
              src={BannerImg}
              width={550}
              height={400}
              alt="woman-cuddling-dog"
              sizes="(max-width: 600px) 100vw, 550px"
              priority
              className="rounded-md home-banner-img-woman"
            />
          </div>
        </section>
      );
    };

export default Banner;