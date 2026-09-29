/* global process */

import express from 'express'
import cors from 'cors'
import tasksRouter from './routes/tasks.js'
import pool from './db.js'

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Task Manager funcionando correctamente'
  })
})

app.get('/db-test', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT NOW() AS fecha'
    )

    res.json({
      conexion: 'PostgreSQL conectado correctamente',
      fecha: resultado.rows[0].fecha
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      conexion: 'Error al conectar PostgreSQL',
      error: error.message
    })
  }
})

app.use('/tasks', tasksRouter)

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})