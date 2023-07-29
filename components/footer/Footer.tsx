import logo from '../../public/assets/images/logo-footer.png';
import Image from 'next/image';
import Link from 'next/link';
import './Footer.css';

const Footer = () => {
    return (
        <footer className='flex w-full bg-slate-400'>
            <div className='image-wrapper pt-1'>
                <Image src={logo} height="90" width="120" alt="petsit logo" />
            </div>

            <div className="flex footer-links">                
                <div className='flex flex-col'>
                    <h3 className='text-2xl font-semibold mb-2'>Услуги</h3> 
                    <Link href="/">Намерете гледач</Link>
                </div>

                <div className='flex flex-col'>
                    <h3 className='text-2xl font-semibold mb-2'>За PetSit</h3>
                    <Link href="/">За нас</Link>
                    <Link href="/">Условия на ползване</Link>
                    <Link href="/">Политика за поверителност</Link>
                    <Link href="/">Настройки на бисквитки</Link>
                </div>

                <div className='flex flex-col'>
                    <h3 className='text-2xl font-semibold mb-2'>Поддръжка</h3>
                    <Link href="/">Свържете се с нас</Link>
                    <Link href="/">Помощен център</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;