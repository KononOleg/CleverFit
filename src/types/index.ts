import { ResultStatusType } from 'antd/lib/result';

export type User = {
    email: string;
    firstName: string;
    lastName: string;
    imgSrc: string;
    readyForJointTraining: boolean;
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
};

export type ResultConfigs = {
    [K in string]: ResultConfig;
};
