import React, { useRef, useState, useEffect } from 'react';
import { Context } from './Context';

const Provider = () => {
    const root  = useRef<Node | null>(null);
    const id = useRef([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        root.current = document.createElement('div');
        document.body.appendChild(root.current);
        return () => {
           id.current.forEach(clearTimeout);
           if (root.current) {
            document.body.removeChild(root.current);
           }
        };
    }, [])

    // const remove = (notification) => {

    // }
}
