import { API_PATH } from '@constants/index';

import { GetCurrentUserResponse, UpdateUserRequest, UpdateUserResponse } from '../../types';
import { apiSlice } from '.';
import { setProfile } from '@redux/reducers/profile-slice';

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
    }),
});

export const { useGetCurrentUserQuery, useUpdateUserMutation } = profileApi;
