import { HttpStatusCode, PATH } from '@constants/index';
import { setConfirmEmail, setPassword, setToken } from '@redux/reducers/auth-slice';
import { createTraining, setIsCardExercises, updateTraining } from '@redux/reducers/training-slice';
import { authApi } from '@redux/services/auth-service';
import { trainingApi } from '@redux/services/training-service';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: ({ payload, meta }, { dispatch }) => {
        const accessToken = payload.accessToken;
        const remember = meta.arg.originalArgs.remember;
        dispatch(setToken({ accessToken, remember }));
        dispatch(push(PATH.MAIN));
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchRejected,
    effect: (_, { dispatch }) => {
        dispatch(push(PATH.ERROR_LOGIN));
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.registration.matchFulfilled,
    effect: (_, { dispatch }) => {
        dispatch(push(PATH.SUCCESS));
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.registration.matchRejected,
    effect: ({ meta, payload }, { dispatch }) => {
        if (payload?.status === HttpStatusCode.CONFLICT) dispatch(push(PATH.ERROR_USER_EXIST));
        else {
            const password = meta.arg.originalArgs.password;
            dispatch(setPassword({ password }));
            dispatch(push(PATH.ERROR));
        }
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.checkEmail.matchFulfilled,
    effect: ({ meta }, { dispatch }) => {
        const email = meta.arg.originalArgs.email;
        dispatch(setConfirmEmail({ email }));
        dispatch(push(PATH.CONFIRM_EMAIL));
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.checkEmail.matchRejected,
    effect: ({ meta, payload }, { dispatch }) => {
        if (payload?.data) dispatch(push(PATH.ERROR_CHECK_EMAIL_NO_EXIST));
        else {
            const email = meta.arg.originalArgs.email;
            dispatch(setConfirmEmail({ email }));
            dispatch(push(PATH.ERROR_CHECK_EMAIL));
        }
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.confirmEmail.matchFulfilled,
    effect: (_, { dispatch }) => {
        dispatch(push(PATH.CHANGE_PASSWORD));
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.changePassword.matchFulfilled,
    effect: (_, { dispatch }) => {
        dispatch(push(PATH.SUCCESS_CHANGE_PASSWORD));
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.changePassword.matchRejected,
    effect: ({ meta }, { dispatch }) => {
        const password = meta.arg.originalArgs.password;
        dispatch(setPassword({ password }));
        dispatch(push(PATH.ERROR_CHANGE_PASSWORD));
    },
});

listenerMiddleware.startListening({
    matcher: trainingApi.endpoints.createTraining.matchFulfilled,
    effect: ({ payload }, { dispatch }) => {
        dispatch(setIsCardExercises(false));
        dispatch(createTraining(payload));
    },
});

listenerMiddleware.startListening({
    matcher: trainingApi.endpoints.updateTraining.matchFulfilled,
    effect: ({ meta }, { dispatch }) => {
        dispatch(setIsCardExercises(false));
        dispatch(updateTraining(meta.arg.originalArgs));
    },
});
