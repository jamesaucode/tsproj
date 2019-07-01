import React, { useState, useEffect } from 'react';

export const useWindowSize = () => {
    const initialWindowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const initialWindowHeight = typeof window !== 'undefined' ? window.innerHeight: 1000;
    const [windowWidth, setWindowWidth] = useState<number>(initialWindowWidth);
    const [windowHeight, setWindowHeight] = useState<number>(initialWindowHeight);
    // console.log(windowWidth)
    console.log(windowHeight);
    const handleResize = () => {
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [windowWidth, windowHeight])

    // return windowWidth;
    return { size: { windowWidth, windowHeight } };
}
