import React from 'react'

const OutputTable = ({data}) => {
    if(data && data !== undefined && data.length > 0) {
        return (
            <table className={'output-table'}>
                <thead className={'output-table-header'}>
                <tr>
                    {Object.keys(data[0]).map(item => (
                        <th key={item}>{item}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {Object.values(data).map((row, i) => (
                    <tr key={i}>
                        {Object.values(row).map((col, j) => (
                            <td key={i+j}>{col}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        )
    } else {
        return <p>loading</p>
    }
}

export default OutputTable
