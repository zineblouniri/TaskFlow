import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import authRoute from './routes/authRoute.js';
import projectRoute from './routes/projectRoute.js';
import taskRoute from './routes/taskRoute.js';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/projects',projectRoute)
app.use('/api/tasks', taskRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.get("/", (req, res) => {
  res.send("API is running..");
});
pool.connect()
.then(() => {
    console.log('Connected to the database')
})
.catch((err) => {
    console.error('Error connecting to the database', err)
})

