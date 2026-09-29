import TaskItem from './TaskItem'

function TaskList({
  tareas,
  editarTarea,
  eliminarTarea,
  finalizarTarea,
}) {
  return (
    <section className="listado-container">
      <h2>Listado de Tareas</h2>

      {tareas.length === 0 ? (
        <p>No hay tareas registradas.</p>
      ) : (
        <div className="task-list">
          {tareas.map((tarea) => (
            <TaskItem
              key={tarea.id}
              tarea={tarea}
              editarTarea={editarTarea}
              eliminarTarea={eliminarTarea}
              finalizarTarea={finalizarTarea}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default TaskList