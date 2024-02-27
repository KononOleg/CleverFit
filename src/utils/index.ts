import { RuleRender } from 'antd/lib/form';
import { Action, Location } from 'history';


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

export const checkPrevPath = (prevLocation: {
    location?: Location | null | undefined;
    action?: Action | null | undefined;
}[] | undefined, path: string) =>
    prevLocation?.length && prevLocation[1]?.location?.pathname === path;

