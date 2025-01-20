'use client';

import { useEffect, useState } from "react";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";
import ListingItems from "../../components/listingItems/ListingItems";
import { getUsers, USER_TYPES } from '../api/helper/users/realtimeDB';

const FindSitters = () => {
    const [ storeUsers, setStoreUsers ]: any[] = useState([]);
    const [ userImageList, setUserImageList ] = useState([]);
    const userImageLisRef = ref( storage, "/profileImages" );

    useEffect( () => {
        getUsers(USER_TYPES.SITTERS).then( res => setStoreUsers(res) );

        listAll(userImageLisRef).then(res => {
            res.items.forEach( item => {
                getDownloadURL(item).then(url => {
                    setUserImageList( (prevItem): any => [...prevItem, url]);
                });
            } );
        });
    }, [] );

    return (
        <ListingItems userData={storeUsers} />
    )
}

export default FindSitters;
