import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    LoginRequest,
    RegisterRequest,
    LoginResponse,
    CheckEmailRequest,
    ConfirmEmailRequest,
    ChangePasswordRequest,
} from '../../types';
import { RootState } from '@redux/configure-store';
import { API_HOST, API_PATH } from '@constants/index';

export const authApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: API_HOST,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: API_PATH.login,
                method: 'POST',
                body: credentials,
            }),
        }),
        registration: builder.mutation<void, RegisterRequest>({
            query: (credentials) => ({
                url: API_PATH.register,
                method: 'POST',
                body: credentials,
            }),
        }),
        checkEmail: builder.mutation<void, CheckEmailRequest>({
            query: (credentials) => ({
                url: API_PATH.checkEmail,
                method: 'POST',
                body: credentials,
            }),
        }),
        confirmEmail: builder.mutation<void, ConfirmEmailRequest>({
            query: (credentials) => ({
                url: API_PATH.confirmEmail,
                method: 'POST',
                body: credentials,
            }),
        }),
        changePassword: builder.mutation<void, ChangePasswordRequest>({
            query: (credentials) => ({
                url: API_PATH.changePassword,
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

export const authSelector = (state: RootState) => state.auth;
