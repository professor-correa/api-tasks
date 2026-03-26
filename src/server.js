import express from "express"

import { pool } from "../db.js"
import { logger } from "./middlewares/logger.middleware.js"
import tasksRoutes from "./routes/tasks.routes.js"

const app = express()
const PORT = 3000

app.use(express.json())
app.use(logger)

app.get("/health-check", async (req, res) => {
    try {
        await pool.query("select 1")
        return res.status(200).send({
            service: "running",
            banco: "connected"
        })
    } catch (error) {
        return res.status(503).send({
            message: "erro de conexão com o banco de dados."
        })
    }
})

app.use("/tasks", tasksRoutes)

app.listen(PORT, () => {
    console.log(`Service API running in ${PORT}`);
})