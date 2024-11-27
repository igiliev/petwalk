import dogWoman from '../public/assets/images/home-first.png';
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faHouseChimneyUser,
  faPaw,
  faShieldDog,
  faHouseCircleCheck,
  faQuoteLeft,
  faQuoteRight
} from "@fortawesome/free-solid-svg-icons";
import './styles.css';
import ladyDog from '../public/assets/images/home-second.png';
import dollar from '../public/assets/images/icons/dollar-tag.svg';
import pin from '../public/assets/images/icons/geo-locator.svg';
import list from '../public/assets/images/icons/list.png';
import man from '../public/assets/images/white-male1.png';
import man2 from '../public/assets/images/man-2.png';
import woman from '../public/assets/images/woman.png';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import BannerImg from '../public/assets/images/banner-petsitter.jpeg';

export default function Home() {
  return (
    <>
      <Header />
      <main className="mt-20">
        {/* 1 First Section - Banner */}
        <section className="flex lg:flex-row flex-col justify-evenly items-center py-20 bg-green-2 mb-12 px-5 lg:px-0 home-banner">
          <div className='flex flex-col items-center lg:w-6/12'>
            <h1 className="text-3xl lg:text-4xl text-white text-center mb-7">Резервирайте <span className="text-gold font-semibold">доверени гледачи и разхождачи</span> които ще се отнасят към вашия домашен любимец като към семейство</h1>
            <p className="leading-6 text-grey-1 mb-7 text-base">Вече повече от 1 000 души използват PetSit.bg за да се грижат за домашните си любимци по време на дните в офиса или при пътувания</p>
            <div className='lg:my-5 max-sm:flex max-sm:flex-col text-center'>
              <Link href="/register/regOptions" className="sm:mr-5 bg-gold max-sm:mb-3 text-white p-5 rounded hover:bg-white hover:text-black">Намерете гледач</Link>
              <Link href="/listSitters" className="bg-transparent text-white border-3 bg-gold-outline p-4 rounded">Разгледайте гледачите</Link>
            </div>
            <Link href="/register/regOptions" className="underline text-lg text-white my-5 font-semibold">Търсите работа като гледач на домашни любимци?</Link>
          </div>

          <div className='flex items-center justify-center max-w-full'>
            <Image src={BannerImg} width='550' alt="woman-cuddling-dog" sizes='(max-width: 600px) 100vw' className='rounded-md home-banner-img-woman' />
          </div>
        </section>

        {/* 2 Second Section - Services */}
        <section>
          <h1 className="text-center text-4xl mb-12 px-2">Услуги за всяко куче</h1>
          <div className="flex mb-10 justify-evenly flex-col lg:flex-row px-5">
            <div className="left-col">

              <div className="flex items-center col-xs-12 col-sm-6 mb-7 lg:max-w-xl">
                <i className="fa-solid fa-house-chimney"></i>
                <FontAwesomeIcon icon={faHouseChimney} style={{ fontSize: 30, color: "#48A9A6" }}/>
                <div className="ml-4">
                  <h3 className="text-2xl font-semibold mb-2">Гледане във вашия дом</h3>
                  <p className="text-slate-500 leading-6">Вашият гледач ще се грижи за домашните ви любимци и за дома ви. Вашите домашни любимци ще получат цялото внимание от което се нуждаят, без да напускат дома си</p>
                </div>
              </div>

              <div className="flex items-center col-xs-12 col-sm-6 mb-7 lg:max-w-xl">
              <FontAwesomeIcon icon={faHouseChimneyUser} style={{ fontSize: 30, color: "#48A9A6" }}/>
                <div className="ml-4">
                  <h3 className="text-2xl font-semibold mb-2">В дома на гледача</h3>
                  <p className="text-slate-500 leading-6">Вашите домашни любимци остават в дома на гледача. Там те ще бъдат третирани като част от семейството в комфортна среда.</p>
                </div>
              </div>

              <div className="flex items-center col-xs-12 col-sm-6 mb-7 lg:max-w-xl">
              <FontAwesomeIcon icon={faPaw} style={{ fontSize: 30, color: "#48A9A6" }}/>
                <div className="ml-4">
                  <h3 className="text-2xl font-semibold mb-2">Разходка на кучета</h3>
                  <p className="text-slate-500 leading-6">Запазете посещение, за да осигурите на домашния си любимец ежедневна доза нужни упражнения.</p>
                </div>
              </div>
            </div>

            <div className="right-col">
            <div className="flex items-center col-xs-12 col-sm-6 mb-7 lg:max-w-xl">
              <FontAwesomeIcon icon={faShieldDog} style={{ fontSize: 30, color: "#48A9A6" }}/>
                <div className="ml-4">
                  <h3 className="text-2xl font-semibold mb-2">Дневна грижа за домашни любимци</h3>
                  <p className="text-slate-500 leading-6">Домашният ви любимец прекарва деня в дома на гледача. Оставяте го сутрин и взимате щастливо животинче вечерта.</p>
                </div>
              </div>

              <div className="flex items-center col-xs-12 col-sm-6 mb-7 lg:max-w-xl">
                <FontAwesomeIcon icon={faHouseCircleCheck} style={{ fontSize: 30, color: "#48A9A6" }}/>
                <div className="ml-4">
                  <h3 className="text-2xl font-semibold mb-2">Посещения на място</h3>
                  <p className="text-slate-500 leading-6">Вашият гледач идва в дома ви, за да си играе с домашните ви любимци, да ги нахрани или да почисти тоалетната им.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Third Section - Steps to hire */}
          <section className='bg-grey-2 pb-12 steps-to-hire'>
            <h2 className="text-center text-4xl mb-2 pt-8">Стъпки за наемане на гледач на домашни любимци</h2>
            <div className="bg-green-2 h-1 w-16 m-auto mb-20 rounded"></div>
            <div className="flex flex-col justify-center lg:flex-row px-5">
              <div className='m-auto'>
                <Image src={dogWoman} sizes='(max-width: 600px) 100vw' className='section-img-woman' alt="woman hugging a dog" />
              </div>
              <div className="flex flex-col">
                <div className='mb-10'>
                  {/* Step 1 */}
                  <div className='mb-5'>
                    <div className="flex items-center mb-3">
                      <span className="circle-border mr-3">1</span>
                      <h3 className="text-2xl font-semibold">Кажете ни от какво се нуждаете</h3>
                    </div>
                    <p className="text-slate-500">Помогнете ни да разберем какво търсите, като отговорите на няколко прости въпроса.</p>
                  </div>
                  {/* Step 2 */}
                  <div className='mb-5'>
                    <div className="flex items-center mb-3">
                      <span className="circle-border mr-3">2</span>
                      <h3 className="text-2xl font-semibold">Разгледайте най-добрите си съвпадения</h3>
                    </div>
                    <p className="text-slate-500 max-w-2xl">Сравнете гледачите на домашни любимци близо до вас по отношение на тяхната гъвкавост, цени и опит. След това поговорете с тези, които са ви харесали.</p>
                  </div>
                  {/* Step 3 */}
                  <div>
                    <div className="flex items-center mb-3">
                      <span className="circle-border mr-3">3</span>
                      <h3 className="text-2xl font-semibold">Наемете най-добрият гледач</h3>
                    </div>
                    <p className="text-slate-500">Насрочете час с избрания от вас гледач на домашни любимци и можете да започнете. Толкова е просто!</p>
                  </div>
                </div>
                <div className='text-center lg:text-left'>
                  <Link href="/register/regOptions" className="bg-green-2 text-white p-4 rounded mt-5 hover:bg-teal-700">Намерете гледач</Link>
                </div>
              </div>
            </div>
        </section>

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
        <section className='mb-12'>
          <h1 className="text-5xl text-center mb-5">ОТЗИВИ</h1>
          <div className="bg-green-2 h-1 w-60 m-auto mb-8 rounded"></div>
          <h3 className="text-center mb-10 text-2xl font-semibold">Какво казват нашите клиенти</h3>
          <div className="flex flex-col items-center lg:justify-evenly lg:flex-row mb-5">
            
            <div className="flex flex-col items-center bg-grey-2 max-w-xs p-10 rounded text-center justify-center lg:mb-5 mb-16 shadow-xl">
              <Image src={man} height="120" width="80" alt="man smiling" />
              <div className="w-20 bg-green-2 h-1 rounded mt-4"></div>
              <div className="relative">
                <FontAwesomeIcon icon={faQuoteLeft} style={{ position: "absolute", left:-30, top: 10, fontSize: 30 }}/>
                <p className="my-5">Много добра идея. Ползвал съм сайта три пъти до сега и всеки път си намирах човек много бързо. Препоръчвам ви да гледате ревютата и оценките преди да изберете някой.</p>
                <FontAwesomeIcon icon={faQuoteRight} style={{ position: "absolute", right: -20, bottom: 10, fontSize: 30 }}/>
              </div>
              <p className="text-lg font-bold">Борис В.</p>
            </div>

            <div className="flex flex-col items-center bg-grey-2 max-w-xs p-10 rounded text-center justify-center lg:mb-5 mb-16 shadow-xl">
              <Image src={man2} height="120" width="80" alt="man smiling" />
              <div className="w-20 bg-green-2 h-1 rounded mt-4"></div>
              <div className="relative">
                <FontAwesomeIcon icon={faQuoteLeft} style={{ position: "absolute", left:-30, top: 10, fontSize: 30 }}/>
                <p className="my-5 ">Наскоро използвахме PetSit за нашата котка и бяхме много впечатлени от услугата. Гледачката беше дружелюбна, професионална и се грижеше отлично за котката ни, докато отсъствахме. Ежедневно си пишехме и ни изпращаше снимки, което беше много приятно. Горещо препоръчваме!</p>
                <FontAwesomeIcon icon={faQuoteRight} style={{ position: "absolute", right: -30, bottom: 10, fontSize: 30 }}/>
              </div>
              <p className="text-lg font-bold">Виктор Георгиев</p>
            </div>

            <div className="flex flex-col items-center bg-grey-2 max-w-xs p-10 rounded text-center justify-center mb-5 shadow-xl">
              <Image src={woman} height="120" width="80" alt="woman smiling" />
              <div className="w-20 bg-green-2 h-1 rounded mt-4"></div>
              <div className="relative">
                <FontAwesomeIcon icon={faQuoteLeft} style={{ position: "absolute", left:-30, top: 10, fontSize: 30 }}/>
                <p className="my-5">Страхотен първи опит със сайта. След като пуснах обява получих много отговори и намерих моят гледач много бързо, за голяма радост на моето кученце.</p>
                <FontAwesomeIcon icon={faQuoteRight} style={{ position: "absolute", right: -20, bottom: 10, fontSize: 30 }}/>
              </div>
              <p className="text-lg font-bold">Анастасия Рускова</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}