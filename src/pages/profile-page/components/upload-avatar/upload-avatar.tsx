import { useState } from 'react';
import { Modal, Upload } from 'antd';
import type { UploadFile } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import { getBase64 } from '@utils/index';
import { API_HOST, API_PATH, HttpStatusCode } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector } from '@redux/selectors';
import { ModalRequestError } from '@pages/calendar-page/components/modal-request-error';

import styles from './upload-avatar.module.scss';

export const UploadAvatar = () => {
    const { token } = useAppSelector(authSelector);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isBigFileError, setIsBigFileError] = useState(false);

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

    const uploadButton = (
        <button className={styles.UploadButton} type='button'>
            <PlusOutlined />
            <div className={styles.UploadText}>Загрузить фото профиля</div>
        </button>
    );

    return (
        <>
            <Upload
                action={`${API_HOST}${API_PATH.UPLOAD_IMAGE}`}
                headers={{ authorization: `Bearer ${token}` }}
                listType='picture-card'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                accept='image/*'
                progress={{ strokeWidth: 4, showInfo: false, size: 'default' }}
            >
                {isShowUploadButton && uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt='example' className={styles.PreviewImage} src={previewImage} />
            </Modal>
            <ModalRequestError
                isError={isBigFileError}
                title='Файл слишком большой'
                type='error'
                subtitle='Выберите файл размером [......] МБ.'
                okText='Закрыть'
                onClickButton={onCloseModal}
            />
        </>
    );
};
