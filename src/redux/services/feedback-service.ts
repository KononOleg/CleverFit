import { API_PATH } from '@constants/index';
import { apiSlice } from '.';
import { GetFeedbacksResponse } from '../../types';

export const feedbackApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFeedbacks: builder.query<GetFeedbacksResponse, void>({
            query: () => ({
                url: API_PATH.FEEDBACK,
            }),
        }),
    }),
});

export const { useGetFeedbacksQuery } = feedbackApi;
