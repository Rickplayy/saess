import React from 'react';

function Summary({ alumnos }) {
  const totalAlumnos = alumnos.length;

  const alumnosPorCarrera = alumnos.reduce((acc, alumno) => {
    acc[alumno.carrera] = (acc[alumno.carrera] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="row mb-4">
      <div className="col-md-3">
        <div className="card text-center" style={{ backgroundColor: '#6a5acd', color: 'white' }}>
          <div className="card-body">
            <h5 className="card-title">{totalAlumnos}</h5>
            <p className="card-text">Total Alumnos</p>
          </div>
        </div>
      </div>
      {Object.entries(alumnosPorCarrera).map(([carrera, count]) => (
        <div className="col-md-3" key={carrera}>
          <div className="card text-center summary-card">
            <div className="card-body">
              <h5 className="card-title">{count}</h5>
              <p className="card-text">{carrera}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Summary;
