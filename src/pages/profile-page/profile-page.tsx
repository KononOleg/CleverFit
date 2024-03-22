import { Card } from 'antd';
import { ProfileForm } from './components/profile-form';

import styles from './profile-page.module.scss';
import { useUpdateUserMutation } from '@redux/services/profile-service';

import { AlertCustom } from '@components/alert-custom';
import { ModalRequestError } from '@components/modal-request-error';
import { ProfileAvatar, User } from '../../types';
import { IMAGE_PATH } from '@constants/index';

export const ProfilePage = () => {
    const [updateUser, { isSuccess, isError }] = useUpdateUserMutation();

    const submitHandler = (inputs: User) => {
        if ((inputs.imgSrc as unknown as ProfileAvatar).file?.status === 'removed')
            inputs.imgSrc = '';
        else
            inputs.imgSrc = `${IMAGE_PATH}${
                (inputs.imgSrc as unknown as ProfileAvatar).file?.response?.url
            }`;

        updateUser(inputs);
    };

    return (
        <>
            <Card className={styles.ProfileCard}>
                <ProfileForm submitHandler={submitHandler} />
            </Card>

            {isSuccess && <AlertCustom description='Данные профиля успешно обновлены' />}
            {isError && (
                <ModalRequestError
                    title='При сохранении данных произошла ошибка'
                    type='error'
                    isError={isError}
                    subtitle='Придётся попробовать ещё раз'
                    okText='Закрыть'
                />
            )}
        </>
    );
};
