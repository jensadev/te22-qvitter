import express from "express"
import pool from "../db.js"
import { body, matchedData, validationResult } from "express-validator"

const router = express.Router()

router.get("/:id/delete", async (req, res) => {
  // tvätta och validera input
  const id = req.params.id
  // vi rullar en egen check så att det är ett nummer
  if (!Number.isInteger(Number(id))) {
    return res.status(400).send("Invalid ID")
  }
  // parameterized query för att förhindra SQL injection
  await pool.promise().query("DELETE FROM tweet WHERE id = ?", [id])
  res.redirect("/")
})

router.post("/delete",
  body("id").isInt(),
  async (req, res) => {
  // https://express-validator.github.io/docs/
  // validation chain och sanitization chain, express validator är en middleware
  // tvätta och validera input
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send("Invalid ID")
  }

  const id = matchedData(req).id
  // parameterized query för att förhindra SQL injection
  await pool.promise().query("DELETE FROM tweet WHERE id = ?", [id])
  res.redirect("/")
})

router.get("/:id/edit", async (req, res) => {
  const id = req.params.id
  if (!Number.isInteger(Number(id))) { return res.status(400).send("Invalid ID") }
  const [rows] = await pool.promise().query("SELECT * FROM tweet WHERE id = ?", [id])
  if (rows.length === 0) {
    return res.status(404).send("Tweet not found")
  }
  res.render("edit.njk", { tweet: rows[0] })
})

router.post("/edit",
  body("id").isInt(),
  body("message").isLength({ min: 1, max: 130 }),
  body("message").escape(),
  async (req, res) => {
  const errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) { return res.status(400).send("Invalid input") }

  const { id, message } = matchedData(req) // req.params.message varför inte?
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ")
  console.log(timestamp)
  await pool.promise().query("UPDATE tweet SET message = ?, updated_at = ? WHERE id = ?", [message, timestamp, id])
  res.redirect("/")
})


export default router
