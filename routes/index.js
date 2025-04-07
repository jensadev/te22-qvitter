import express from "express"
import db from "../db-sqlite.js"
import { formatDistanceToNow } from "date-fns"

const router = express.Router()

router.get("/", async (req, res) => {
    const tweets = await db.all(`
    SELECT tweet.*, user.name
    FROM tweet
    JOIN user ON tweet.author_id = user.id
    ORDER BY updated_at DESC;
    ;`)

    // Format the dates on the backend
    const formattedTweets = tweets.map(tweet => ({
        ...tweet,
        date: formatDistanceToNow(new Date(tweet.updated_at), { addSuffix: true }),
    }))

    res.render("index.njk", {
        title: "Fireplace - All posts",
        message: "This is fine...",
        tweets: formattedTweets,
    })
})

export default router
