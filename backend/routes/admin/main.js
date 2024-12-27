import express from 'express'

const app = express()

app.get("/", (req, res) => {
    res.json("Welcome to admin routes")
})

export default app;