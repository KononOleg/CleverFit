import { API_PATH } from '@constants/index';

import { apiSlice } from '.';
import { GetTrainingListResponse, GetTrainingResponse } from '../../types';

export const trainingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTraining: builder.query<GetTrainingResponse, void>({
            query: () => ({
                url: API_PATH.TRAINING,
                method: 'GET',
            }),
        }),
        getTrainingList: builder.query<GetTrainingListResponse, void>({
            query: () => ({
                url: API_PATH.TRAINING_LIST,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetTrainingQuery, useGetTrainingListQuery } = trainingApi;
