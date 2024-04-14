import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarsAll from './pages/CarsAll';
import Main from './pages/Main';
import Posts from './pages/Posts';

function App() {

  return (
    <>
    <Router>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<Main/>}/>
              <Route exact path="/CarsAll" element={<CarsAll/>}/>
              <Route exact path="/Posts" element={<Posts/>}/>
              <Route path="/*" element={<DefaultLayout/>}/>
            </Routes>
          </div>
      </Router>
    </>
  )
}

function DefaultLayout() {
  return (
    <>
      <div className="Content">
        <Routes>
          <Route path="/*" element={<NotFound />}/>
        </Routes>
      </div>
    </>
  );
}

function NotFound() {
  return (
    <div className="App">
      <h1 class="text-6xl font-bold text-red-500">404</h1>
    </div>    
  );
}

export default App;


