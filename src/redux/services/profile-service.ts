import { API_PATH } from '@constants/index';
import {
    BuyTariffRequest,
    GetCurrentUserResponse,
    GetTariffListResponse,
    UpdateUserRequest,
    UpdateUserResponse,
} from '@redux/types';

import { apiSlice } from '.';

export const profileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<GetCurrentUserResponse, void>({
            query: () => ({
                url: API_PATH.CURRENT_USER,
                method: 'GET',
            }),
        }),
        updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
            query: (user) => ({
                url: API_PATH.USER,
                method: 'PUT',
                body: user,
            }),
        }),
        getTariffList: builder.query<GetTariffListResponse, void>({
            query: () => ({
                url: API_PATH.TARIFF_LIST,
                method: 'GET',
            }),
        }),
        buyTariff: builder.mutation<void, BuyTariffRequest>({
            query: () => ({
                url: API_PATH.TARIFF,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useLazyGetCurrentUserQuery,
    useUpdateUserMutation,
    useGetTariffListQuery,
    useBuyTariffMutation,
} = profileApi;
