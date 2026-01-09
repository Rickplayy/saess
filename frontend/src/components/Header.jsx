import React from 'react';

function Header({ setView }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">PROYECTO</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => setView('inscribir')}>Inscribir</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => setView('alumnos')}>Alumnos</button>
            </li>
            {/* The 'Buscar' functionality is not explicitly detailed in images,
                so we'll keep it as a placeholder or integrate into 'Alumnos' view if needed later */}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
