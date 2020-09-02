const express = require('express')
const db = require('./database')
const router = express.Router()



router.get('/overview', function (req, res) {
    db.getQueries(data => {
        res.json(data)
    })
})

router.post('/overview/filter', function (req, res) {
    console.log(req.body)
    const filters = []
    let where = ''

    if(req.body.username != 'All users')
        filters.push(`userid = '${req.body.username}'`)
    if(req.body.date != 'null')
        filters.push(`ts > '${req.body.date}'`)

    if (filters.length > 0) {
        where = 'where ' + filters.join(' and ')
    } else {
        where = ''
    }
    db.getQueriesFiler(where, data => {
        const result = {
            filter: filters,
            data: data
        }
        res.json(result)
    })

})

router.post('/detail', function (req, res) {
    const { ts, text } = req.body
    db.historyQuery(ts, text, data => {
        res.json(data)
    })
})

router.get('/userIds', function (req, res) {
    db.getUserIds(data => {
        res.json(data)
    })
})

router.get('/login', function (req, res) {
    res.send('implement /login')
})

module.exports = router
