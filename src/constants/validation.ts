import { Rule } from 'antd/lib/form';

export const PASSWORD_MESSAGE_ERROR = 'Пароль не менее 8 символов, с заглавное буквой и цифрой.';

export const VALIDATION_FIELD_REQUIRED: Rule = { required: true, message: '' };
export const VALIDATION_EMAIL: Rule = { type: 'email', message: '' };
export const VALIDATION_PASSWORD: Rule = {
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    message: PASSWORD_MESSAGE_ERROR,
};
