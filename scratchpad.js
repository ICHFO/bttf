const fetch = require('node-fetch')

const data = {
    ts: "2020-08-28 08:55:16.124329",
    text: "select c.fname, c.lname, a.balance from icws.customer c, icws.account a where c.id = a.customer_id"
}

fetch('http://localhost:3000/detail', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
})
    .then(response => response.json())
    .then(json => console.log(json))
