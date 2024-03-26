import { createReduxHistoryContext } from 'redux-first-history';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import { listenerMiddleware } from './effects/effects';
import { appSlice } from './reducers/app-slice';
import { authSlice } from './reducers/auth-slice';
import { profileSlice } from './reducers/profile-slice';
import { trainingSlice } from './reducers/training-slice';
import { apiSlice } from './services';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 10,
});

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        app: appSlice.reducer,
        auth: authSlice.reducer,
        training: trainingSlice.reducer,
        profile: profileSlice.reducer,
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
