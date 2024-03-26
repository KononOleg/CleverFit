import React from 'react';
import { AlertCustom } from '@components/alert-custom';
import { ModalRequestError } from '@components/modal-request-error';
import { IMAGE_PATH } from '@constants/index';
import { useUpdateUserMutation } from '@redux/services/profile-service';
import { Card } from 'antd';

import { ProfileAvatar, User } from '../../types';

import { ProfileForm } from './components/profile-form';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
    const [updateUser, { isSuccess, isError }] = useUpdateUserMutation();

    const submitHandler = (inputs: User) => {
        const newInputs = inputs;

        if ((inputs.imgSrc as unknown as ProfileAvatar).file?.status === 'removed')
            newInputs.imgSrc = '';
        else
            newInputs.imgSrc = `${IMAGE_PATH}${
                (inputs.imgSrc as unknown as ProfileAvatar).file?.response?.url
            }`;

        updateUser(newInputs);
    };

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};
