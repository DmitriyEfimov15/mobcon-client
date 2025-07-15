import { Form, FormInstance, Modal } from "antd";
import { FC } from "react";
import FloatingLabelInpuBorder from "../FloatingLabelInputBorder/FloatingLabelInputBorder";
import CustomUpload from "../CustomUpload/CustomUpload";
import { FormCreateProject } from "@/components/Projects/Dashboard/types";
import { RcFile } from "antd/es/upload";

interface ProjectModalProps {
    isEdit?: boolean;
    isProjectModalOpen: boolean;
    form: FormInstance<FormCreateProject>;
    initialImageUrl?: string;
    handleCloseProjectModal: () => void;
    onFinish: () => void;
    setFile: React.Dispatch<React.SetStateAction<RcFile | null>>;
}

const ProjectModal: FC<ProjectModalProps> = ({
    form,
    isEdit = false,
    isProjectModalOpen,
    initialImageUrl,
    setFile,
    handleCloseProjectModal,
    onFinish,
}) => {
    return (
        <Modal
            title={isEdit ? "Редактировать проект" : "Создать проект"}
            okText={isEdit ? "Редактировать" : "Создать"}
            cancelText="Отмена"
            open={isProjectModalOpen}
            onCancel={handleCloseProjectModal}
            onOk={onFinish}
        >
            <Form form={form} onValuesChange={() => {}}>
                <Form.Item<FormCreateProject>
                    name="name"
                    rules={[
                        {
                            required: !isEdit,
                            message: "Введите название проекта",
                        },
                    ]}
                >
                    <FloatingLabelInpuBorder
                        maxLen={32}
                        label="Название проекта"
                    />
                </Form.Item>
                <Form.Item<FormCreateProject> name="description">
                    <FloatingLabelInpuBorder label="Описание проекта" />
                </Form.Item>
                <CustomUpload
                    isEdit={isEdit}
                    initialImageUrl={initialImageUrl}
                    setFile={setFile}
                />
            </Form>
        </Modal>
    );
};

export default ProjectModal;
