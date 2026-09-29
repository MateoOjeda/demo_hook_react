function TaskItem({ tarea, editarTarea, eliminarTarea, finalizarTarea }) {
  return (
    <article className={`task-card ${tarea.estado === 'Finalizada' ? 'finalizada' : ''}`}>
      <div className="task-header">
        <h3>{tarea.resumen}</h3>

        <span className={`prioridad ${tarea.prioridad.toLowerCase()}`}>
          {tarea.prioridad}
        </span>
      </div>

      <p>
        <strong>Proyecto:</strong> {tarea.nombreProyecto}
      </p>

      <p>
        <strong>Actividad:</strong> {tarea.tipoActividad}
      </p>

      <p>
        <strong>Estado:</strong> {tarea.estado}
      </p>

      <p>
        <strong>Descripción:</strong> {tarea.descripcion || '-'}
      </p>

      <p>
        <strong>Informador:</strong> {tarea.informador || '-'}
      </p>

      <p>
        <strong>Asignado a:</strong> {tarea.personaAsignada}
      </p>

      <p>
        <strong>Precondición:</strong> {tarea.precondicion || '-'}
      </p>

      <p>
        <strong>Creación:</strong> {tarea.fechaCreacion}
      </p>

      <p>
        <strong>Cierre:</strong> {tarea.fechaCierre || '-'}
      </p>

      <p>
        <strong>Sprint:</strong> {tarea.sprint || '-'}
      </p>

      <div className="task-actions">
        <button onClick={() => editarTarea(tarea)}>
          Editar
        </button>

        <button onClick={() => eliminarTarea(tarea.id)}>
          Eliminar
        </button>

        {tarea.estado !== 'Finalizada' && (
          <button onClick={() => finalizarTarea(tarea.id)}>
            Finalizar
          </button>
        )}
      </div>
    </article>
  )
}

export default TaskItem