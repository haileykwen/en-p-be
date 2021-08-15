const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const cookieParser = require("cookie-parser");
const session = require("express-session");

const routesAuth = require('./src/routes/auth');
const routesPhrase = require("./src/routes/phrase");

app.use((req, res, next) => { // Handle error CORS policy
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        key: "user_id",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

app.use("/api/auth", routesAuth);
app.use("/api/phrase", routesPhrase);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});