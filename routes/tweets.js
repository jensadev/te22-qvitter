import express from "express"
import pool from "../db.js"

const router = express.Router()

router.get("/:id/delete", async (req, res) => {
  // tvätta och validera input
  const id = req.params.id
  // parameterized query för att förhindra SQL injection
  await pool.promise().query("DELETE FROM tweet WHERE id = ?", [id])
  res.redirect("/")
})

router.post("/delete", async (req, res) => {
  // tvätta och validera input
  const id = req.body.id
  // parameterized query för att förhindra SQL injection
  await pool.promise().query("DELETE FROM tweet WHERE id = ?", [id])
  res.redirect("/")
})

export default router
