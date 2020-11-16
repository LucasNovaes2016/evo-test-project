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

    this.post('/api/did-items-list', (schema, request) => {
      const new_did_item = JSON.parse(request.requestBody);
      const current_did_items_list = JSON.parse(
        localStorage.getItem('@evo-test-project/did_items_list_1')
      );
      const new_id =
        current_did_items_list[current_did_items_list.length - 1] + 1;

      if (
        JSON.parse(
          localStorage.getItem('@evo-test-project/did_items_list_1')
        ).find((did_item) => did_item.value === new_did_item.value)
      ) {
        return {
          errorMessage: 'This phone number is already taken.',
          new_did_items_list: null,
        };
      } else {
        localStorage.setItem(
          '@evo-test-project/did_items_list_1',
          JSON.stringify([
            { id: new_id, ...new_did_item },
            ...current_did_items_list,
          ])
        );

        return {
          errorMessage: null,
          new_did_items_list: JSON.parse(
            localStorage.getItem('@evo-test-project/did_items_list_1')
          ),
        };
      }
    });

    //   this.put('/api/employees/:id', (schema, request) => {
    //     console.log('request.params edit = ', request.params);
    //     return true;
    //   });

    this.delete('/api/did-items-list/:id', (schema, request) => {
      localStorage.setItem(
        '@evo-test-project/did_items_list_1',
        JSON.stringify(
          JSON.parse(
            localStorage.getItem('@evo-test-project/did_items_list_1')
          ).filter((item) => item.id !== parseInt(request.params.id))
        )
      );

      return localStorage.getItem('@evo-test-project/did_items_list_1');
    });
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
