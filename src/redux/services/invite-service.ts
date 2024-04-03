import { API_PATH } from '@constants/index';

import {
    GetTrainingPalsResponse,
    GetUserJointTrainingListRequest,
    GetUserJointTrainingListResponse,
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
    }),
});

export const { useLazyGetUserJointTrainingListQuery, useGetTrainingPalsQuery } = inviteApi;
