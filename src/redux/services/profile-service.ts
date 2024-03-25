import { API_PATH } from '@constants/index';
import { setProfile, setTariffs } from '@redux/reducers/profile-slice';

import {
    BuyTariffRequest,
    GetCurrentUserResponse,
    GetTariffListResponse,
    UpdateUserRequest,
    UpdateUserResponse,
} from '../../types';

import { apiSlice } from '.';

export const profileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<GetCurrentUserResponse, void>({
            query: () => ({
                url: API_PATH.CURRENT_USER,
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(setProfile(data));
                } catch {
                    dispatch(setProfile(null));
                }
            },
        }),
        updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
            query: (user) => ({
                url: API_PATH.USER,
                method: 'PUT',
                body: user,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(setProfile(data));
                } catch {
                    dispatch(setProfile(null));
                }
            },
        }),
        getTariffList: builder.query<GetTariffListResponse, void>({
            query: () => ({
                url: API_PATH.TARIFF_LIST,
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(setTariffs(data));
                } catch {
                    dispatch(setTariffs([]));
                }
            },
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
    useGetCurrentUserQuery,
    useUpdateUserMutation,
    useGetTariffListQuery,
    useBuyTariffMutation,
} = profileApi;
