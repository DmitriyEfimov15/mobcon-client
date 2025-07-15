import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Image, notification } from "antd";
import type { UploadProps } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { FC, useEffect, useState } from "react";
import * as classes from "./index.module.scss";

interface CustomUploadProps {
    initialImageUrl?: string;
    isEdit?: boolean;
    setFile: React.Dispatch<React.SetStateAction<RcFile | null>>;
}

const CustomUpload: FC<CustomUploadProps> = ({
    initialImageUrl,
    setFile,
    isEdit,
}) => {
    const [imageUrl, setImageUrl] = useState<string | null>(
        initialImageUrl && isEdit ? `${process.env.API_URL}/${initialImageUrl}` : null
    );
    console.log(imageUrl);
    const [api] = notification.useNotification();
    const handleBeforeUpload = (file: RcFile) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            api["error"]({
                message: "Ошибка",
                description: "Можно загружать только изображения!",
                duration: 4000,
            });
            return false;
        }

        const previewUrl = URL.createObjectURL(file);
        setImageUrl(previewUrl);
        setFile(file);

        // Не отправляем файл на сервер (загрузка вручную или предпросмотр)
        return false;
    };

    const uploadProps: UploadProps = {
        beforeUpload: handleBeforeUpload,
        showUploadList: false,
        accept: "image/*",
    };

    return (
        <div className={classes.container}>
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt="Предпросмотр"
                    width={200}
                    height="auto"
                    style={{ borderRadius: 8 }}
                    preview={false}
                />
            )}
            <Upload {...uploadProps} className={classes.button}>
                <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
            </Upload>
        </div>
    );
};

export default CustomUpload;
