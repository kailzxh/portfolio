import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { ProjectsProvider } from './context/ProjectsContext';
import { SkillsProvider } from './context/SkillsContext';
import { ThemeProvider } from './context/ThemeContext';
import AdminLogin from './pages/AdminLogin';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <ThemeProvider>
      <ProjectsProvider>
        <SkillsProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </SkillsProvider>
      </ProjectsProvider>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;