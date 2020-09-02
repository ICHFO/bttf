import React, { useState, useEffect } from 'react'
import Layout from "../components/Layout";

const testdata = {
    ts: "2020-08-28 08:55:16.124329",
    text: "select c.fname, c.lname, a.balance from icws.customer c, icws.account a where c.id = a.customer_id"
}

const Detail = () => {

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [queryData, setQueryData] = useState([])

    useEffect( () => {
        fetch('http://localhost:3000/detail', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                ts: sessionStorage.getItem('ts'),
                text: sessionStorage.getItem('text')
            })
        })
            .then(response => response.json())
            .then(data => {
                const qdata = data[1]
                setQueryData(qdata)
                setIsLoaded(true)
            }, error => {
                setIsLoaded(true)
                setError(error)
            })}
        ,[])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <Layout>
                <div className={'overview-container'}>
                    <table className={'output-table'}>
                        <thead>
                        <tr>
                            {Object.keys(queryData[0]).map( (item, i) => (
                                <td key={i}>{item.toLowerCase()}</td>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {queryData.map((row, j) => (
                            <tr key={j}>
                                {Object.values(row).map((value, k) => (
                                    <td key={k}>{value}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </Layout>
        )
    }
}

export default Detail
