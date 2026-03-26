import { pool } from "../../db.js";

async function listTasks(req, res) {
    const [rows] = await pool.query("select id, title, created_at from tasks")

    console.log(rows);
    
    return res.status(200).send({
        tasks: rows
    })
}

async function getTasks(req, res) {
    const id = Number(req.params.id)
    
    if (!Number.isFinite(id)) {
        return res.status(400).send({
            message: "id inválido"
        })
    }

    const [rows] = await pool.query("select id, title, created_at from tasks where id = ?", [id])
    
    return res.status(200).send({
        task: rows
    })
    
}

export {
    listTasks,
    getTasks
}