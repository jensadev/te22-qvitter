import "dotenv/config"
import express from "express"
import nunjucks from "nunjucks"
import bodyParser from "body-parser"
import logger from "morgan"

import indexRouter from "./routes/index.js"
import tweetsRouter from "./routes/tweets.js"
import threadRouter from "./routes/thread.js"

const app = express()
const port = 3000

nunjucks.configure("views", {
  autoescape: true,
  express: app,
})

app.use(express.static("public"))
app.use(logger("dev"))
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/", indexRouter)
app.use("/tweets", tweetsRouter)
app.use("/thread", threadRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})