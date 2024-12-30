import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faQuoteRight
} from "@fortawesome/free-solid-svg-icons";
import man from '../../public/assets/images/white-male1.png';
import man2 from '../../public/assets/images/man-2.png';
import woman from '../../public/assets/images/woman.png';

const Testimonials = () => {
    return (
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
    )
}

export default Testimonials;