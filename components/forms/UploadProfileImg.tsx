'use client';
import man from '../../public/assets/images/man-1.png';
import man2 from '../../public/assets/images/man-2.png';
import woman from '../../public/assets/images/woman.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { storage } from '../../firebase/config';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { GetStoreData } from '../../public/interfaces/globals';

const UploadProfileImg = (props: any) => {
    const [ selectedImg, setSelectedImg ]: any = useState(null);
    const [ uploadingImg, setUploadingImg ] = useState(false);
    const [ userImageUrl, setUserImageUrl ] = useState('');
    const [ petSitter, setPetsitter ] = useState(false);
    const getState: any = useSelector<GetStoreData>( state => state.dataStore.data );
    const [ nextDisabled, setNextDisabled ] = useState(true);
    const userImageLisRef = ref( storage, "/profileImages" );
    const getState: any = useSelector<getStoreData>( state => state.dataStore.data );
    
    useEffect( () => {
        setPetsitter(getState.find( (item: any): any => item['regOption'] ).regOption === 'sitter');

        listAll(userImageLisRef).then(res => {
            res.items.forEach( item => {
                getDownloadURL(item).then(url => {
                    setUserImageUrl(url);
                });
            });
        });
    }, [  ] );

    const chooseImage = (event: any) => {
        setSelectedImg( event.target.files[0] );
        setNextDisabled(false);
        
        if ( selectedImg === null ) return;
    }

    const handleSkipStep = (event: any) => {
        event.preventDefault();
        props.handleData({userImg: 'default'});
        props.nextFormStep( !petSitter ? 'ownerSkip' : 'skip' );
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const imageRef: any = ref(storage, `profileImages/${selectedImg.name + v4()}`);
        setUploadingImg(true);
        // Uploading the image to firebase storage and passing the image url to redux
        uploadBytes(imageRef, selectedImg).then( (snapshot: any): any => {
            getDownloadURL(snapshot.ref).then((url) => {
                props.handleData({userImg: url});
            });
        } );
        setUploadingImg(false);
        props.nextFormStep( !petSitter ? 'owner' : '');
    }

    return (
        uploadingImg ?
        <h1 className='text-center'>Зареждане...</h1>
        :
        <form onSubmit={handleSubmit}>
            <h1 className="font-semibold text-2xl text-center mb-5">Добавете профилна снимка</h1>
            <h3 className='text-center text-slate-500 font-semibold mb-5'>{`Добавете снимка, за да увеличите шансовете си за намиране на ${ petSitter ? 'работа.' : 'гледачи' } `}</h3>
            <div className='flex justify-evenly mb-5'>
                <Image src={man} height="120" width="80" alt="man smiling" />
                <Image src={man2} height="120" width="80" alt="man smiling" />
                <Image src={woman} height="120" width="80" alt="woman smiling" />
            </div>
            <div className='mb-5'>
                <h3 className='text-lg font-semibold mb-5'>Направете добро първо впечатление:</h3>
                <ul className='list-disc'>
                    <li>Използвайте ясна снимка на вашето лице</li>
                    <li>Застанете в центъра и се усмихнете</li>
                    <li>Избягвайте снимки с текст</li>
                </ul>
            </div>
            <div className="flex flex-col w-full">
                <input type="file" name="myImage" onChange={chooseImage} className="mb-5" />
                <button disabled={ nextDisabled } className={`bg-green-2 p-4 w-full text-white text-xl mt-4 rounded ${nextDisabled ? 'disabled' : ''} `}>Добави снимка</button>
                <button onClick={handleSkipStep} className="bg-slate-300 py-2 w-full text-white text-xl mt-4 rounded">Пропусни</button>
            </div>
        </form>
    )
}

export default UploadProfileImg;
