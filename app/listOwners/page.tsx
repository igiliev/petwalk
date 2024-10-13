'use client';

import { useEffect, useState } from "react";
import ListingItems from "../../components/listingItems/ListingItems";
import { getUsers } from "../api/helper/users/userService";

const BecomeSitter = (props: any) => {
    const [ storeUsers, setStoreUsers ]: any[] = useState([]);

    useEffect( () => {
        console.log('show owners');
        getUsers('owners').then( res => {
            // console.log(res);
            return setStoreUsers(res);
        });
    }, [] );

    return <ListingItems userData={storeUsers} />
}

export default BecomeSitter;
