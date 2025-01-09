
const express = require("express");
const mainRouter = require("./routes/index")
const app = express()
const cors = require("cors")
const port = 3001;
app.use(cors())
app.use(express.json())
app.use("/api/v1", mainRouter)

app.listen(port, ()=>{
    console.log(`Your app is listening on port ${port}`)
})