import { PATH } from '@routes/path';

import { ResultConfigs } from '../types';

import { DATA_TEST_ID } from './data-test-id';

export const RESULT_CONFIGS: ResultConfigs = {
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
