import React from 'react';

function StudentList({ alumnos, onDeleteStudent, onViewDetails }) {
  // Helper function to get a consistent color for careers (optional, but nice for UI)
  const getCareerColorClass = (carrera) => {
    const colors = {
      'Ciencias De La Informatica': 'bg-success',
      'Ingeniería En Informatica': 'bg-info',
      'Ingeniería Industrial': 'bg-secondary',
      // Add more careers and colors as needed
    };
    return colors[carrera] || 'bg-primary'; // Default color
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-success text-white">
        <h5>Lista de Alumnos Registrados</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Boleta</th>
                <th>Nombre Completo</th>
                <th>Carrera</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => (
                <tr key={alumno.boleta}>
                  <td>{alumno.boleta}</td>
                  <td>{`${alumno.nombre} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}`}</td>
                  <td>
                    <span className={`badge ${getCareerColorClass(alumno.carrera)}`}>
                      {alumno.carrera}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => onViewDetails(alumno.boleta)}
                    >
                      <i className="bi bi-eye"></i> Ver
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDeleteStudent(alumno.boleta)}
                    >
                      <i className="bi bi-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
