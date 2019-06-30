import React, { useState, useEffect } from 'react'
import { useUserContext } from '../context/UserContext';

export const useUserData = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const userData = useUserContext();
    // useEffect(() => {
    //     if (userData) {
    //         setIsLoading(false);
    //     }
    // }, [userData])

    return userData;
}