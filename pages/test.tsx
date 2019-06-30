import React from 'react';
import { Layout } from "../src/styles/shared";
import { useUserContext } from '../src/context/UserContext';

const Test = () => {
    const ctx = useUserContext();
    return (
        <Layout>
        </Layout>
    )
}

export default Test;