import ruRu from 'antd/es/calendar/locale/ru_RU';
import { PickerLocale } from 'antd/lib/date-picker/generatePicker';
import { Rule } from 'antd/lib/form';

import { ResultConfigs } from '../types';

export const YYYY_MM_DD = 'YYYY-MM-DD';
export const DD_MM_YYYY = 'DD.MM.YYYY';

export const PASSWORD_MESSAGE_ERROR = 'Пароль не менее 8 символов, с заглавное буквой и цифрой.';

export const VALIDATION_FIELD_REQUIRED: Rule = { required: true, message: '' };
export const VALIDATION_EMAIL: Rule = { type: 'email', message: '' };
export const VALIDATION_PASSWORD: Rule = {
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    message: PASSWORD_MESSAGE_ERROR,
};

export const API_HOST = 'https://marathon-api.clevertec.ru';
export const IMAGE_PATH = 'https://training-api.clevertec.ru';

export const API_PATH = {
    REGISTER: '/auth/registration',
    LOGIN: '/auth/login',
    GOOGLE: '/auth/google',
    CHECK_EMAIL: '/auth/check-email',
    CONFIRM_EMAIL: '/auth/confirm-email',
    CHANGE_PASSWORD: '/auth/change-password',
    FEEDBACK: '/feedback',
    TRAINING: '/training',
    TRAINING_LIST: '/catalogs/training-list',
    UPLOAD_IMAGE: '/upload-image',
    USER: '/user',
    CURRENT_USER: '/user/me',
    TARIFF: '/tariff',
    TARIFF_LIST: '/catalogs/tariff-list',
    USER_JOINT_TRAINING_LIST: '/catalogs/user-joint-training-list',
    TRAINING_PALS: '/catalogs/training-pals',
    INVITE: '/invite',
};

export const PATH = {
    ROOT: '/',
    MAIN: '/main',
    NOT_FOUND: '*',
    FEEDBACKS: '/feedbacks',
    CALENDAR: '/calendar',
    PROFILE: '/profile',
    SETTINGS: '/settings',
    TRAINING: '/training',
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
    MODAL_NO_REVIEW: 'modal-no-review',
    MENU_BUTTON_CALENDAR: 'menu-button-calendar',
    MODAL_ERROR_USER_TRAINING_TITLE: 'modal-error-user-training-title',
    MODAL_ERROR_USER_TRAINING_SUBTITLE: 'modal-error-user-training-subtitle',
    MODAL_ERROR_USER_TRAINING_BUTTON: 'modal-error-user-training-button',
    MODAL_ERROR_USER_TRAINING_BUTTON_CLOSE: 'modal-error-user-training-button-close',
    MODAL_CREATE_TRAINING: 'modal-create-training',
    MODAL_CREATE_TRAINING_BUTTON_CLOSE: 'modal-create-training-button-close',
    MODAL_UPDATE_TRAINING_EDIT_BUTTON: 'modal-update-training-edit-button',
    MODAL_CREATE_EXERCISE: 'modal-create-exercise',
    MODAL_CREATE_EXERCISE_SELECT: 'modal-create-exercise-select',
    MODAL_EXERCISE_TRAINING_BUTTON_CLOSE: 'modal-exercise-training-button-close',
    MODAL_DRAWER_RIGHT: 'modal-drawer-right',
    MODAL_DRAWER_RIGHT_BUTTON_CLOSE: 'modal-drawer-right-button-close',
    MODAL_DRAWER_RIGHT_INPUT_EXERCISE: 'modal-drawer-right-input-exercise',
    MODAL_DRAWER_RIGHT_CHECKBOX_EXERCISE: 'modal-drawer-right-checkbox-exercise',
    MODAL_DRAWER_RIGHT_INPUT_APPROACH: 'modal-drawer-right-input-approach',
    MODAL_DRAWER_RIGHT_INPUT_WEIGHT: 'modal-drawer-right-input-weight',
    MODAL_DRAWER_RIGHT_INPUT_QUANTITY: 'modal-drawer-right-input-quantity',
    MODAL_DRAWER_RIGHT_DATE_PICKER: 'modal-drawer-right-date-picker',
    MODAL_DRAWER_RIGHT_CHECKBOX_PERIOD: 'modal-drawer-right-checkbox-period',
    MODAL_DRAWER_RIGHT_SELECT_PERIOD: 'modal-drawer-right-select-period',
    MENU_BUTTON_PROFILE: 'menu-button-profile',
    HEADER_SETTINGS: 'header-settings',
    SETTINGS_BACK: 'settings-back',
    PROFILE_AVATAR: 'profile-avatar',
    PROFILE_NAME: 'profile-name',
    PROFILE_SURNAME: 'profile-surname',
    PROFILE_EMAIL: 'profile-email',
    PROFILE_BIRTHDAY: 'profile-birthday',
    PROFILE_PASSWORD: 'profile-password',
    PROFILE_REPEAT_PASSWORD: 'profile-repeat-password',
    PROFILE_SUBMIT: 'profile-submit',
    BIG_FILE_ERROR_CLOSE: 'big-file-error-close',
    ALERT: 'alert',
    FREE_TARIFF_CARD: 'free-tariff-card',
    PRO_TARIFF_CARD: 'pro-tariff-card',
    ACTIVATE_TARIFF_BTN: 'activate-tariff-btn',
    TARIFF_TRAININGS: 'tariff-trainings',
    TARIFF_NOTIFICATIONS: 'tariff-notifications',
    TARIFF_THEME: 'tariff-theme',
    TARIFF_THEME_ICON: 'tariff-theme-icon',
    TARIFF_TRAININGS_ICON: 'tariff-trainings-icon',
    TARIFF_NOTIFICATIONS_ICON: 'tariff-notifications-icon',
    TARIFF_SIDER: 'tariff-sider',
    TARIFF_SUBMIT: 'tariff-submit',
    TARIFF_COST: 'tariff-cost',
    TARIFF_MODAL_SUCCESS: 'tariff-modal-success',
    MENU_BUTTON_TRAINING: 'menu-button-training',
    MY_TRAININGS_TABLE: 'my-trainings-table',
    CREATE_NEW_TRAINING_BUTTON: 'create-new-training-button',
    CREATE_TRAINING_SUCCESS_ALERT: 'create-training-success-alert',
    UPDATE_MY_TRAINING_TABLE_ICON: 'update-my-training-table-icon',
    JOINT_TRAINING_CARDS: 'joint-training-cards',
    SEARCH_INPUT: 'search-input',
    NOTIFICATION_ABOUT_JOINT_TRAINING: 'notification-about-joint-training',
    JOINT_TRAINING_REVIEW_CARD: 'joint-training-review-card',
    PARTNER_MODAL: 'partner-modal',
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

export const LocalData: PickerLocale = {
    ...ruRu,
    lang: {
        ...ruRu.lang,
        ...{
            shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            shortMonths: [
                'Янв',
                'Фев',
                'Мар',
                'Апр',
                'Май',
                'Июн',
                'Июл',
                'Авг',
                'Сен',
                'Окт',
                'Ноя',
                'Дек',
            ],
        },
    },
};

export const colors = new Map([
    ['Силовая', 'yellow'],
    ['Ноги', 'red'],
    ['Руки', 'cyan'],
    ['Грудь', 'green'],
    ['Спина', 'orange'],
]);
