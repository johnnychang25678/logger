// app.js
const express = require('express')
const app = express()
const port = 3000

function logger(req, res, next) {
  const reqTime = new Date() // time when server receive the request
  const hour = reqTime.getHours()
  const minute = reqTime.getMinutes()
  const second = reqTime.getSeconds()
  const millisecond = reqTime.getMilliseconds()
  const formatReqTime = `${hour}:${minute}:${second}:${millisecond}`

  res.on('finish', () => {
    const resTime = new Date() // time when server sends out the response
    const timeDiff = +resTime - +reqTime
    console.log(`${reqTime.toLocaleDateString()} ${formatReqTime} | ${req.method} from ${req.url} | total time: ${timeDiff}ms `)
  })

  next()
}

// middleware
app.use(logger)

app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})