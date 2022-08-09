import React, { ReactElement } from 'react';

import './App.css';
import { Alert, LinearProgress, Snackbar } from '@mui/material';

import { Form } from '../form/Form';

import { setInfo } from './app-reducer';
import { useAppDispatch, useAppSelector } from './store';

const App = (): ReactElement => {
  const isLoading = useAppSelector(state => state.app.isLoading);
  const info = useAppSelector(state => state.app.info);

  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setInfo(''));
  };

  return (
    <div className="App">
      {isLoading && <LinearProgress />}
      <header className="App-header">
        <Form />
        <Snackbar open={!!info} onClose={handleClose} autoHideDuration={3000}>
          <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            {info}
          </Alert>
        </Snackbar>
      </header>
    </div>
  );
};

export default App;
