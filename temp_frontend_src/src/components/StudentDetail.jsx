import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentDetail({ boleta, onBack }) {
  const [alumno, setAlumno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/alumnos/${boleta}`);
        setAlumno(response.data);
      } catch (err) {
        console.error('Error fetching student details:', err);
        setError('No se pudo cargar el detalle del alumno.');
      } finally {
        setLoading(false);
      }
    };

    if (boleta) {
      fetchStudentDetail();
    }
  }, [boleta]);

  if (loading) {
    return <div className="text-center">Cargando detalles del alumno...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
        <button className="btn btn-primary mt-3" onClick={onBack}>Volver</button>
      </div>
    );
  }

  if (!alumno) {
    return (
      <div className="alert alert-warning text-center" role="alert">
        No se encontró el alumno.
        <button className="btn btn-primary mt-3" onClick={onBack}>Volver</button>
      </div>
    );
  }

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5>Detalle del Alumno</h5>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Boleta:</strong> {alumno.boleta}</li>
          <li className="list-group-item"><strong>Nombre Completo:</strong> {`${alumno.nombre} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}`}</li>
          <li className="list-group-item"><strong>Nombre(s):</strong> {alumno.nombre}</li>
          <li className="list-group-item"><strong>Apellido Paterno:</strong> {alumno.apellidoPaterno}</li>
          <li className="list-group-item"><strong>Apellido Materno:</strong> {alumno.apellidoMaterno}</li>
          <li className="list-group-item"><strong>Carrera:</strong> {alumno.carrera}</li>
          <li className="list-group-item"><strong>Secuencia:</strong> {alumno.secuencia}</li>
        </ul>
        <button className="btn btn-primary mt-3" onClick={onBack}>Volver al Sistema</button>
      </div>
    </div>
  );
}

export default StudentDetail;
