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
};

export type TrainingList = { name: string; key: string }[];

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
