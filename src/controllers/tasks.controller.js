const pool = require('../db.js')

const getAllTasks = async (req, res, next) => {
    try {
        const { rows } = await pool.query('SELECT * FROM task');
        res.json(rows)
    } catch (error) {
        next(error)
    }
}

const getTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(`SELECT * FROM task WHERE id = ${id}`)
        if (rows.length === 0) return res.status(404).json({ message: "Tarea no encontrada" });
        res.json(rows[0])
    } catch (error) {
        next(error)
    }
}

const createTask = async (req, res, next) => {
    const { title, description } = req.body
    try {
        const result = await pool.query('INSERT INTO task (title,description) VALUES($1,$2) RETURNING *', [
            title,
            description
        ]);
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {
    const { id } = req.params
    try {
        const { rowCount } = await pool.query(`DELETE FROM task WHERE id = $1`, [id])
        if (!rowCount) return res.send('No se puede eliminar este objeto, porque no existe')
        res.send(`${rowCount} objeto eliminado.`)
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body
    const { rows } = await pool.query(`UPDATE task SET title = $1,description=$2 WHERE id = $3 RETURNING *`, [title, description, id])
    console.log(rows)
    if (rows.length === 0) return res.status(404).json({ message: "Task no found" })
    res.json(rows[0])
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}