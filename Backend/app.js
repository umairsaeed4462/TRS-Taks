const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const path = require("path");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8028;

// Import routes
const user_routes = require("./routes/user.route");
const event_routes = require("./routes/event.route");
const role_routes = require("./routes/role.route");


// Create Express app
const app = express();

// middleware routes
app.use(cors());
app.use(express.static('uploads'));
app.use(express.json());
app.use(bodyParser.json());

// Configure routes
app.use("/api/auth", user_routes);
app.use("/api/events", event_routes);
app.use("/api/role", role_routes);


// GET API to serve an image by filename
app.get('/images', (req, res) => {
    const filename = req.query.name;
    const filePath = path.join(__dirname, '', filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

app.get('/', (req, res) => {
    res.send('API is working!');
});


const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log("Server is listen at ", `http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
connectDB();
start();