import Image from "next/image";
import pin from '../../public/assets/images/icons/geo-locator.svg';
import dollar from '../../public/assets/images/icons/dollar-tag.svg';
import list from '../../public/assets/images/icons/list.png';
import manWomanDog from '../../public/assets/images/man-woman-dog.png';

const TitleSectionIcons = () => {
    return(
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
            <Image className='my-8 our-advantages-img' src={manWomanDog} alt="man looking at a laptop with a dog and a woman next to him" />
          </div>
        </div>
      </section>
    )
}

export default TitleSectionIcons;