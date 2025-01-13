require('dotenv').config()
const express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
// 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

const startServer = () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`http://localhost:${process.env.PORT}`)
        })
    } catch (error) {
        console.log(`Error While Starting the server`, process.env.PORT);
        
    }
}
startServer();