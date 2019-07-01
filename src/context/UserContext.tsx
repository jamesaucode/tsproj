import React, { createContext, useState, useEffect, useContext } from 'react';
import { handleJSONResponse } from '../../services/fetch.service';
require('dotenv').config();

const host = process.env.HOST;
export const UserContext = createContext<any | null>(null);

export const UserProvider = ({children}: any) => {
    const [data, setData] = useState();
    const url = `https://${host}/api/profile`
    useEffect(() => {
        fetch(url, {
            method: "GET",
            credentials: 'include'
        })
        .then(handleJSONResponse)
        .then(json => {
            console.log('Data fetched ...');
            console.log(json);
            setData(json)
        })
    }, []);
    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);
