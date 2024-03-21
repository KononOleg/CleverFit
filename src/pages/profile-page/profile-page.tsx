import { Card } from 'antd';
import { ProfileForm } from './components/profile-form';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
    return (
        <Card className={styles.ProfileCard}>
            <ProfileForm />
        </Card>
    );
};
