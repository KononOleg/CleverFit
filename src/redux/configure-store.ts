import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

import { listenerMiddleware } from './effects/auth-effects';
import { authSlice } from './reducers/auth-slice';
import { apiSlice } from './services';
import { trainingSlice } from './reducers/training-slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 10,
});

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice.reducer,
        training: trainingSlice.reducer,
        router: routerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            routerMiddleware,
            listenerMiddleware.middleware,
            apiSlice.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const history = createReduxHistory(store);
