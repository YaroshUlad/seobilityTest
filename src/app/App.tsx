import React from 'react';
import './App.css';
import {Form} from '../form/Form';
import {useAppDispatch, useAppSelector} from './store';
import {Alert, LinearProgress, Snackbar} from '@mui/material';
import {setInfo} from './app-reducer';

function App() {
	const isLoading = useAppSelector(state => state.app.isLoading);
	const info = useAppSelector(state => state.app.info);

	const dispatch = useAppDispatch()

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch(setInfo(''))
	};
	return (
		<div className="App">
			{isLoading && <LinearProgress/>}
			<header className="App-header">
				<Form/>
				<Snackbar open={ !!info}
				          onClose={handleClose}
				          autoHideDuration={3000}>
					<Alert onClose={handleClose} severity="info" sx={{width: '100%'}}>
						{info}
					</Alert>
				</Snackbar>
			</header>
		</div>
	);
}

export default App;
