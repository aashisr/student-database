import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import MainComponet from './Components/MainComponent';

function App() {
  return (
      <div className='App'>
          <BrowserRouter>
              <MainComponet />
          </BrowserRouter>
      </div>
  );
}

export default App;
