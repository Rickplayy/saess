const express = require('express');
const cors = require('cors');
const { initDb, getConnection } = require('./db');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Get all students
app.get('/api/students', async (req, res) => {
    try {
        const connection = getConnection();
        const [rows] = await connection.query('SELECT * FROM students');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Server error');
    }
});

// Get student by boleta
app.get('/api/students/:boleta', async (req, res) => {
    try {
        const connection = getConnection();
        const [rows] = await connection.query('SELECT * FROM students WHERE boleta = ?', [req.params.boleta]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Student not found');
        }
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).send('Server error');
    }
});

// Add a new student
app.post('/api/students', async (req, res) => {
    try {
        const { boleta, nombre, apellidoPaterno, apellidoMaterno, carrera, secuencia } = req.body;
        if (!boleta || !nombre || !apellidoPaterno || !carrera || !secuencia) {
            return res.status(400).send('Missing required fields');
        }
        
        const newStudent = { boleta, nombre, apellidoPaterno, apellidoMaterno, carrera, secuencia };
        const connection = getConnection();
        await connection.query('INSERT INTO students SET ?', newStudent);
        
        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error adding student:', error);
        // Check for duplicate entry
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).send('A student with this boleta already exists.');
        }
        res.status(500).send('Server error');
    }
});

// Delete a student
app.delete('/api/students/:boleta', async (req, res) => {
    try {
        const connection = getConnection();
        const [result] = await connection.query('DELETE FROM students WHERE boleta = ?', [req.params.boleta]);
        
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).send('Student not found');
        }
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).send('Server error');
    }
});

// --- Iniciar Servidor ---
async function startServer() {
    await initDb(); // Asegurar que la DB está lista
    app.listen(port, () => {
        console.log(`Backend server listening at http://localhost:${port}`);
    });
}

startServer();