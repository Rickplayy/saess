import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Summary from './components/Summary';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';

function App() {
  const [view, setView] = useState('inscribir'); // 'inscribir', 'alumnos', 'detalle'
  const [alumnos, setAlumnos] = useState([]);
  const [selectedBoleta, setSelectedBoleta] = useState(null);

  const fetchAlumnos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/alumnos');
      setAlumnos(response.data);
    } catch (error) {
      console.error('Error fetching alumnos:', error);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const handleAddStudent = async (studentData) => {
    try {
      await axios.post('http://localhost:5000/api/alumnos', studentData);
      fetchAlumnos(); // Refresh the list
      setView('alumnos'); // Go to student list after adding
    } catch (error) {
      console.error('Error adding student:', error);
      alert(error.response?.data?.message || 'Error al agregar alumno');
    }
  };

  const handleDeleteStudent = async (boleta) => {
    if (window.confirm(`¿Estás seguro de eliminar al alumno con boleta ${boleta}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/alumnos/${boleta}`);
        fetchAlumnos(); // Refresh the list
      } catch (error) {
        console.error('Error deleting student:', error);
        alert(error.response?.data?.message || 'Error al eliminar alumno');
      }
    }
  };

  const handleViewDetails = (boleta) => {
    setSelectedBoleta(boleta);
    setView('detalle');
  };

  const renderContent = () => {
    switch (view) {
      case 'inscribir':
        return <StudentForm onAddStudent={handleAddStudent} />;
      case 'alumnos':
        return <StudentList alumnos={alumnos} onDeleteStudent={handleDeleteStudent} onViewDetails={handleViewDetails} />;
      case 'detalle':
        return <StudentDetail boleta={selectedBoleta} onBack={() => setView('alumnos')} />;
      default:
        return <StudentForm onAddStudent={handleAddStudent} />;
    }
  };

  return (
    <div>
      <Header setView={setView} />
      <div className="container mt-4">
        {view !== 'detalle' && <Summary alumnos={alumnos} />}
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
