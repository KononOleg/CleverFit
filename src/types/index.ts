import { UploadFile } from 'antd';
import { ResultStatusType } from 'antd/lib/result';

export type Nullable<T> = T | null;

export type User = {
    email: string;
    firstName: string;
    lastName: string;
    imgSrc: string;
    birthday: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff: UserTariff;
};

export type UserTariff = {
    tariffId: string;
    expired: string;
};

export type ProfileAvatar = {
    file: UploadFile;
};

export type Feedback = {
    id: string;
    fullName: string;
    imageSrc: string;
    message: number;
    rating: number;
    createdAt: string;
};

export type Parameters = {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants?: string[];
};

export type Exercise = {
    _id?: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation?: boolean;
};

export type Training = {
    _id?: string;
    name: string;
    date: string;
    exercises: Exercise[];
    isImplementation?: boolean;
    parameters?: Parameters;
};
export type Period = {
    text: string;
    cost: number;
    days: number;
};
export type Tariff = {
    _id?: string;
    name: string;
    periods: Period[];
};
export type JointTrainig = {
    _id: string;
    id: string;
    name: string;
    imageSrc: string;
    trainingType: string;
    avgWeightInWeek: number;
    status: Nullable<string>;
    inviteId: Nullable<string>;
};

export type From = {
    _id: string;
    firstName?: string;
    lastName?: string;
    imageSrc?: string;
};
export type Activity = {
    date: string;
    activity: number;
    activityPerDay: number;
    names: string[];
    replays: number;
    approaches: number;
    name: string;
    exercises: Exercise[];
};

export type ActivityList = Activity[];

export type TrainingType = { name: string; key: string };

export type TrainingList = TrainingType[];

export type Invite = {
    _id: string;
    training: Training;
    status: string;
    createdAt: string;
    from: From;
};

export type ResultConfig = {
    status: ResultStatusType;
    title: string;
    subTitle: string;
    buttonText: string;
    href: string;
    dataTestId: string;
};

export type ResultConfigs = {
    [K in string]: ResultConfig;
};

export type PeriodOptions = {
    name: string;
    period: number;
};
