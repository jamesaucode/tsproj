import React, { useState, useEffect } from 'react'
import { useUserContext } from '../context/UserContext';
import { IUser } from '../../server/schemas/User';

export const useUserData = () : IUser => {
    const userData = useUserContext();

    return userData;
}