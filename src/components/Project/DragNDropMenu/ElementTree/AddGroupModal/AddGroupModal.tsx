import {
    AddGroupModalItemsI,
    AddGroupModalProps,
} from "@/components/Project/types";
import { useAppDispatch, useAppSelector } from "@/core/hooks/reducers";
import { appSlice } from "@/store/reducers/appReducer";
import { addNewGroupAndMoveElement } from "@/store/reducers/elementListReducer";
import { CreateGroupAndMoveElementPayload } from "@/store/types/elementListReducer";
import { INotification } from "@/types/notification.types";
import FloatingLabelInpuBorder from "@/UI/FloatingLabelInputBorder/FloatingLabelInputBorder";
import { FORM_RULES } from "@/utils/globalConstants";
import { Form } from "antd";
import { useForm } from "antd/es/form/Form";

import Modal from "antd/es/modal/Modal";
import { FC } from "react";

const AddGroupModal: FC<AddGroupModalProps> = ({ open, onClose }) => {
    const [form] = useForm<AddGroupModalItemsI>();
    const dispatch = useAppDispatch();
    const { currentElementId, allElements } = useAppSelector(
        (state) => state.elementListReducer.present
    );

    const handleClose = () => {
        onClose();
        form.resetFields();
    };

    const handleOk = async () => {
        await form.validateFields();
        const values = form.getFieldsValue();

        const isHasGroupWithThisName = allElements.find(el => el.type === 'group' && el.label === values.group)

        if (isHasGroupWithThisName) {
            const payload: INotification = {
                statusCode: '400',
                message: 'Группа с данным именем уже существует'
            }
            return dispatch(appSlice.actions.setNotification(payload))
        }

        if (currentElementId) {
            const payload: CreateGroupAndMoveElementPayload = {
                group: values.group,
                elementId: currentElementId,
            };
            dispatch(addNewGroupAndMoveElement(payload));
            handleClose()
        }
    };

    return (
        <Modal
            open={open}
            onOk={handleOk}
            onCancel={handleClose}
            okText="Создать"
            title="Создание группы"
            cancelText="Отмена"
        >
            <Form form={form}>
                <Form.Item<AddGroupModalItemsI> name="group" rules={FORM_RULES}>
                    <FloatingLabelInpuBorder label="Название" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddGroupModal;
