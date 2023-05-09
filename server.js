const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());

const port = process.env.port || 8080;
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next();
  })
app.use("/", require("./routes"));


app.listen(8080, () => {
console.log(`Server is running on port ${port}`);
});