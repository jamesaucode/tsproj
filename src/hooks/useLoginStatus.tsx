import React, { useState, useEffect } from 'react'
import { useUserContext } from '../context/UserContext';

export const useLoginStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const userData = useUserContext();
    useEffect(() => {
        if (userData) {
            setIsLoggedIn(true);
        }
    }, [userData])

    return isLoggedIn;
}