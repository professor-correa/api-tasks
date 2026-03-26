import { pool } from "../../db.js";

async function listTasks(req, res) {
    const [rows] = pool.query("select id, title, created_at from tasks")

    return res.status(200).send({
        tasks: rows
    })
}

export {
    listTasks
}