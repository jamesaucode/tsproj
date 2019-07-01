import React, { useState, useEffect } from 'react';

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
    const handleResize = () => {
        setWindowSize(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [windowSize])
    return windowSize;
}
