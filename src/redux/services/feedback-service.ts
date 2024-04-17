import { API_PATH } from '@constants/index';
import { CreateFeedbackResponse, GetFeedbacksResponse } from '@redux/types';

import { apiSlice } from '.';

import { Feedback } from '@/types/index';

export const feedbackApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFeedbacks: builder.query<GetFeedbacksResponse, void>({
            query: () => ({
                url: API_PATH.FEEDBACK,
            }),
            transformResponse: (baseQueryReturnValue: Feedback[]) =>
                baseQueryReturnValue.sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                ),
        }),
        createFeedback: builder.mutation<void, CreateFeedbackResponse>({
            query: (feedback) => ({
                url: API_PATH.FEEDBACK,
                method: 'POST',
                body: feedback,
            }),
        }),
    }),
});

export const { useGetFeedbacksQuery, useCreateFeedbackMutation } = feedbackApi;
