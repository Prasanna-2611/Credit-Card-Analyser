import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CardsPage from './pages/CardsPage';
import AnalysePage from './pages/AnalysePage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/analyse" element={<AnalysePage />} />
      </Routes>
    </BrowserRouter>
  );
}
