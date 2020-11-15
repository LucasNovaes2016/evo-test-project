import React, { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormSection from './components/formsection';
import HeaderSection from './components/header';
import GridSection from './components/gridsection';
import { initial_did_items_list } from './core/data';
import { createServer } from 'miragejs';
import { useDispatch } from 'react-redux';
import { SET_DID_ITEMS } from './core/redux/types';

// Setting initial database on localStorage
localStorage.setItem(
  '@evo-test-project/did_items_list_1',
  JSON.stringify(initial_did_items_list)
);

createServer({
  routes() {
    this.timing = 2000;

    this.get('/api/did-items-list', () => {
      return localStorage.getItem('@evo-test-project/did_items_list_1');
    });

    //   this.post('/api/employees', (schema, request) => {
    //     console.log('request = ', request);
    //     let attrs = JSON.parse(request.requestBody);
    //     return attrs;
    //   });

    //   this.put('/api/employees/:id', (schema, request) => {
    //     console.log('request.params edit = ', request.params);
    //     return true;
    //   });

    //   this.delete('/api/employees/:id', (schema, request) => {
    //     console.log('request.params delete  = ', request.params);
    //     return true;
    //   });
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/did-items-list')
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: SET_DID_ITEMS, payload: data });
      });
  }, []);

  return (
    <>
      <HeaderSection />
      <FormSection />
      <GridSection />
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
    </>
  );
}

export default App;
