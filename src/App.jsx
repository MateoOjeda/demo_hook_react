import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

const API_URL = 'http://localhost:3000/tasks'

function App() {
  const [tareas, setTareas] = useState([])
  const [tareaEditar, setTareaEditar] = useState(null)

  // OBTENER TODAS LAS TAREAS
  const obtenerTareas = async () => {
    try {
      const respuesta = await fetch(API_URL)

      if (!respuesta.ok) {
        throw new Error('Error al obtener las tareas')
      }

      const datos = await respuesta.json()

      setTareas(datos)
    } catch (error) {
      console.error('Error al obtener tareas:', error)
    }
  }

  // CARGAR LAS TAREAS AL INICIAR LA APLICACIÓN
// CARGAR LAS TAREAS AL INICIAR LA APLICACIÓN
useEffect(() => {
  let activo = true

  fetch(API_URL)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error('Error al obtener las tareas')
      }

      return respuesta.json()
    })
    .then((datos) => {
      if (activo) {
        setTareas(datos)
      }
    })
    .catch((error) => {
      console.error('Error al obtener tareas:', error)
    })

  return () => {
    activo = false
  }
}, [])

  // CREAR UNA NUEVA TAREA
  const agregarTarea = async (tarea) => {
    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarea),
      })

      if (!respuesta.ok) {
        throw new Error('Error al crear la tarea')
      }

      await obtenerTareas()
    } catch (error) {
      console.error('Error al crear tarea:', error)
    }
  }

  // SELECCIONAR UNA TAREA PARA EDITAR
  const editarTarea = (tarea) => {
    setTareaEditar(tarea)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // ACTUALIZAR UNA TAREA
  const actualizarTarea = async (tarea) => {
    try {
      const respuesta = await fetch(`${API_URL}/${tarea.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarea),
      })

      if (!respuesta.ok) {
        throw new Error('Error al actualizar la tarea')
      }

      setTareaEditar(null)

      await obtenerTareas()
    } catch (error) {
      console.error('Error al actualizar tarea:', error)
    }
  }

  // CANCELAR LA EDICIÓN
  const cancelarEdicion = () => {
    setTareaEditar(null)
  }

  // ELIMINAR UNA TAREA
  const eliminarTarea = async (id) => {
    const confirmar = window.confirm(
      '¿Está seguro de eliminar esta tarea?'
    )

    if (!confirmar) {
      return
    }

    try {
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!respuesta.ok) {
        throw new Error('Error al eliminar la tarea')
      }

      if (tareaEditar?.id === id) {
        setTareaEditar(null)
      }

      await obtenerTareas()
    } catch (error) {
      console.error('Error al eliminar tarea:', error)
    }
  }

  // FINALIZAR UNA TAREA
  const finalizarTarea = async (id) => {
    try {
      const respuesta = await fetch(
        `${API_URL}/${id}/finalizar`,
        {
          method: 'PATCH',
        }
      )

      if (!respuesta.ok) {
        throw new Error('Error al finalizar la tarea')
      }

      await obtenerTareas()
    } catch (error) {
      console.error('Error al finalizar tarea:', error)
    }
  }

  return (
    <>
      <Header />

      <main className="app-container">
<TaskForm
  key={tareaEditar?.id ?? 'nueva'}
  agregarTarea={agregarTarea}
  tareaEditar={tareaEditar}
  actualizarTarea={actualizarTarea}
  cancelarEdicion={cancelarEdicion}
/>

        <TaskList
          tareas={tareas}
          editarTarea={editarTarea}
          eliminarTarea={eliminarTarea}
          finalizarTarea={finalizarTarea}
        />
      </main>

      <Footer />
    </>
  )
}

export default App