import { Rule, RuleRender } from 'antd/lib/form';

export const requiredRule: Rule = { required: true, message: '' };
export const emailRule: Rule = { type: 'email', message: '' };
export const passwordRule: Rule = {
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    message: '',
};

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

export const checkPrevPath = (prevLocation: string | any[] | undefined, path: string) =>
    prevLocation?.length && prevLocation[1]?.location?.pathname === path;
