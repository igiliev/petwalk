import Header from "../header/Header";
import Footer from "../footer/Footer";
import Image from "next/image";
import defaultUserImg from '../../public/assets/images/icons/dog-walking.webp';

const ListingItems = (props: any) => {

    const handleChange = () => {

    }

    const handleSearch = () => {
        
    }

    const mappedUsers: any = props.userData.map( (user: any): any => {
        const hoodLabels = user.selectedHoods.map( (hood: any): any => <span className="font-semibold" key={hood.id}>{` ${hood.label},`}</span> );
        const servicesLabels =  user.selectedServices.map( (serviceLabel:any):any => <strong key={user.id + Math.floor( Math.random() * 1000 )}>{`${serviceLabel}, `}</strong> );

        return (
            <div className="flex lg:flex-row flex-col items-center w-full border bg-gray-100 my-5 shadow-lg p-5 rounded-md" key={user.id}>
                <div className="p-5">
                    <Image src={ user.userImage === 'default' ? defaultUserImg : user.userImage } alt="user profile image" width="70" height="40" />
                </div>
                <div>
                    <h1 className="text-2xl font-medium">{user.name}</h1>
                    <div>
                        <span>{user.dailyRate}лв на </span>
                        <span>{user.dailyRateOption === 'day' ? 'ден' : 'час'}</span>
                        <p className="my-3">Избрани квартали: { hoodLabels }</p>
                        <p>Предлагани услуги: { servicesLabels }</p>
                        <p className="my-3">{user.describtion}</p>
                    </div>
                </div>
            </div>
        )
    } );


    return (
        <div className="pt-44 w-full h-full bg-gray-300">
        <Header />
        <div className="flex flex-col findSitters-inner lg:flex-row mb-10">
            <div className="flex flex-col shadow-xl bg-gray-100 p-3">
                <input onChange={handleChange} className="border rounded py-2 pl-3" type="text" placeholder="Търсете по квартал" />
                <button className="hover:bg-gray-300 hover:text-black mt-3 border rounded bg-red-500 text-white py-1 text-lg" type="submit" onClick={handleSearch}>Търсене</button>
            </div>
            <div className="w-full lg:ml-20 p-7 border-1 border-black">
                <h1 className="text-center text-xl mb-5">Налични гледачи в избраните квартали</h1>
                { mappedUsers }
            </div>
        </div>
        <Footer />
    </div>
    )
}

export default ListingItems;