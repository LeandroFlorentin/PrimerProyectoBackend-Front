import React, { useState, useEffect } from 'react'
import { Grid, Card, Typography, CardContent, TextField, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const TaskForm = () => {
    const { id } = useParams()

    const navigate = useNavigate()
    const [editing, setEditing] = useState(false)
    const [task, setTask] = useState({
        title: '',
        description: ''
    })

    const handleChange = e => {
        e.preventDefault()
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (editing) {
            await fetch(`http://localhost:3001/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task)
            })
        }
        else {
            await fetch('http://localhost:3001/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { "Content-Type": "application/json" }
            })
        }
        navigate("/")
    }

    const loadTask = async (id) => {
        const res = await fetch(`http://localhost:3001/tasks/${id}`)
        const data = await res.json()
        setTask({
            title: data.title,
            description: data.description
        })
        setEditing(true)
    }

    useEffect(() => {
        if (id) {
            loadTask(id)
        }
    }, [id])
    return (
        <Grid container direction='colunm' alignItems='center' justifyContent='center'>
            <Grid item xs={3}>
                <Card
                    sx={{ mt: 5 }}
                    style={{
                        backgroundColor: '#1e272e',
                        padding: '1rem'
                    }}
                >
                    <Typography variant='5' textAlign='center' style={{ color: '#fff' }}>
                        {editing ? "Editing Task" : "Create Task"}
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='filled'
                                label='Escriba su titulo'
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                onChange={handleChange}
                                inputProps={{ style: { color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#fff' } }}
                                name='title'
                                value={task.title}
                            />
                            <TextField
                                variant='filled'
                                label='Escriibe tu descripcion'
                                multiline
                                rows={4}
                                inputProps={{ style: { color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#fff' } }}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name='description'
                                onChange={handleChange}
                                value={task.description}
                            />
                            <Button variant='contained' color='primary' type='submit'>
                                {editing ? "Editar" : "Crear"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TaskForm;
