const express = require('express')
const app = express()
const config = require('./config/config')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({type: 'success'})
})

app.post('/login', (req, res) => {
    console.log(req.body);
    res.json({type: 'success'})
})

require('./config/mongoose')()

app.listen(config.PORT, () => console.log(`Server is listening on http://localhost:${config.PORT}`))