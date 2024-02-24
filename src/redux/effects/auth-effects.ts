import { HttpStatusCode, PATH } from '@constants/index';
import { setConfirmEmail, setToken } from '@redux/reducers/auth-slice';
import { authApi } from '@redux/services/auth-service';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: ({ payload, meta }, { dispatch }) => {
        const accessToken = payload.accessToken;
        const remember = meta.arg.originalArgs.remember;
        dispatch(setToken({ accessToken, remember }));
        dispatch(push(PATH.Main));
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchRejected,
    effect: (_, { dispatch }) => {
        dispatch(push(PATH.ErrorLogin));
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.registration.matchFulfilled,
    effect: (_, { dispatch }) => {
        dispatch(push(PATH.Success));
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.registration.matchRejected,
    effect: ({ payload }, { dispatch }) => {
        if (payload?.status === HttpStatusCode.CONFLICT) dispatch(push(PATH.ErrorUserExist));
        else dispatch(push(PATH.Error));
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.checkEmail.matchFulfilled,
    effect: ({ meta }, { dispatch }) => {
        const email = meta.arg.originalArgs.email;
        dispatch(setConfirmEmail({ email }));
        dispatch(push(PATH.ConfirmEmail));
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.confirmEmail.matchFulfilled,
    effect: (_, { dispatch }) => {
        dispatch(push(PATH.ChangePassword));
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.changePassword.matchFulfilled,
    effect: (_, { dispatch }) => {
        dispatch(push(PATH.SuccessChangePassword));
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.changePassword.matchRejected,
    effect: (_, { dispatch }) => {
        dispatch(push(PATH.ErrorChangePassword));
    },
});
