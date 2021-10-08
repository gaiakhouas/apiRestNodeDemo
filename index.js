// 1. initialisation of the app with express and mysql
const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(express.json());

// 2. Listening of api on the port 8080 
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Rest Api from Gaia listening on port ${port}`);
})

// 3. Response to any http request to the root with a json object saying the status
app.get("/", async (req, res) => {
    res.json({ status: "Rest Api ! ready to roll !"})
}) 

// 4. http request and response for breeds query
app.get("/:breed", async(req, res) => {
    const query = "SELECT * FROM breeds WHERE name = ?";
    pool.query(query, [req.params.breed], (error, result) => 
    {
        if(!result[0]){
            res.json({ status: "Not found !"});
        } else{
            res.json(result[0]);
        }
    }
    )
});

// 5. Creation of pool global variable with all credentials to access the database on cloud
const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
})