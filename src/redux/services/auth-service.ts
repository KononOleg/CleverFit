import { API_PATH } from '@constants/index';

import {
    ChangePasswordRequest,
    CheckEmailRequest,
    ConfirmEmailRequest,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
} from '../../types';

import { apiSlice } from '.';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: API_PATH.LOGIN,
                method: 'POST',
                body: credentials,
            }),
        }),
        registration: builder.mutation<void, RegisterRequest>({
            query: (credentials) => ({
                url: API_PATH.REGISTER,
                method: 'POST',
                body: credentials,
            }),
        }),
        checkEmail: builder.mutation<void, CheckEmailRequest>({
            query: (credentials) => ({
                url: API_PATH.CHECK_EMAIL,
                method: 'POST',
                body: credentials,
            }),
        }),
        confirmEmail: builder.mutation<void, ConfirmEmailRequest>({
            query: (credentials) => ({
                url: API_PATH.CONFIRM_EMAIL,
                method: 'POST',
                body: credentials,
            }),
        }),
        changePassword: builder.mutation<void, ChangePasswordRequest>({
            query: (credentials) => ({
                url: API_PATH.CHANGE_PASSWORD,
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
} = authApi;
