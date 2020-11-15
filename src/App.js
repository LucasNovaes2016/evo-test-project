import React from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormSection from './components/formsection';
import HeaderSection from './components/header';

function App() {
  return (
    <>
      <HeaderSection />
      <FormSection />
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
    </>
  );
}

export default App;
