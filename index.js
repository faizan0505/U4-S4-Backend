const express = require("express");
const cors = require("cors")
const { userRouter } = require("./routes/user_routes.js")
const { connection } = require("./configs/db.js");
const { authenticate } = require("./middleware/authentication.js")
const { postRouter } = require("./routes/posts_routes.js")

const app = express();
app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use(authenticate)
app.use("/posts", postRouter)

app.listen(4300, async () => {
    try {
        await connection;
        console.log("DB connected successfully")
    } catch (error) {
        console.log("Not connect DB" + error)
    }
    console.log("Server is Running at port 4300")
})