import { QueryStatus } from '@reduxjs/toolkit/query';
import { RootState } from './configure-store';

export const authSelector = (state: RootState) => state.auth;
export const prevLocationsSelector = (state: RootState) => state.router?.previousLocations;
export const trainingSelector = (state: RootState) => state.training;

export const fetchingSelector = (state: RootState) => {
    return Object.values({ ...state.api.mutations, ...state.api.queries }).some((query) => {
        return query && query.status === QueryStatus.pending;
    });
};
