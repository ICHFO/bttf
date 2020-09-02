const ibmdb = require('ibm_db')

let runs = 20;

const cns = "DATABASE=bttf;HOSTNAME=192.168.1.162;PORT=50001;PROTOCOL=TCPIP;UID=ic;PWD=icmaster"
const cnopts = { "connectTimeout" : 5, "systemNaming" : true}
const conn = ibmdb.openSync(cns, cnopts)
const ids = conn.querySync("select c.id, a.balance from icws.customer c, icws.account a where c.id = a.customer_id")


while(runs > 0) {

    const {ID, BALANCE} = ids[Math.floor(Math.random() * ids.length)];
    const randomAmount = Math.floor(Math.random() * 1000) + 10

    const stmts = [
        `update icws.account set balance = ${BALANCE + randomAmount} where customer_id = ${ID}`,
        `update icws.account set balance = ${BALANCE - randomAmount} where customer_id = ${ID}`
    ]
    const stmt = stmts[Math.floor(Math.random() * stmts.length)]

    conn.querySync(stmt)

    const users = ['HFO', 'LDB', 'HMI', 'AMI']
    const stmt2 = "select c.fname, c.lname, a.balance from icws.customer c, icws.account a where c.id = a.customer_id"
    const sql = `insert into bttf.queries (userid, text, ts) values ('${users[Math.floor(Math.random() * users.length)]}', '${stmt2}', current_timestamp )`
    conn.querySync(sql)

    runs--;
}

ibmdb.close(conn, err => {if (err) console.log(err)})
