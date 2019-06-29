import React from 'react';
import { Layout, Heading } from "../src/styles/shared";
import Modal from '../src/components/Modal';
import Login from '../pages/login';

const Test = () => {
    return (
        <Layout>
            <Heading>Test Page</Heading>
            <Modal Embedded={Login} />
        </Layout>
    )
}

export default Test;