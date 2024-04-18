import { API_PATH } from '@constants/index';
import {
    GetInviteListResponse,
    GetTrainingPalsResponse,
    GetUserJointTrainingListRequest,
    GetUserJointTrainingListResponse,
    RemoveInviteRequest,
    SendInviteAnswerRequest,
    SendInviteAnswerResponse,
    SendInviteRequest,
    SendInviteResponse,
} from '@redux/types';

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

        sendInviteAnswer: builder.mutation<SendInviteAnswerResponse, SendInviteAnswerRequest>({
            query: (body) => ({
                url: API_PATH.INVITE,
                method: 'PUT',
                body,
            }),
        }),
        removeInvite: builder.mutation<void, RemoveInviteRequest>({
            query: (body) => ({
                url: `${API_PATH.INVITE}/${body.id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useLazyGetUserJointTrainingListQuery,
    useGetTrainingPalsQuery,
    useLazyGetTrainingPalsQuery,
    useLazyGetInviteListQuery,
    useSendInviteMutation,
    useSendInviteAnswerMutation,
    useRemoveInviteMutation,
} = inviteApi;
