import { API_PATH } from '@constants/index';

import { apiSlice } from '.';
import {
    CreateTrainingRequest,
    CreateTrainingResponse,
    GetTrainingListResponse,
    GetTrainingResponse,
} from '../../types';

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
        createTraining: builder.mutation<CreateTrainingResponse, CreateTrainingRequest>({
            query: (training) => ({
                url: API_PATH.TRAINING,
                method: 'POST',
                body: training,
            }),
        }),
    }),
});

export const {
    useGetTrainingQuery,
    useGetTrainingListQuery,
    useCreateTrainingMutation,
    useLazyGetTrainingQuery,
} = trainingApi;
