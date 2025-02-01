import toastrReducer from '../features/toastr/slice';
import toastrMiddleware from '../features/toastr/middleware';
import {
    configureStore,
    combineReducers
} from '@reduxjs/toolkit';
import {
    useDispatch,
    useSelector,
    TypedUseSelectorHook
} from 'react-redux';

const rootReducer = combineReducers({
    toastr: toastrReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(toastrMiddleware)
});

export default store;