const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const routesAuth = require('./src/routes/auth');
const routesPhrase = require("./src/routes/phrase");

app.use(express.json());
app.use((req, res, next) => { // Handle error CORS policy
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
}) 

app.use("/api/auth", routesAuth);
app.use("/api/phrase", routesPhrase);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});