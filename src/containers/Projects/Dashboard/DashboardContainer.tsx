import Dashboard from "@/components/Projects/Dashboard/Dashboard";
import { FormCreateProject } from "@/components/Projects/Dashboard/types";
import { notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { RcFile } from "antd/es/upload";
import { FC, useState } from "react";
import { useCreateProjectMutation, useGetRecentProjectsQuery } from "./dasboard.api";
import { useLazyGetAllProjectsQuery } from "../AllProjects/allProjects.api";

const DashboardContainer: FC = () => {
    const [form] = useForm<FormCreateProject>();
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
        useState<boolean>(false);
    const [file, setFile] = useState<RcFile | null>(null);
    const [api, contextHolder] = notification.useNotification();
    const [createProject] = useCreateProjectMutation();
    const {data: recentProjects, refetch: refreshRecentProjects} = useGetRecentProjectsQuery()
    const [getAllProjects] = useLazyGetAllProjectsQuery()

    const handleOpenCreateProjectModal = () => {
        setIsCreateProjectModalOpen(true);
    };

    const handleCloseCreateProjectModal = () => {
        setIsCreateProjectModalOpen(false);
        form.resetFields();
    };

    const onFinish = async () => {
        try {
            await form.validateFields();
            const values = form.getFieldsValue();

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description || "");
            if (file) {
                formData.append("file", file);
            }

            const response = await createProject(formData)
            getAllProjects()
            refreshRecentProjects()

            if (response.data) {
                handleCloseCreateProjectModal()
            }
        } catch (e) {
            // Временное решение, так как antd v5 не поддерживает react 19 на момент написание кода
            setTimeout(() => {
                api.error({
                    message: "Ошибка",
                    description: "Пожалуйста, заполните все обязательные поля",
                    duration: 2,
                });
            }, 0);
        }
    };

    return (
        <>
            {contextHolder}
            <Dashboard
                isCreateProjectModalOpen={isCreateProjectModalOpen}
                form={form}
                recentProjects={recentProjects ?? []}
                handleOpenCreateProjectModal={handleOpenCreateProjectModal}
                handleCloseCreateProjectModal={handleCloseCreateProjectModal}
                onFinish={onFinish}
                setFile={setFile}
            />
        </>
    );
};

export default DashboardContainer;
