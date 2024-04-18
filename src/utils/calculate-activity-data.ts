import { ActivityList } from '../types';

export const calculateActivityData = (activityList: ActivityList) => {
    let totalLoad = 0;
    let totalReplays = 0;
    let totalApproaches = 0;

    activityList.forEach(({ activity, replays, approaches }) => {
        totalLoad += activity;
        totalReplays += replays;
        totalApproaches += approaches;
    });

    return {
        totalLoad,
        loadPerDay: Math.round((totalLoad / activityList.length) * 10) / 10,
        totalReplays,
        totalApproaches,
    };
};
