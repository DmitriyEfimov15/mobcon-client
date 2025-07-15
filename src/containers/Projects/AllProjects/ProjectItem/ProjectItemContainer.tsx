import { FormCreateProject } from "@/components/Projects/Dashboard/types";
import { RcFile } from "antd/es/upload";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteProjectMutation, useLazyGetRecentProjectsQuery, useUpdateProjectMutation } from "../../Dashboard/dasboard.api";
import { useLazyGetAllProjectsQuery } from "../allProjects.api";
import { useForm } from "antd/es/form/Form";
import { UpdateProjectPayload } from "../../Dashboard/dasboard.types";
import ProjectItem from "@/components/Projects/AllProjects/ProjectItem/ProjectItem";

interface ProjectItemContainerProps {
    name: string;
    description?: string;
    icon_url?: string;
    projectId: string;
}

const ProjectItemContainer: FC<ProjectItemContainerProps> = ({
    name, 
    description,
    icon_url,
    projectId
}) => {
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [file, setFile] = useState<RcFile | null>(null);
    const [form] = useForm<FormCreateProject>();
    const navigate = useNavigate();

    const [updateProject] = useUpdateProjectMutation();
    const [getResentProjects] = useLazyGetRecentProjectsQuery();
    const [deleteProject] = useDeleteProjectMutation();
    const [getAllProjects] = useLazyGetAllProjectsQuery();

    const handleCloseEditProjectModal = () => {
        setIsProjectModalOpen(false);
    };

    const handleCloseDelete = () => {
        setIsDeleteConfirmOpen(false);
    };

    const startFun = () => {
        navigate(`/project/${projectId}`);
    };

    const editFun = () => {
        setIsProjectModalOpen(true);
    };

    const deleteFun = () => {
        setIsDeleteConfirmOpen(true);
    };

    const onFinishEdit = async () => {
        await form.validateFields();
        const values = form.getFieldsValue();

        const formData = new FormData();
        if (name !== values.name) formData.append("name", values.name);
        if (description !== values.description)
            formData.append("description", values.description || "");
        if (file) {
            formData.append("file", file);
        }

        const payload: UpdateProjectPayload = {
            data: formData,
            projectId,
        };

        await updateProject(payload);

        await getResentProjects();
        await getAllProjects();

        setFile(null);
        handleCloseEditProjectModal();
    };

    const handleDeleteProject = async () => {
        await deleteProject({ projectId });
        await getResentProjects();
        await getAllProjects()
        handleCloseDelete();
    };

    useEffect(() => {
        form.setFieldsValue({
            name,
            description,
        });
    }, [name, description]);
    return (
        <ProjectItem
            name={name}
            description={description}
            icon_url={icon_url}
            deleteFun={deleteFun}
            isDeleteConfirmOpen={isDeleteConfirmOpen}
            isProjectModalOpen={isProjectModalOpen}
            editFun={editFun}
            startFun={startFun}
            setFile={setFile}
            form={form}
            handleCloseDelete={handleCloseDelete}
            handleCloseEditProjectModal={handleCloseEditProjectModal}
            handleDeleteProject={handleDeleteProject}
            onFinishEdit={onFinishEdit}
        />
    )
}

export default ProjectItemContainer;