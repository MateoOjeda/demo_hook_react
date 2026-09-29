import { useState } from 'react'

const tareaInicial = {
  nombreProyecto: '',
  tipoActividad: '',
  estado: 'Pendiente',
  resumen: '',
  descripcion: '',
  prioridad: 'Media',
  informador: '',
  personaAsignada: '',
  precondicion: '',
  fechaCreacion: '',
  fechaCierre: '',
  sprint: '',
}

function TaskForm({
  agregarTarea,
  tareaEditar,
  actualizarTarea,
  cancelarEdicion,
}) {
  const [tarea, setTarea] = useState(
    tareaEditar ?? tareaInicial
  )

  const manejarCambio = (event) => {
    const { name, value } = event.target

    setTarea({
      ...tarea,
      [name]: value,
    })
  }

  const manejarSubmit = (event) => {
    event.preventDefault()

    if (
      !tarea.nombreProyecto.trim() ||
      !tarea.tipoActividad ||
      !tarea.resumen.trim() ||
      !tarea.personaAsignada.trim() ||
      !tarea.fechaCreacion
    ) {
      alert('Complete los campos obligatorios')
      return
    }

    if (tareaEditar) {
      actualizarTarea(tarea)
    } else {
      agregarTarea(tarea)
    }

    setTarea(tareaInicial)
  }

  return (
    <section className="formulario-container">
      <h2>{tareaEditar ? 'Editar tarea' : 'Nueva tarea'}</h2>

      <form className="task-form" onSubmit={manejarSubmit}>
        <label>
          Nombre del Proyecto
          <input
            type="text"
            name="nombreProyecto"
            value={tarea.nombreProyecto}
            onChange={manejarCambio}
          />
        </label>

        <label>
          Tipo de Actividad
          <select
            name="tipoActividad"
            value={tarea.tipoActividad}
            onChange={manejarCambio}
          >
            <option value="">Seleccione</option>
            <option value="Desarrollo">Desarrollo</option>
            <option value="Testing">Testing</option>
            <option value="Análisis">Análisis</option>
            <option value="Diseño">Diseño</option>
            <option value="Documentación">Documentación</option>
          </select>
        </label>

        <label>
          Estado
          <select
            name="estado"
            value={tarea.estado}
            onChange={manejarCambio}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Finalizada">Finalizada</option>
          </select>
        </label>

        <label>
          Resumen
          <input
            type="text"
            name="resumen"
            value={tarea.resumen}
            onChange={manejarCambio}
          />
        </label>

        <label className="campo-completo">
          Descripción
          <textarea
            name="descripcion"
            value={tarea.descripcion}
            onChange={manejarCambio}
          />
        </label>

        <label>
          Prioridad
          <select
            name="prioridad"
            value={tarea.prioridad}
            onChange={manejarCambio}
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </label>

        <label>
          Informador
          <input
            type="text"
            name="informador"
            value={tarea.informador}
            onChange={manejarCambio}
          />
        </label>

        <label>
          Persona asignada
          <input
            type="text"
            name="personaAsignada"
            value={tarea.personaAsignada}
            onChange={manejarCambio}
          />
        </label>

        <label>
          Precondición
          <input
            type="text"
            name="precondicion"
            value={tarea.precondicion}
            onChange={manejarCambio}
          />
        </label>

        <label>
          Fecha de Creación
          <input
            type="date"
            name="fechaCreacion"
            value={tarea.fechaCreacion}
            onChange={manejarCambio}
          />
        </label>

        <label>
          Fecha de Cierre
          <input
            type="date"
            name="fechaCierre"
            value={tarea.fechaCierre || ''}
            onChange={manejarCambio}
          />
        </label>

        <label>
          Sprint
          <input
            type="text"
            name="sprint"
            placeholder="Ej: Sprint 1"
            value={tarea.sprint}
            onChange={manejarCambio}
          />
        </label>

        <div className="form-actions">
          <button type="submit">
            {tareaEditar ? 'Actualizar tarea' : 'Crear tarea'}
          </button>

          {tareaEditar && (
            <button
              type="button"
              onClick={cancelarEdicion}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default TaskForm