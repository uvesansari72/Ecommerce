const express = require('express')
const app = express();

const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(cookieParser())

const routes = require('../backend/routes/routes')

app.use('/api/v1',routes)
module.exports = app;
