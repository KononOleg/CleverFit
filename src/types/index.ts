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
export type UserJointTrainig = {
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

export type TrainingList = Array<{ name: string; key: string }>;

export type Invite = {
    _id: string;
    training: Training;
    status: string;
    createdAt: string;
    from: From;
};

export type GetTrainingListResponse = TrainingList;
export type GetTrainingResponse = Training[];
export type GetFeedbacksResponse = Feedback[];
export type CreateTrainingRequest = Training;
export type CreateTrainingResponse = Training;
export type UpdateTrainingRequest = Training;
export type UpdateTrainingResponse = Training;

export type GetCurrentUserResponse = User;
export type UpdateUserResponse = User;
export type UpdateUserRequest = User;

export type GetUserJointTrainingListResponse = UserJointTrainig[];
export type GetUserJointTrainingListRequest = {
    trainingType?: string;
};
export type GetTrainingPalsResponse = UserJointTrainig[];

export type GetTariffListResponse = Tariff[];
export type BuyTariffRequest = { tariffId: string; days: number };

export type SendInviteResponse = Invite;
export type SendInviteRequest = { to: string; trainingId: string };

export type GetInviteListResponse = Invite[];

export type SendInviteAnswerResponse = Invite;
export type SendInviteAnswerRequest = { id: string; status: string };

export type RemoveInviteRequest = { id: string };

export type CreateFeedbackResponse = {
    message: string;
    rating: number;
};

export type LoginResponse = {
    accessToken: string;
};

export type LoginRequest = {
    email: string;
    password: string;
    remember: boolean;
};

export type RegisterRequest = {
    email: string;
    password: string;
};

export type CheckEmailRequest = {
    email: string;
};

export type ConfirmEmailRequest = {
    email: string;
    code: string;
};

export type ChangePasswordRequest = {
    password: string;
    confirmPassword: string;
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
