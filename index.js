import express from "express";
import initPosRouter from "./src/routes/initpos.route.js"
import finalPosRouter from "./src/routes/finalpos.route.js"
import userRouter from "./src/routes/user.route.js"
import scoreRouter from "./src/routes/score.route.js"
import authRouter from "./src/routes/auth.route.js"
import DbConnection from "./src/config/db.config.js"

const port = process.env.PORT || 2020
const app = express()
const mongo = new DbConnection()

mongo.mongoConnect()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/initpos", initPosRouter)
app.use("/api/finalpos", finalPosRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/scores', scoreRouter)

app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        status: error.status,
        message: error.message
    })
})

app.listen(port, () => {
    console.log("app is running on port : " + port)
})