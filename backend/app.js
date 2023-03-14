const express = require('express')
const app = express();
app.use(express.json())

const routes = require('../backend/routes/routes')

app.use('/api/v1',routes)
module.exports = app;
