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

export default router
