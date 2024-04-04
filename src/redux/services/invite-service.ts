import { API_PATH } from '@constants/index';

import {
    GetInviteListResponse,
    GetTrainingPalsResponse,
    GetUserJointTrainingListRequest,
    GetUserJointTrainingListResponse,
    SendInviteRequest,
    SendInviteResponse,
} from '../../types';

import { apiSlice } from '.';

export const inviteApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserJointTrainingList: builder.query<
            GetUserJointTrainingListResponse,
            GetUserJointTrainingListRequest
        >({
            query: ({ trainingType }) => {
                const params: Record<string, string | undefined> = {};

                if (trainingType) params.trainingType = trainingType;

                return {
                    url: API_PATH.USER_JOINT_TRAINING_LIST,
                    method: 'GET',
                    params,
                };
            },
        }),
        getTrainingPals: builder.query<GetTrainingPalsResponse, void>({
            query: () => ({
                url: API_PATH.TRAINING_PALS,
                method: 'GET',
            }),
        }),

        getInviteList: builder.query<GetInviteListResponse, void>({
            query: () => ({
                url: API_PATH.INVITE,
                method: 'GET',
            }),
        }),

        sendInvite: builder.mutation<SendInviteResponse, SendInviteRequest>({
            query: (body) => ({
                url: API_PATH.INVITE,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useLazyGetUserJointTrainingListQuery,
    useGetTrainingPalsQuery,
    useLazyGetInviteListQuery,
    useSendInviteMutation,
} = inviteApi;
