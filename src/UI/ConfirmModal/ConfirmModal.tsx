import { FC } from "react";
import * as classes from "./index.module.scss";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import CustomButton from "../CustomButton/CustomButton";
import classNames from "classnames";

interface ConfirmModalProps {
    title: string;
    message: string;
    isOpen: boolean;
    handleClose: () => void;
    confirm: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
    title,
    message,
    isOpen,
    handleClose,
    confirm,
}) => {
    return (
        <div style={{position: 'absolute'}} onClick={(e) => e.preventDefault()}>
            <Modal
                title={title}
                open={isOpen}
                onOk={confirm}
                onCancel={handleClose}
                okText="Да"
                cancelText="Отмена"
            >
                <p>{message}</p>
            </Modal>
        </div>
    );
};

export default ConfirmModal;
