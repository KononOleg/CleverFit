import { push } from 'redux-first-history';
import { HTTP_STATUS_CODE } from '@constants/index';
import { INVITE_STATUS } from '@constants/invite-status';
import { setConfirmEmail, setPassword, setToken } from '@redux/reducers/auth-slice';
import {
    removeInvite,
    removeTrainingPal,
    setInviteList,
    setJointTrainigList,
    setJointTrainingStatus,
    setTrainingPals,
} from '@redux/reducers/invite-slice';
import { setProfile, setTariffs } from '@redux/reducers/profile-slice';
import { createTraining, setIsCardExercises, updateTraining } from '@redux/reducers/training-slice';
import { authApi } from '@redux/services/auth-service';
import { inviteApi } from '@redux/services/invite-service';
import { profileApi } from '@redux/services/profile-service';
import { trainingApi } from '@redux/services/training-service';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { PATH } from '@routes/path';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: ({ payload, meta }, { dispatch }) => {
        const { accessToken } = payload;
        const { remember } = meta.arg.originalArgs;

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
        if (payload?.status === HTTP_STATUS_CODE.CONFLICT) dispatch(push(PATH.ERROR_USER_EXIST));
        else {
            const { password } = meta.arg.originalArgs;

            dispatch(setPassword(password));
            dispatch(push(PATH.ERROR));
        }
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.checkEmail.matchFulfilled,
    effect: ({ meta }, { dispatch }) => {
        const { email } = meta.arg.originalArgs;

        dispatch(setConfirmEmail(email));
        dispatch(push(PATH.CONFIRM_EMAIL));
    },
});

listenerMiddleware.startListening({
    matcher: authApi.endpoints.checkEmail.matchRejected,
    effect: ({ meta, payload }, { dispatch }) => {
        if (payload?.data) dispatch(push(PATH.ERROR_CHECK_EMAIL_NO_EXIST));
        else {
            const { email } = meta.arg.originalArgs;

            dispatch(setConfirmEmail(email));
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
        const { password } = meta.arg.originalArgs;

        dispatch(setPassword(password));
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

listenerMiddleware.startListening({
    matcher: profileApi.endpoints.getCurrentUser.matchFulfilled,
    effect: ({ payload }, { dispatch }) => {
        dispatch(setProfile(payload));
    },
});

listenerMiddleware.startListening({
    matcher: profileApi.endpoints.updateUser.matchFulfilled,
    effect: ({ payload }, { dispatch }) => {
        dispatch(setProfile(payload));
    },
});

listenerMiddleware.startListening({
    matcher: profileApi.endpoints.getTariffList.matchFulfilled,
    effect: ({ payload }, { dispatch }) => {
        dispatch(setTariffs(payload));
    },
});

listenerMiddleware.startListening({
    matcher: inviteApi.endpoints.getUserJointTrainingList.matchFulfilled,
    effect: ({ payload }, { dispatch }) => {
        dispatch(setJointTrainigList(payload));
    },
});

listenerMiddleware.startListening({
    matcher: inviteApi.endpoints.getTrainingPals.matchFulfilled,
    effect: ({ payload }, { dispatch }) => {
        dispatch(setTrainingPals(payload));
    },
});

listenerMiddleware.startListening({
    matcher: inviteApi.endpoints.sendInvite.matchFulfilled,
    effect: ({ meta }, { dispatch }) => {
        const { to } = meta.arg.originalArgs;

        dispatch(setJointTrainingStatus({ id: to, status: INVITE_STATUS.PENDING }));
        dispatch(removeInvite(to));
    },
});

listenerMiddleware.startListening({
    matcher: inviteApi.endpoints.getInviteList.matchFulfilled,
    effect: ({ payload }, { dispatch }) => {
        dispatch(setInviteList(payload));
    },
});

listenerMiddleware.startListening({
    matcher: inviteApi.endpoints.sendInviteAnswer.matchFulfilled,
    effect: ({ meta }, { dispatch }) => {
        const { id } = meta.arg.originalArgs;

        dispatch(removeInvite(id));
    },
});

listenerMiddleware.startListening({
    matcher: inviteApi.endpoints.removeInvite.matchFulfilled,
    effect: ({ meta }, { dispatch }) => {
        const { id } = meta.arg.originalArgs;

        dispatch(removeTrainingPal(id));
    },
});
