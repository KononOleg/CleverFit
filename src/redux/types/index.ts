import { Feedback, Invite,JointTrainig, Tariff, Training, TrainingList, User } from '@/types/index';

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

export type GetUserJointTrainingListResponse = JointTrainig[];
export type GetUserJointTrainingListRequest = {
    trainingType?: string;
};
export type GetTrainingPalsResponse = JointTrainig[];

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
