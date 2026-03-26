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

async function createTasks(req, res) {
    const { title } = req.body
    
    if (!title || typeof title !== "string") {
        return res.status(400).send({
            message: "title é obrigatório e deve ser string."
        })
    }

    const [result] = await pool.query("insert into tasks (title) values (?)", [title])

    const [rows] = await pool.query("select id, title, created_at from tasks where id = ?", [result.insertId])

    return res.status(201).send({
        tasks: rows
    })

}

async function updateTasks(req, res) {
    const id = Number(req.params.id)
    const { title } = req.body

    if (!Number.isFinite(id)) {
        return res.status(400).send({
            message: "id inválido!"
        })
    }

    if (!title || typeof title !== "string") {
        return res.status(400).send({
            message: "title é obrigatório e deve ser string."
        })
    }

    const [result] = await pool.query("update tasks set title = ? where id = ?", [title, id])   
    
    const [rows] = await pool.query("select id, title, created_at from tasks where id = ?", [id])

    return res.status(200).send({
        tasks: rows
    })
}

// deleta tasks -> id, valida id -> pool -> delete from tasks where id = ?
async function deleteTasks(req, res) {
    const id = Number(req.params.id)

    if (!Number.isFinite(id)) {
        return res.status(400).send({
            message: "id inválido"
        })
    }

    const [result] = await pool.query("delete from tasks where id = ?", [id])

    return res.status(204).send({
        message: "task deletada com sucesso"
    })
}

export {
    listTasks,
    getTasks,
    createTasks, 
    updateTasks
}