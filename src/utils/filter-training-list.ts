import { INVITE_STATUS } from '@constants/invite-status';

import { UserJointTrainig } from '../types';

export const sortTrainingList = (traininglist: UserJointTrainig[], searchValue: string) => {
    if (!traininglist.length) return [];

    const acceptedTrainings: UserJointTrainig[] = [];
    const rejectedTrainings: UserJointTrainig[] = [];
    const pendingTrainings: UserJointTrainig[] = [];
    const trainings: UserJointTrainig[] = [];

    [...traininglist]
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((training) => {
            if (training.status === INVITE_STATUS.PENDING) pendingTrainings.push(training);
            if (training.status === INVITE_STATUS.ACCEPTED) acceptedTrainings.push(training);
            if (training.status === INVITE_STATUS.REJECTED) rejectedTrainings.push(training);
            if (!training.status) trainings.push(training);
        });

    const filter = [
        ...acceptedTrainings,
        ...pendingTrainings,
        ...trainings,
        ...rejectedTrainings,
    ].filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()));

    return filter;
};
