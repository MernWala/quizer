import express from 'express'

const app = express()

app.get("/", (req, res) => {
    res.json("Welcome to supper_admin routes")
})

export default app;