import { RuleRender } from 'antd/lib/form';

export const confirmPasswordRule: (name: string) => RuleRender =
    (name) =>
    ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue(name) === value) {
                return Promise.resolve();
            }

            return Promise.reject(new Error('Пароли не совпадают'));
        },
    });
