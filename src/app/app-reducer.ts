import {AppThunk} from './store';
import {appApi} from './api';

const initialState = {
	isLoading: false,
	info: '',
	reset: false
};

type InitialStateType = {
	isLoading: boolean
	info: string
	reset: boolean
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
	switch (action.type) {
		case 'app/SET-IS-LOADING':
		case 'app/SET-INFO':
		case 'app/SET-RESET':
			console.log(action.payload);
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
};

// _________________Actions____________________

export const setIsLoading = (isLoading: boolean) => {
	return {
		type: 'app/SET-IS-LOADING',
		payload: {
			isLoading
		}
	} as const;
};

export const setInfo = (info: string) => {
	return {
		type: 'app/SET-INFO',
		payload: {
			info
		}
	} as const;
};

export const setReset = (reset: boolean) => {
	return {
		type: 'app/SET-RESET',
		payload: {
			reset
		}
	}as const
}

// _______________________THUNKS_________________

export const createFeedbackMessage = (): AppThunk => async (dispatch) => {
	try {
		dispatch(setIsLoading(true));
		dispatch(setReset(false))
		const res = await appApi.getAnyResponseFromApi();
		dispatch(setInfo('Ok...'))
		dispatch(setReset(true))
	} catch (e: any) {
		dispatch(setInfo(e.message))
	} finally {
		dispatch(setIsLoading(false));
	}
};

// ______________________TYPES___________________

export type AppActionsType = |SetIsLoadingAT
	| SetInfoAT
	| SetResetAT
type SetIsLoadingAT = ReturnType<typeof setIsLoading>
type SetInfoAT = ReturnType<typeof setInfo>
type SetResetAT = ReturnType<typeof setReset>
