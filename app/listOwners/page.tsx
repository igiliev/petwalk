'use client';

import { useEffect, useState } from "react";
import ListingItems from "../../components/listingItems/ListingItems";
import { getUsers, USER_TYPES } from "../api/helper/users/realtimeDB";

const BecomeSitter = () => {
    const [ storeUsers, setStoreUsers ]: any[] = useState([]);

    useEffect( () => {
        getUsers(USER_TYPES.OWNERS).then( res => {
            return setStoreUsers(res);
        });
    }, [] );

    return <ListingItems userData={storeUsers} />
}

export default BecomeSitter;
