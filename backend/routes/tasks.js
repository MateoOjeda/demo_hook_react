import express from 'express'
import pool from '../db.js'

const router = express.Router()

// LISTAR TODAS LAS TAREAS
router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM tasks ORDER BY id DESC'
    )

    const tareas = resultado.rows.map((tarea) => ({
      id: tarea.id,
      nombreProyecto: tarea.nombre_proyecto,
      tipoActividad: tarea.tipo_actividad,
      estado: tarea.estado,
      resumen: tarea.resumen,
      descripcion: tarea.descripcion,
      prioridad: tarea.prioridad,
      informador: tarea.informador,
      personaAsignada: tarea.persona_asignada,
      precondicion: tarea.precondicion,
      fechaCreacion: tarea.fecha_creacion,
      fechaCierre: tarea.fecha_cierre,
      sprint: tarea.sprint,
    }))

    res.json(tareas)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      mensaje: 'Error al obtener las tareas',
    })
  }
})


// CREAR TAREA
router.post('/', async (req, res) => {
  try {
    const {
      nombreProyecto,
      tipoActividad,
      estado,
      resumen,
      descripcion,
      prioridad,
      informador,
      personaAsignada,
      precondicion,
      fechaCreacion,
      fechaCierre,
      sprint,
    } = req.body

    const resultado = await pool.query(
      `
      INSERT INTO tasks (
        nombre_proyecto,
        tipo_actividad,
        estado,
        resumen,
        descripcion,
        prioridad,
        informador,
        persona_asignada,
        precondicion,
        fecha_creacion,
        fecha_cierre,
        sprint
      )
      VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12
      )
      RETURNING *
      `,
      [
        nombreProyecto,
        tipoActividad,
        estado,
        resumen,
        descripcion,
        prioridad,
        informador,
        personaAsignada,
        precondicion,
        fechaCreacion,
        fechaCierre || null,
        sprint,
      ]
    )

    res.status(201).json(resultado.rows[0])
  } catch (error) {
    console.error(error)

    res.status(500).json({
      mensaje: 'Error al crear la tarea',
    })
  }
})


// EDITAR TAREA
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const {
      nombreProyecto,
      tipoActividad,
      estado,
      resumen,
      descripcion,
      prioridad,
      informador,
      personaAsignada,
      precondicion,
      fechaCreacion,
      fechaCierre,
      sprint,
    } = req.body

    const resultado = await pool.query(
      `
      UPDATE tasks
      SET
        nombre_proyecto = $1,
        tipo_actividad = $2,
        estado = $3,
        resumen = $4,
        descripcion = $5,
        prioridad = $6,
        informador = $7,
        persona_asignada = $8,
        precondicion = $9,
        fecha_creacion = $10,
        fecha_cierre = $11,
        sprint = $12
      WHERE id = $13
      RETURNING *
      `,
      [
        nombreProyecto,
        tipoActividad,
        estado,
        resumen,
        descripcion,
        prioridad,
        informador,
        personaAsignada,
        precondicion,
        fechaCreacion,
        fechaCierre || null,
        sprint,
        id,
      ]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: 'Tarea no encontrada',
      })
    }

    res.json(resultado.rows[0])
  } catch (error) {
    console.error(error)

    res.status(500).json({
      mensaje: 'Error al actualizar la tarea',
    })
  }
})


// ELIMINAR TAREA
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const resultado = await pool.query(
      `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING *
      `,
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: 'Tarea no encontrada',
      })
    }

    res.json({
      mensaje: 'Tarea eliminada correctamente',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      mensaje: 'Error al eliminar la tarea',
    })
  }
})


// FINALIZAR TAREA
router.patch('/:id/finalizar', async (req, res) => {
  try {
    const { id } = req.params

    const resultado = await pool.query(
      `
      UPDATE tasks
      SET
        estado = 'Finalizada',
        fecha_cierre = CURRENT_DATE
      WHERE id = $1
      RETURNING *
      `,
      [id]
    )

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: 'Tarea no encontrada',
      })
    }

    res.json(resultado.rows[0])
  } catch (error) {
    console.error(error)

    res.status(500).json({
      mensaje: 'Error al finalizar la tarea',
    })
  }
})

export default router