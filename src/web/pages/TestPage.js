import React, {useState} from 'react';
import Layout from "../components/Layout";
import Loader from "../component-pack/Loader";

const TestPage = () => {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    return (
        <Layout>
            <Loader />
        </Layout>
    )
}

export default TestPage
