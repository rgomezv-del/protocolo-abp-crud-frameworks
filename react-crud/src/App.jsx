import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'http://localhost:3001/tareas'

function App() {
  const [tareas, setTareas] = useState([])
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', completada: false })
  const [editandoId, setEditandoId] = useState(null)

  const obtenerTareas = async () => {
    const res = await axios.get(API_URL)
    setTareas(res.data)
  }

  useEffect(() => {
    obtenerTareas()
  }, [])

  const crearTarea = async () => {
    if (nuevaTarea.titulo === '') return alert('El título es obligatorio')
    await axios.post(API_URL, nuevaTarea)
    setNuevaTarea({ titulo: '', descripcion: '', completada: false })
    obtenerTareas()
  }

  const eliminarTarea = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar esta tarea?')) {
      await axios.delete(`${API_URL}/${id}`)
      obtenerTareas()
    }
  }

  const prepararEdicion = (tarea) => {
    setEditandoId(tarea.id)
    setNuevaTarea({ ...tarea })
  }

  const guardarEdicion = async () => {
    await axios.put(`${API_URL}/${editandoId}`, nuevaTarea)
    setEditandoId(null)
    setNuevaTarea({ titulo: '', descripcion: '', completada: false })
    obtenerTareas()
  }

  return (
    <div className="contenedor">
      <h1>CRUD de Tareas - React</h1>

      <div className="formulario">
        <h2>{editandoId ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
        <input 
          value={nuevaTarea.titulo} 
          onChange={(e) => setNuevaTarea({...nuevaTarea, titulo: e.target.value})} 
          placeholder="Título de la tarea" 
        />
        <input 
          value={nuevaTarea.descripcion} 
          onChange={(e) => setNuevaTarea({...nuevaTarea, descripcion: e.target.value})} 
          placeholder="Descripción" 
        />
        
        {editandoId ? (
          <button onClick={guardarEdicion} className="btn-guardar">Guardar Cambios</button>
        ) : (
          <button onClick={crearTarea} className="btn-crear">Crear Tarea</button>
        )}
      </div>

      <ul className="lista">
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <div>
              <strong>{tarea.titulo}</strong> - {tarea.descripcion}
            </div>
            <div>
              <button onClick={() => prepararEdicion(tarea)} className="btn-editar">Editar</button>
              <button onClick={() => eliminarTarea(tarea.id)} className="btn-eliminar">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App