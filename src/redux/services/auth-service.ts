import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, RegisterRequest, LoginResponse } from '../../types';
import { RootState } from '@redux/configure-store';
import { API_HOST, API_PATH } from '@constants/index';

export const authApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: API_HOST,
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
    }),
});

export const { useLoginMutation, useRegistrationMutation } = authApi;

export const authSelector = (state: RootState) => state.auth;
