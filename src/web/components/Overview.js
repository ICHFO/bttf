import React, {useState, useEffect} from 'react'
import fetch from "node-fetch"
import DetailModal from "./DetailModal";
import Loader from "./Loader";
import Filter from "./Filter";
import cfg from "../../config.json"

const hostname = cfg.server.hostname
const port = cfg.server.port

const Overview = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState( null)
    const [queries, setQueries] = useState([])

    const [ts, setTs] = useState('')
    const [stmt, setStmt] = useState('')
    const [queryData, setQueryData] = useState([])

    const filterApply = (event, data) => {
        // make new call with current filter values
        const username = localStorage.getItem('username')
        const date = localStorage.getItem('date')
        const database = localStorage.getItem('database')

        setIsLoaded(false)

        fetch(`http://${hostname}:${port}/overview/filter`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
                date: date,
                database: database
            })
        })
            .then(response => response.json())
            .then(data => {
                setQueries(data.data)
                console.log(data.filter)
                setIsLoaded(true)
            }, error => {
                setError(error)
                setIsLoaded(true)
            })
    }

    const handleClick = (event) => {
        const row = event.target.parentElement
        const timestamp = row.childNodes[2].textContent
        const text = row.childNodes[1].textContent

        fetch(`http://${hostname}:${port}/detail`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                ts: timestamp,
                text: text
            })
        })
            .then(response => response.json())
            .then(data => {
                const qdata = data[1]
                setQueryData(qdata)
                setTs(timestamp)
                setStmt(text)
                const detail = document.getElementById('detail-modal')
                detail.style.display = 'block'
            }, error => {
                setError(error)
            })
    }

    useEffect( () => {
        fetch(`http://${hostname}:${port}/overview`)
            .then(response => response.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setQueries(result)
            },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                })
        },[])

    if(error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <Loader />
    } else {
        return (
            <>
                <Filter applyFunction={filterApply}/>
                <div className={'overview-container'}>
                    <DetailModal timestamp={ts} statement={stmt} queryData={queryData} />
                    <table className={'output-table'}>
                        <thead className={'output-table-header'}>
                        <tr>
                            <th>User</th>
                            <th>Query Text</th>
                            <th>Timestamp</th>
                        </tr>
                        </thead>
                        <tbody>
                        {queries.map( query => (
                            <tr key={query.ID} className={'overview-row'}
                                onClick={handleClick}>
                                <td>{query.USERID}</td>
                                <td>{query.TEXT}</td>
                                <td>{query.TS}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default Overview
