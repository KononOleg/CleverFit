import { useState } from 'react';
import { Button, Form, Modal, Upload } from 'antd';
import type { UploadFile } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import { getBase64 } from '@utils/index';
import { API_HOST, API_PATH, DATA_TEST_ID, HttpStatusCode } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appSelector, authSelector } from '@redux/selectors';
import { ModalRequestError } from '@components/modal-request-error';

import styles from './upload-avatar.module.scss';

type Props = {
    imgSrc: string;
};

export const UploadAvatar = ({ imgSrc }: Props) => {
    const { isDesktopVersion } = useAppSelector(appSelector);
    const { token } = useAppSelector(authSelector);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const initialFile = {
        uid: '1',
        name: 'image.png',
        url: imgSrc,
    };

    const [fileList, setFileList] = useState<UploadFile[]>(imgSrc ? [initialFile] : []);
    const [isBigFileError, setIsBigFileError] = useState(false);

    const listType = isDesktopVersion ? 'picture-card' : 'picture';
    const isShowUploadButton = fileList.length === 0;

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview)
            file.preview = await getBase64(file.originFileObj as RcFile);

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url?.substring(file.url?.lastIndexOf('/') + 1) || '');
    };
    const handleCancel = () => setPreviewOpen(false);
    const onCloseModal = () => setIsBigFileError(false);
    const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        setFileList(newFileList);
        if (newFileList[0].error?.status === HttpStatusCode.CONFLICT) setIsBigFileError(true);
    };

    return (
        <>
            <Form.Item name='imgSrc' data-test-id={DATA_TEST_ID.PROFILE_AVATAR}>
                <Upload
                    maxCount={1}
                    action={`${API_HOST}${API_PATH.UPLOAD_IMAGE}`}
                    headers={{ authorization: `Bearer ${token}` }}
                    listType={listType}
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    accept='image/*'
                    progress={{ strokeWidth: 4, showInfo: false, size: 'default' }}
                >
                    {isShowUploadButton && (
                        <UploadAvatar.UploadButton isDesktopVersion={isDesktopVersion} />
                    )}
                </Upload>
            </Form.Item>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt='example' className={styles.PreviewImage} src={previewImage} />
            </Modal>
            <ModalRequestError
                isError={isBigFileError}
                title='Файл слишком большой'
                type='error'
                subtitle='Выберите файл размером менее 5 МБ.'
                okText='Закрыть'
                onClickButton={onCloseModal}
                dataTestId={DATA_TEST_ID.BIG_FILE_ERROR_CLOSE}
            />
        </>
    );
};

UploadAvatar.UploadButton = ({ isDesktopVersion }: { isDesktopVersion: boolean }) =>
    isDesktopVersion ? (
        <button className={styles.UploadButton} type='button'>
            <PlusOutlined />
            <div className={styles.UploadText}>Загрузить фото профиля</div>
        </button>
    ) : (
        <div className={styles.MobileButton}>
            <span className={styles.MobileText}>Загрузить фото профиля:</span>
            <Button icon={<UploadOutlined />} size='large'>
                Загрузить
            </Button>
        </div>
    );
