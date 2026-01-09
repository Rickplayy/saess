const mysql = require('mysql2/promise');

// --- Configuración de la Conexión ---
// Por favor, ajusta estos valores si tu configuración de MySQL es diferente.
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root', // Cambia esto si tu usuario root tiene contraseña
};

const dbName = 'saes_students';

let connection;

// --- Función de Inicialización de la Base de Datos ---
async function initDb() {
    try {
        // 1. Conectar al servidor MySQL (sin especificar una base de datos aún)
        const tempConnection = await mysql.createConnection(dbConfig);
        
        // 2. Crear la base de datos si no existe
        await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        console.log(`Base de datos '${dbName}' asegurada.`);
        await tempConnection.end();

        // 3. Crear una nueva conexión, ahora a nuestra base de datos específica
        connection = await mysql.createPool({
            ...dbConfig,
            database: dbName,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // 4. Crear la tabla de estudiantes si no existe
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS students (
                boleta VARCHAR(10) PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL,
                apellidoPaterno VARCHAR(50) NOT NULL,
                apellidoMaterno VARCHAR(50),
                carrera VARCHAR(100) NOT NULL,
                secuencia VARCHAR(10) NOT NULL
            );
        `;
        await connection.query(createTableQuery);
        console.log("Tabla 'students' asegurada.");

        // 5. Verificar si la tabla está vacía para insertar datos iniciales
        const [rows] = await connection.query('SELECT COUNT(*) as count FROM students');
        if (rows[0].count === 0) {
            console.log('La tabla está vacía, insertando datos iniciales...');
            await seed();
        } else {
            console.log('La tabla ya contiene datos.');
        }

        console.log('Conexión a la base de datos MySQL establecida correctamente.');
        
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        process.exit(1); // Detener la aplicación si la DB no se puede inicializar
    }
}

// --- Función para Insertar Datos Iniciales (Seed) ---
async function seed() {
    const initialStudents = [
        { "boleta": "2018603521", "nombre": "Emilio", "apellidoPaterno": "Andrade", "apellidoMaterno": "Vizueth", "carrera": "Ingeniería en Informática", "secuencia": "5CV1" },
        { "boleta": "2022600630", "nombre": "Paulina", "apellidoPaterno": "Armas", "apellidoMaterno": "Vazquez", "carrera": "Ciencias de la Informática", "secuencia": "4CV3" },
        { "boleta": "2024601910", "nombre": "Fernanda", "apellidoPaterno": "Lopez", "apellidoMaterno": "Lopez", "carrera": "Ciencias de la Informática", "secuencia": "2CV1" },
        { "boleta": "2024602077", "nombre": "Juan Carlos", "apellidoPaterno": "Perez de Leon", "apellidoMaterno": "Hagopian", "carrera": "Ingeniería Industrial", "secuencia": "2IV1" },
        { "boleta": "2024602122", "nombre": "Mario Sebastian", "apellidoPaterno": "Sanchez", "apellidoMaterno": "Rosales", "carrera": "Ingeniería Industrial", "secuencia": "2IV2" },
        { "boleta": "2025602392", "nombre": "Cesar", "apellidoPaterno": "Sosa", "apellidoMaterno": "Vazquez", "carrera": "Ciencias de la Informática", "secuencia": "1CV1" },
        { "boleta": "2022601616", "nombre": "Alejandro", "apellidoPaterno": "Suarez", "apellidoMaterno": "Perez", "carrera": "Ciencias de la Informática", "secuencia": "4CV5" }
    ];

    const insertQuery = 'INSERT INTO students (boleta, nombre, apellidoPaterno, apellidoMaterno, carrera, secuencia) VALUES ?';
    const values = initialStudents.map(s => [s.boleta, s.nombre, s.apellidoPaterno, s.apellidoMaterno, s.carrera, s.secuencia]);
    
    await connection.query(insertQuery, [values]);
    console.log('Datos iniciales insertados.');
}

// --- Exportar la conexión y la función de inicialización ---
// Usamos una función para obtener la conexión para asegurar que ya fue creada.
function getConnection() {
    if (!connection) {
        throw new Error('La base de datos no está inicializada.');
    }
    return connection;
}

module.exports = { initDb, getConnection };
