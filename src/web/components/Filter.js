import React, {useState, useEffect} from 'react'
import UserSelect from "./UserSelect";

const Filter = ({applyFunction}) => {
    useEffect(() => {
        localStorage.setItem('username', 'All users')
        localStorage.setItem('database', 'All databases')
        localStorage.setItem('date', null)
    },[])

    return (
        <div className={'filter-container'}>
            <div className={'filter-element-container'}>
                <div className={'filter-element'}>
                    <UserSelect />
                </div>

                <div className={'filter-element'}>
                    <label htmlFor={'from-time'}>From: </label>
                    <input type={'date'} name={'from-time'}
                           onChange={event => localStorage.setItem('date', event.target.value)}/>
                </div>

                <div className={'filter-element'}>
                    <label htmlFor={'database-select'}>Database: </label>
                    <select name={'database-select'}
                            onChange={event => localStorage.setItem('database', event.target.value)}>
                        <option>All Databases</option>
                        <option>BTTF</option>
                    </select>
                </div>
            </div>
            <button className={'filter-button apply-button'} onClick={applyFunction}>Apply Filter</button>
            <button className={'filter-button clear-button'}>Clear Filter</button>
        </div>
    )
}

export default Filter
