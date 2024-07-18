'use client';

import { useEffect, useState } from "react";
import ListingItems from "../../components/listingItems/ListingItems";
import { getUsers } from "../api/helper/users/userService";

const BecomeSitter = (props: any) => {
    const [ storeUsers, setStoreUsers ]: any[] = useState([]);

    useEffect( () => {
        getUsers('owners').then( res => {
            if(res.length)
                console.log(res);

            setStoreUsers(res) 
        });
    }, [] );

    return (
        <div>
            <h1>Become a sitter baby</h1>
            <ListingItems userData={storeUsers} />
        </div>
    )
}

export default BecomeSitter;
