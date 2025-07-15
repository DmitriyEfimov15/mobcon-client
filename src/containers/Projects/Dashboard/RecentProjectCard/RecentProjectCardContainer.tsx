import { FC, useEffect, useRef, useState } from "react";
import { RcFile } from "antd/es/upload";
import RecentProjectCard from "@/components/Projects/Dashboard/RecentProjectCard/RecentProjectCard";
import { UpdateProjectPayload } from "../dasboard.types";
import dayjs from "dayjs";
import {
    useDeleteProjectMutation,
    useLazyGetRecentProjectsQuery,
    useUpdateProjectMutation,
} from "../dasboard.api";
import { useForm } from "antd/es/form/Form";
import { FormCreateProject } from "@/components/Projects/Dashboard/types";
import { useLazyGetAllProjectsQuery } from "../../AllProjects/allProjects.api";

interface RecentProjectCardContainerProps {
    name: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    iconUrl?: string;
    projectId: string;
    description?: string;
    initialFile?: RcFile | null;
}
const RecentProjectCardContainer: FC<RecentProjectCardContainerProps> = ({
    name,
    createdAt,
    updatedAt,
    iconUrl,
    projectId,
    description,
    initialFile,
}) => {
    const [form] = useForm<FormCreateProject>();
    const [file, setFile] = useState<RcFile | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] =
        useState<boolean>(false);
    const handleOpenEditModal = () => {
        setIsMenuOpen(false);
        setIsEditModalOpen(true);
    };

    const [updateProject] = useUpdateProjectMutation();
    const [getResentProjects] = useLazyGetRecentProjectsQuery();
    const [deleteProject] = useDeleteProjectMutation();
    const [getAllProjects] = useLazyGetAllProjectsQuery()

    const popoverRef = useRef<HTMLDivElement>(null);
    const popupContentRef = useRef<HTMLDivElement>(null);

    const handleCloseEditModal = () => setIsEditModalOpen(false);

    const handleOpenMenu = (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>
    ) => {
        e.preventDefault();
        setIsMenuOpen(true);
    };

    const handleOpenDelete = () => {
        setIsMenuOpen(false);
        setIsDeleteConfirmOpen(true);
    };
    const handleCloseDelete = () => setIsDeleteConfirmOpen(false);

    const created = dayjs(createdAt);
    const updated = dayjs(updatedAt);

    const isUpdatedLater = updated.isAfter(created);
    const dateLabel = isUpdatedLater ? "Изменен" : "Создан";
    const displayDate = isUpdatedLater ? updated : created;

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
        await getAllProjects()

        setFile(null);
        handleCloseEditModal();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                popoverRef.current &&
                !popoverRef.current.contains(target) &&
                popupContentRef.current &&
                !popupContentRef.current.contains(target)
            ) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        form.setFieldsValue({ name, description });
        if (initialFile) {
            setFile(initialFile);
        }
    }, [name, iconUrl, description]);

    const handleDeleteProject = async () => {
        await deleteProject({ projectId });
        await getResentProjects();
        await getAllProjects();
        handleCloseDelete();
    };

    return (
        <RecentProjectCard
            iconUrl={iconUrl}
            name={name}
            isEditModalOpen={isEditModalOpen}
            form={form}
            isMenuOpen={isMenuOpen}
            popoverRef={popoverRef}
            popupContentRef={popupContentRef}
            dateLabel={dateLabel}
            displayDate={displayDate}
            isDeleteConfirmOpen={isDeleteConfirmOpen}
            handleOpenDelete={handleOpenDelete}
            handleOpenEditModal={handleOpenEditModal}
            handleCloseEditModal={handleCloseEditModal}
            onFinishEdit={onFinishEdit}
            setFile={setFile}
            handleCloseDelete={handleCloseDelete}
            handleDeleteProject={handleDeleteProject}
            handleOpenMenu={handleOpenMenu}
        />
    );
};

export default RecentProjectCardContainer;
