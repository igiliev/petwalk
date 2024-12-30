import Image from "next/image";
import Link from "next/link";
import womanHuggingDog from "../../public/assets/images/woman-hugging-dog.png";

const StepsSection = () => {
    return (
        <section className='bg-grey-2 pb-12 steps-to-hire'>
        <h2 className="text-center text-4xl mb-2 pt-8">Стъпки за наемане на гледач на домашни любимци</h2>
        <div className="bg-green-2 h-1 w-16 m-auto mb-20 rounded"></div>
        <div className="flex flex-col justify-center lg:flex-row px-5">
          <div className='m-auto'>
            <Image src={womanHuggingDog} sizes='(max-width: 600px) 100vw' className='section-img-woman' alt="woman hugging a dog" />
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
    );
}

export default StepsSection;