const express = require('express')
const router = require('./router')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(bodyparser.json())
app.use(router)

app.get('/', (req, res, next) => {
    app.use(express.static("dist"))
    next()
})

app.listen(3000, function () {
    console.log("listening on port 3000")
})
