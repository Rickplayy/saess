import React, { useState } from 'react';

function StudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({
    boleta: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    carrera: '',
    secuencia: '',
    confirm: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.confirm) {
      alert('Debe confirmar que los datos ingresados son correctos.');
      return;
    }
    const { confirm, ...studentData } = formData;
    onAddStudent(studentData);
    setFormData({ // Reset form
      boleta: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      carrera: '',
      secuencia: '',
      confirm: false,
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5>Formulario de Inscripción</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="boleta" className="form-label">Número de Boleta *</label>
              <input
                type="text"
                className="form-control"
                id="boleta"
                name="boleta"
                value={formData.boleta}
                onChange={handleChange}
                placeholder="Ejemplo: 2022340122"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="nombre" className="form-label">Nombre(s) *</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="apellidoPaterno" className="form-label">Apellido Paterno *</label>
              <input
                type="text"
                className="form-control"
                id="apellidoPaterno"
                name="apellidoPaterno"
                value={formData.apellidoPaterno}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="apellidoMaterno" className="form-label">Apellido Materno *</label>
              <input
                type="text"
                className="form-control"
                id="apellidoMaterno"
                name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="carrera" className="form-label">Carrera *</label>
              <input
                type="text"
                className="form-control"
                id="carrera"
                name="carrera"
                value={formData.carrera}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="secuencia" className="form-label">Secuencia *</label>
              <input
                type="text"
                className="form-control"
                id="secuencia"
                name="secuencia"
                value={formData.secuencia}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="confirm"
                  name="confirm"
                  checked={formData.confirm}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="confirm">
                  Confirmo que los datos ingresados son correctos
                </label>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Registrar Alumno</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
