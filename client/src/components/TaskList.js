import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const TaskList = () => {
    const navigate = useNavigate()

    const [muestra, setMuestra] = useState([])

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3001/tasks/${id}`, {
            method: "DELETE"
        })
        setMuestra(muestra.filter(ele => ele.id !== id))
    }

    const loadTasks = async () => {
        const response = await fetch('http://localhost:3001/tasks');
        const respuesta = await response.json()
        setMuestra(respuesta)
    }

    useEffect(() => {
        loadTasks()
    }, [])

    return (
        <>
            {
                muestra.map(ele => {
                    return (
                        <>
                            <div key={ele.id}>
                                <h1>{ele.title}</h1>
                                <h3>{ele.description}</h3>
                                <h3>{ele.id}</h3>
                                <button onClick={() => navigate(`/tasks/${ele.id}/edit`)}>Editar</button>
                                <button onClick={() => handleDelete(ele.id)}>Eliminar</button>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}

export default TaskList;
