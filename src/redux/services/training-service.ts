import { API_PATH } from '@constants/index';

import {
    CreateTrainingRequest,
    CreateTrainingResponse,
    GetTrainingListResponse,
    GetTrainingResponse,
    UpdateTrainingRequest,
    UpdateTrainingResponse,
} from '../../types';

import { apiSlice } from '.';

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
        updateTraining: builder.mutation<UpdateTrainingResponse, UpdateTrainingRequest>({
            query: (training) => ({
                // eslint-disable-next-line no-underscore-dangle
                url: `${API_PATH.TRAINING}/${training._id}`,
                method: 'PUT',
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
    useUpdateTrainingMutation,
} = trainingApi;
