import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppActionsType, appReducer} from './app-reducer';

const rootReducer = combineReducers({
	app: appReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

type AppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
	AppRootStateType,
	unknown,
	RootActionsType>;
type RootActionsType = AppActionsType

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;