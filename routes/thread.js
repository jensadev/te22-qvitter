import express from "express"
import pool from "../db.js"
import { body, param, matchedData, validationResult } from "express-validator"

const router = express.Router()

router.get("/:id", param("id").isInt(), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send("Invalid ID")
  }

  const id = matchedData(req).id
  const [rows] = await pool
    .promise()
    .query(
      "SELECT tweet.*, user.name FROM tweet JOIN user ON tweet.author_id = user.id WHERE tweet.id = ?",
      [id],
    )
  if (rows.length === 0) {
    return res.status(404).send("Tweet not found")
  }

  const [ replies ] = await pool.promise().query(`
    SELECT tweet.*, user.name, DATE_FORMAT(tweet.updated_at, "%Y-%m-%d %H:%i") AS date
    FROM tweet
    JOIN user ON tweet.author_id = user.id
    WHERE tweet.reply_to = ?
    ORDER BY updated_at DESC;`, [id])

  res.render("thread.njk", { tweet: rows[0], replies })
})

router.post("/",
  body("id").isInt(),
  body("message").isLength({ min: 1 }),
  async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send("Invalid input")
  }

  const { id, message } = matchedData(req)
  await pool.promise().query("INSERT INTO tweet (message, author_id, reply_to) VALUES (?, 1, ?)", [message, id])
  res.redirect(`/thread/${id}`)
})

export default router
