const ibmdb = require('ibm_db')
const cfg = require('../config.json')
const sql = require('../sql.json')

const cn = cfg.database.cn
const cnopts = cfg.database.cnopts

const getQueries = (handler) => {
    const sql = `select id, text, ts, userid from bttf.queries`
    ibmdb.open(cn,cnopts)
        .then( conn => queryTabel(conn, sql, handler))
        .catch( err => console.log(err))
        .finally( conn => closeConn(conn))
}

const getQueriesFiler = (filter, handler) => {
    const sql = `select id, text, ts, userid from bttf.queries ` + filter
    console.log(sql)
    ibmdb.open(cn,cnopts)
        .then( conn => queryTabel(conn, sql, handler))
        .catch( err => console.log(err))
        .finally( conn => closeConn(conn))
}


const historyQuery = (ts, text, handler) => {
    const sql = `set current temporal system_time = '${ts}'; ${text}`;
    ibmdb.open(cn, cnopts)
        .then( conn => queryTabel(conn, sql, handler))
        .catch( err => console.log(err))
}

const getUserIds = (handler) => {
    const sql = 'select distinct userid from bttf.queries';
    ibmdb.open(cn, cnopts)
        .then( conn => queryTabel(conn, sql, handler))
        .catch( err => console.log(err))
}

const queryTabel = (conn, sql, handler) => {
    conn.query(sql)
        .then(rows => handler(rows))
        .catch(err => console.log(err))
}

const closeConn = (conn) => {
    ibmdb.close(conn)
        .catch(err => console.log(err))
}

module.exports = {
    getQueries,
    getQueriesFiler,
    historyQuery,
    getUserIds
}
