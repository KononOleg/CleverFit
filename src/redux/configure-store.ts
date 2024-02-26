import { configureStore } from '@reduxjs/toolkit';

import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { listenerMiddleware } from './effects/auth-effects';
import { authApi } from './services/auth-service';
import { authSlice } from './reducers/auth-slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 10,
});

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authSlice.reducer,
        router: routerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            routerMiddleware,
            listenerMiddleware.middleware,
            authApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const authSelector = (state: RootState) => state.auth;
export const prevLocationsSelector = (state: RootState) => state.router?.previousLocations;

export const history = createReduxHistory(store);
