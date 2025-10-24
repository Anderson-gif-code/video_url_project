// /frontend/src/routes/Private.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header'; // <-- Importa o Header

function PrivateRoute() {
    const token = localStorage.getItem('@Treinamentos:token');

    if (token) {
        return (
            // Adiciona o Header acima do conteúdo da página
            <>
                <Header />
                <div style={{ padding: 20 }}>
                    <Outlet />
                </div>
            </>
        );
    }

    return <Navigate to="/login" replace />;
}

export default PrivateRoute;