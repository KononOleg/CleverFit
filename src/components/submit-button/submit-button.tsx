import React from 'react';

import { Button, Form, FormInstance } from 'antd';

import styles from './submit-button.module.scss';

export const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = React.useState(false);

    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [form, values]);

    return (
        <Button
            className={styles.LoginButton}
            type='primary'
            htmlType='submit'
            size='large'
            disabled={!submittable}
            block
        >
            Войти
        </Button>
    );
};
