import { Rule } from 'antd/lib/form';

import { ResultConfigs } from '../types';

export const PASSWORD_MESSAGE_ERROR = 'Пароль не менее 8 символов, с заглавное буквой и цифрой.';

export const VALIDATION_FIELD_REQUIRED: Rule = { required: true, message: '' };
export const VALIDATION_EMAIL: Rule = { type: 'email', message: '' };
export const VALIDATION_PASSWORD: Rule = {
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    message: PASSWORD_MESSAGE_ERROR,
};

export const API_HOST = 'https://marathon-api.clevertec.ru';

export const API_PATH = {
    REGISTER: '/auth/registration',
    LOGIN: '/auth/login',
    GOOGLE: '/auth/google',
    CHECK_EMAIL: '/auth/check-email',
    CONFIRM_EMAIL: '/auth/confirm-email',
    CHANGE_PASSWORD: '/auth/change-password',
    FEEDBACK: '/feedback',
};

export const PATH = {
    ROOT: '/',
    MAIN: '/main',
    FEEDBACKS: '/feedbacks',
    CALENDAR: '/calendar',
    AUTH: '/auth',
    REGISTER: '/auth/registration',
    CONFIRM_EMAIL: '/auth/confirm-email',
    CHANGE_PASSWORD: '/auth/change-password',
    RESULT: '/result/:status',
    ERROR_LOGIN: '/result/error-login',
    ERROR_USER_EXIST: '/result/error-user-exist',
    ERROR: '/result/error',
    SUCCESS: '/result/success',
    ERROR_CHECK_EMAIL_NO_EXIST: '/result/error-check-email-no-exist',
    ERROR_CHECK_EMAIL: '/result/error-check-email',
    ERROR_CHANGE_PASSWORD: '/result/error-change-password',
    SUCCESS_CHANGE_PASSWORD: '/result/success-change-password',
};

export const AUTH_TAB = {
    LOGIN: 'login',
    REGISTER: 'register',
};

export const DATA_TEST_ID = {
    SIDER_SWITCH: 'sider-switch',
    SIDER_SWITCH_MOBILE: 'sider-switch-mobile',
    LOADER: 'loader',
    LOGIN_EMAIL: 'login-email',
    LOGIN_PASSWORD: 'login-password',
    LOGIN_REMEMBER: 'login-remember',
    LOGIN_FORGOT_BUTTON: 'login-forgot-button',
    LOGIN_SUBMIT_BUTTON: 'login-submit-button',
    REGISTRATION_EMAIL: 'registration-email',
    REGISTRATION_PASSWORD: 'registration-password',
    REGISTRATION_CONFIRM_PASSWORD: 'registration-confirm-password',
    REGISTRATION_SUBMIT_BUTTON: 'registration-submit-button',
    CHANGE_PASSWORD: 'change-password',
    CHANGE_CONFIRM_PASSWORD: 'change-confirm-password',
    CHANGE_SUBMIT_BUTTON: 'change-submit-button',
    VERIFICATION_INPUT: 'verification-input',
    REGISTRATION_ENTER_BUTTON: 'registration-enter-button',
    REGISTRATION_RETRY_BUTTON: 'registration-retry-button',
    REGISTRATION_BACK_BUTTON: 'registration-back-button',
    LOGIN_RETRY_BUTTON: 'login-retry-button',
    CHECK_RETRY_BUTTON: 'check-retry-button',
    CHECK_BACK_BUTTON: 'check-back-button',
    CHANGE_RETRY_BUTTON: 'change-retry-button',
    CHANGE_ENTRY_BUTTON: 'change-entry-button',
    SEE_REVIEWS: 'see-reviews',
    WRITE_REVIEW_NOT_SAVED_MODAL: 'write-review-not-saved-modal',
    NEW_REVIEW_SUBMIT_BUTTON: 'new-review-submit-button',
    WRITE_REVIEW: 'write-review',
    ALL_REVIEWS_BUTTON: 'all-reviews-button',
};

export const resultConfigs: ResultConfigs = {
    'error-login': {
        status: 'warning',
        title: 'Вход не выполнен',
        subTitle: 'Что-то пошло не так. Попробуйте еще раз',
        buttonText: 'Повторить',
        href: PATH.AUTH,
        dataTestId: DATA_TEST_ID.LOGIN_RETRY_BUTTON,
    },
    success: {
        status: 'success',
        title: 'Регистрация успешна',
        subTitle:
            'Регистрация прошла успешна. Зайдите в приложение, используя свои e-mail и пароль.',
        buttonText: 'Войти',
        href: PATH.AUTH,
        dataTestId: DATA_TEST_ID.REGISTRATION_ENTER_BUTTON,
    },
    'error-user-exist': {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle:
            'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        buttonText: 'Назад к регистрации',
        href: PATH.REGISTER,
        dataTestId: DATA_TEST_ID.REGISTRATION_BACK_BUTTON,
    },
    error: {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
        buttonText: 'Повторить',
        href: PATH.REGISTER,
        dataTestId: DATA_TEST_ID.REGISTRATION_RETRY_BUTTON,
    },
    'error-check-email-no-exist': {
        status: 'error',
        title: 'Такой e-mail не зарегистрирован',
        subTitle: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail',
        buttonText: 'Попробовать снова',
        href: PATH.AUTH,
        dataTestId: DATA_TEST_ID.CHECK_RETRY_BUTTON,
    },
    'error-check-email': {
        status: 500,
        title: 'Что-то пошло не так',
        subTitle: 'Произошла ошибка, попробуйте отправить форму ещё раз',
        buttonText: 'Назад',
        href: PATH.AUTH,
        dataTestId: DATA_TEST_ID.CHECK_BACK_BUTTON,
    },
    'error-change-password': {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: 'Что-то пошло не так. Попробуйте ещё раз',
        buttonText: 'Повторить',
        href: PATH.CHANGE_PASSWORD,
        dataTestId: DATA_TEST_ID.CHANGE_RETRY_BUTTON,
    },
    'success-change-password': {
        status: 'success',
        title: 'Пароль успешно изменен',
        subTitle: 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
        buttonText: 'Вход',
        href: PATH.AUTH,
        dataTestId: DATA_TEST_ID.CHANGE_ENTRY_BUTTON,
    },
};

export const HttpStatusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
};
