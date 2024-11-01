import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FirstLayout = () => {
  return (
    <>
      {/* Header */}
      <header>
        {/* Agrega tus componentes de encabezado aquí */}
      </header>

      {/* Main Content Area */}
      <main className="home-container">
        <div className="responsive-home-content">
          {/* Aquí irá tu componente Home */}
          <h1>Home</h1>
          {/* Añade más contenido según sea necesario */}
        </div>
      </main>

      {/* Footer */}
      <footer>
        {/* Agrega tus componentes de pie de página aquí */}
      </footer>
    </>
  );
};

export default FirstLayout;