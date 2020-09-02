import React, {useEffect} from 'react'
import Layout from '../components/Layout'
import Overview from "../components/Overview";

const Home = () => {
    useEffect(() => {
        return () => {
            localStorage.clear();
        }
    }, [])

    return (
        <Layout>
            <Overview />
        </Layout>
    )
}

export default Home
