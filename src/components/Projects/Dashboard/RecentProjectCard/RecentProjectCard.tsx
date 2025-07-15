import { FC, useEffect, useRef, useState } from "react";
import * as classes from "./index.module.scss";
import { MenuOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import noIcon from "@/assets/no-icon.jpg";
import { Popover } from "antd";
import RecentMenu from "../../../../UI/RecentMenu/RecentMenu";
import ProjectModal from "../../../../UI/ProjectModal/ProjectModal";
import { FormInstance, useForm } from "antd/es/form/Form";
import { FormCreateProject } from "@/components/Projects/Dashboard/types";
import { RcFile } from "antd/es/upload";
import {
    useDeleteProjectMutation,
    useLazyGetRecentProjectsQuery,
    useUpdateProjectMutation,
} from "@/containers/Projects/Dashboard/dasboard.api";
import { UpdateProjectPayload } from "@/containers/Projects/Dashboard/dasboard.types";
import ConfirmModal from "../../../../UI/ConfirmModal/ConfirmModal";

interface RecentProjectCardProps {
    form: FormInstance<FormCreateProject>
    name: string;
    iconUrl?: string;
    popoverRef: React.RefObject<HTMLDivElement | null>;
    popupContentRef: React.RefObject<HTMLDivElement | null>;
    isMenuOpen: boolean;
    dateLabel: string;
    displayDate: Dayjs;
    isEditModalOpen: boolean
    isDeleteConfirmOpen: boolean
    handleOpenDelete: () => void;
    handleOpenEditModal: () => void;
    handleOpenMenu: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    handleCloseEditModal: () => void;
    onFinishEdit: () => void;
    setFile: React.Dispatch<React.SetStateAction<RcFile | null>>
    handleCloseDelete: () => void,
    handleDeleteProject: () => void,
}

const RecentProjectCard: FC<RecentProjectCardProps> = ({
    form,
    name,
    iconUrl,
    popoverRef,
    isMenuOpen,
    popupContentRef,
    dateLabel,
    displayDate,
    isEditModalOpen,
    isDeleteConfirmOpen,
    handleOpenDelete,
    handleOpenEditModal,
    handleOpenMenu,
    handleCloseEditModal,
    onFinishEdit,
    setFile,
    handleCloseDelete,
    handleDeleteProject,
}) => {
    return (
        <div className={classes.card}>
            <div className={classes.header}>
                <div className={classes.icon__container}>
                    <img
                        src={
                            iconUrl
                                ? `${process.env.API_URL}/${iconUrl}`
                                : noIcon
                        }
                        alt="icon"
                    />
                </div>
                <div ref={popoverRef}>
                    <Popover
                        open={isMenuOpen}
                        placement="topRight"
                        content={
                            <div ref={popupContentRef}>
                                <RecentMenu
                                    deleteFun={handleOpenDelete}
                                    editFun={handleOpenEditModal}
                                />
                            </div>
                        }
                    >
                        <MenuOutlined
                            onClick={(e) => handleOpenMenu(e)}
                            style={{ fontSize: "18px" }}
                        />
                    </Popover>
                </div>
            </div>

            <div className={classes.info}>
                <p className={classes.name}>{name}</p>
                <p className={classes.time}>
                    {dateLabel}: {displayDate.format("DD.MM.YYYY")}
                </p>
            </div>
            <div onClick={(e) => e.preventDefault()}>
                <ProjectModal
                    isEdit={true}
                    handleCloseProjectModal={handleCloseEditModal}
                    onFinish={onFinishEdit}
                    isProjectModalOpen={isEditModalOpen}
                    form={form}
                    setFile={setFile}
                    initialImageUrl={iconUrl}
                />
            </div>

            <ConfirmModal
                title="Удаление"
                message={`Вы уверены, что хотите удалить проект "${name}" ?`}
                isOpen={isDeleteConfirmOpen}
                handleClose={handleCloseDelete}
                confirm={handleDeleteProject}
            />
        </div>
    );
};

export default RecentProjectCard;
