const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();


const port = process.env.port || 8080;

app.use("/", require("./routes"));


app.listen(8080, () => {
console.log(`Server is running on port ${port}`);
});