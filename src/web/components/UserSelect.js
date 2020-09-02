import React, {useState, useEffect} from 'react'
import fetch from "node-fetch";
import cfg from "../../config.json"

const hostname = cfg.server.hostname
const port = cfg.server.port

const UserSelect = () => {

    const [error, setError] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState('')

    useEffect(() => {
        fetch(`http://${hostname}:${port}/userIds`)
            .then(response => response.json())
            .then(result => {
                setUsers(result)
                setLoaded(true)
            }, error => {
                console.log(error)
                setError(error)
            })
    },[])

    if (!loaded) {
        return (
            <>
                <label htmlFor={'user-select'}>User: </label>
                <select name={'user-select'}>
                    <option>Loading...</option>
                </select>
            </>
        )
    } else {
        return (
            <>
                <label htmlFor={'user-select'}>User: </label>
                <select name={'user-select'}
                        onChange={event => localStorage.setItem('username', event.target.value)}>
                    <option>All users   </option>
                    {users.map((user, index) => (
                        <option key={index}>{user.USERID}</option>
                    ))}
                </select>
            </>
        )
    }
}

export default UserSelect
