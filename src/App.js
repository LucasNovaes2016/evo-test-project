import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormSection from './components/formsection';
import HeaderSection from './components/header';
import GridSection from './components/gridsection';
import { initial_did_items_list } from './core/data';
import { createServerFunction } from './createServerFunction';
import {
  SET_DID_ITEMS,
  SET_BLOCK_CRITICAL_LAYOUT_PARTS,
} from './core/redux/types';

// Setting initial database on localStorage if it has not been initialized yet
if (!JSON.parse(localStorage.getItem('@evo-test-project/did_items_list_1'))) {
  localStorage.setItem(
    '@evo-test-project/did_items_list_1',
    JSON.stringify(initial_did_items_list)
  );
}

// Create server and all endpoints
createServerFunction();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_BLOCK_CRITICAL_LAYOUT_PARTS,
      payload: true,
    });

    fetch('/api/did-items-list')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: SET_BLOCK_CRITICAL_LAYOUT_PARTS,
          payload: false,
        });
        dispatch({ type: SET_DID_ITEMS, payload: data });
      });
  }, [dispatch]);

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
