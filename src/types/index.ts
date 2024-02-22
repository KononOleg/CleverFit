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

export type AuthRequest = {
    email: string;
    password: string;
    remember: boolean;
};
