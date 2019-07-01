import React, { useState, useEffect } from 'react';

export const useWindowSize = () => {
    const initialWindowSize = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const [windowSize, setWindowSize] = useState<number>(initialWindowSize);
    console.log(windowSize)
    const handleResize = () => {
        if (typeof window !== 'undefined') {
            setWindowSize(window.innerWidth);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [windowSize])

    return windowSize;
}
