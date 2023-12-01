import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Finder from "./pages/Finder";
import Farms from "./pages/Farms";
import Advanced from "./pages/Advanced";
import Archive from "./pages/Archive";
import NoPage from "./pages/404";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

        
        <BrowserRouter>
            <App />
            <Routes>
                <Route path="/" element={<Layout  />}>
                    <Route index element={<Home />} />
                    <Route path="finder" element={<Finder />} />
                    <Route path="farms" element={<Farms />} />
                    <Route path="advanced" element={<Advanced />} />
                    <Route path="worlds" element={<Archive />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
