import Header from "../../components/header/Header";
import Footer from "../../components/Footer/Footer";

const Help = () => {
  {/* suggestion: since the text is quite a lot, we can make a small subnav with 2 buttons - client/user which
  enables the user to click, so we can load the related text upon request.  */}
  return (
    <>
      <Header />
      <div className="lg:px-36 mt-32 text-center flex flex-col leading-5">
        <h2 className="text-4xl font-bold">Често задавани въпроси от клиенти</h2>
        <div className="w-2/3 text-justify [&_div]:my-8 self-center">
          <div className="[&_h3]:font-medium [&_h3]:text-2xl [&_h3]:my-3 [&_p]:text-xl">
            <h3>Как мога да намеря и да се свържа с гледачите на домашни любимци в PetSit?</h3>
            <p>
              Използвайте безплатния инструмент за търсене на нашия уебсайт, за да намерите и да изпратите съобщение на гледачите на домашни любимци. Препоръчваме ви да си създадете профил, като кликнете върху &ldquo;Регистрация&rdquo; или &ldquo;Намерете гледач&rdquo; на нашата начална страница.
            </p>
            <p>
              Гледачите на домашни любимци, които се интересуват от вашата заявка, ще се свържат с вас възможно най-скоро чрез системата за съобщения на PetSit. За да увеличите шансовете си за намиране на подходящия гледач за вашия домашен любимец ви препоръчваме да изпратите съобщения на всички гледачи, които ви интересуват
            </p>
          </div>
          <div className="[&_h3]:font-medium [&_h3]:text-2xl [&_h3]:my-3 [&_p]:text-xl">
            <h3>Мога ли да се свържа с няколко гледачи на домашни любимци едновременно?</h3>
            <p>Да. Системата за съобщения на PetSit ви позволява да изпращате известия и да обменяте съобщения с няколко гледачи на домашни любимци едновременно, но можете да изберете само един гледач на домашни любимци, когато правите резервация. </p>
          </div>
          <div className="[&_h3]:font-medium [&_h3]:text-2xl [&_h3]:my-3 [&_p]:text-xl">
            <h3>Колко време е необходимо, за да получите отговор от гледач на домашни любимци?</h3>
            <p>Не се притеснявайте, ако не получите отговор веднага. Нашите гледачи проверяват редовно профилите си и ще ви отговорят в рамките на максимум 24 часа. Обикновено първите отговори пристигат само няколко часа след вашата заявка.</p>
          </div>
          <div className="[&_h3]:font-medium [&_h3]:text-2xl [&_h3]:my-3 [&_p]:text-xl">
            <h3>Колко струва използването на PetSit?</h3>
            <p>Създаването на акаунт и изпращането на съобщения до гледачите в платформата PetSIt е напълно безплатно</p>
          </div>
          <div className="[&_h3]:font-medium [&_h3]:text-2xl [&_h3]:my-3 [&_p]:text-xl">
            <h3>Колко трябва да плащам на гледачите?</h3>
            <p>В PetSit вярваме, че е справедливо да оставим нашите гледачи на домашни любимци сами да определят цените си. Цената на всеки гледач се показва ясно в профила му, така че винаги да знаете предварително цената на услугата му. Тази такса трябва да се плати директно на лицето, което се грижи за домашния ви любимец.</p>
          </div>
          <div className="[&_h3]:font-medium [&_h3]:text-2xl [&_h3]:my-3 [&_p]:text-xl">
            <h3>Какво трябва да дам на гледача в деня, в който му оставям домашния си любимец?</h3>
            <p>Препоръчваме ви да оставите на гледача на домашни любимци всичко най-важно: повод, храна, играчки, легло и цялата необходима медицинска информация. </p>
            <p>Препоръчваме също така да уведомите предварително Вашия гледач на домашни любимци за всички допълнителни изисквания към Вашия домашен любимец чрез нашата онлайн услуга за съобщения &#40;напр. ако Вашият домашен любимец е на специална диета или приема някакви лекарства&#41;.</p>
          </div>
          <div className="[&_h3]:font-medium [&_h3]:text-2xl [&_h3]:my-3 [&_p]:text-xl">
            <h3>Как мога да знам, че гледача ще се грижи добре за моя домашен любимец?</h3>
            <p>Безопасността и доброто състояние на вашия домашен любимец са наш основен приоритет. За тази цел сме създали строг процес на валидиране: когато даден детегледач се регистрира на нашия уебсайт, нашият екип внимателно преглежда профила му и приема само кандидати, които отговарят на високите стандарти на PetSit.</p>
            <p>Освен това разполагаме със система за обратна връзка, която позволява на клиентите ни да оценят своя гледач на домашни любимци след извършване на услугата. Това означава, че можете да прегледате всички отзиви на клиентите, за да ви помогнат да вземете решение</p>
          </div>
        </div>
        <h2 className="text-4xl font-bold">Често задавани въпроси от гледачи</h2>
        <div className="w-2/3 text-justify [&_div]:my-8 self-center">
          <div className="[&_h3]:font-medium [&_h3]:text-2xl [&_h3]:my-3 [&_p]:text-xl">
            <h3>Как мога да стана гледач на домашни любимци?</h3>
            <p>
              Първо, трябва да създадете акаунт в PetSit, като кликнете тук &#40;<a href="#">ЛИНК</a>&#41;. Попълнете цялата необходима информация, както и видовете услуги, които желаете да предлагате Моля, опишете опита си с животни и добавете профилна снимка, за да направите профила си по-привлекателен и да спечелите доверието на бъдещите си клиенти
            </p>
            <p>
              След като профилът ви бъде завършен, той ще бъде проверен от нашия екип, който ще ви уведоми дали е необходимо да направите промени и ако е необходимо, как да ги направите. След като профилът ви бъде потвърден, профилът ви ще бъде активиран и ще можете да получавате известия от нашите клиенти.
            </p>
          </div>
          <div className="[&_h3]:font-medium [&_h3]:text-2xl [&_h3]:my-3 [&_p]:text-xl">
            <h3>Колко трябва да плащам на гледачите?</h3>
            <p>В PetSit вярваме, че е справедливо да оставим нашите гледачи на домашни любимци сами да определят цените си. Цената на всеки гледач се показва ясно в профила му, така че винаги да знаете предварително цената на услугата му. Тази такса трябва да се плати директно на лицето, което се грижи за домашния ви любимец.</p>
          </div>
          <div className="[&_h3]:font-medium [&_h3]:text-2xl [&_h3]:my-3 [&_p]:text-xl">
            <h3>Има ли конкретен график, по който трябва да работя?</h3>
            <p>Ние не наемаме пряко гледачи на домашни любимци. Те нямат никакви задължения към нас и са свободни да избират часовете, които им допадат. Те също така са свободни да приемат или отхвърлят предложението на клиента.</p>
          </div>
          <div className="[&_h3]:font-medium [&_h3]:text-2xl [&_h3]:my-3 [&_p]:text-xl">
            <h3>Мога ли да търся и да се свързвам директно с клиентите на PetSit?</h3>
            <p>Можете да увеличите шансовете си, като добавите снимки в профила си и напишете няколко реда, в които да обясните мотивацията си за тази работа. Това помага на клиента да разбере по-добре кой сте и какъв опит имате</p>
          </div>
          <div className="[&_h3]:font-medium [&_h3]:text-2xl [&_h3]:my-3 [&_p]:text-xl">
            <h3>Как мога да получа повече съобщения?</h3>
            <p>Да. Винаги можете да поемете инициативата и да потърсите обявите на хора търсещи услуги от бутона &ldquo;Намерете работа&rdquo;.</p>
          </div>
          <div className="[&_h3]:font-medium [&_h3]:text-2xl [&_h3]:my-3 [&_p]:text-xl">
            <h3>Как се плаща на гледачите на домашни любимци? Колко мога да спечеля?</h3>
            <p>Договорената сума се заплаща директно от клиента, обикновено след приключване на услугата. Вие и клиентът трябва да обсъдите начина на заплащането . В PetSit вярваме, че е справедливо да позволим на нашите гледачи на домашни любимци сами да определят тарифите си за услугите, които предоставят. </p>
            <p>Когато създавате своя акаунт като Гледач на домашни любимци, дневната ви тарифа е зададена по подразбиране. След това можете да я коригирате чрез достъп до &ldquo;Настройки&rdquo;. Не забравяйте да проверявате дневната си тарифа и да я променяте, ако желаете. </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Help;