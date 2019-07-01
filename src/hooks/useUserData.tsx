import React, { useState, useEffect } from 'react'
import { useUserContext } from '../context/UserContext';

export const useUserData = () => {
    const userData = useUserContext();

    return userData;
}