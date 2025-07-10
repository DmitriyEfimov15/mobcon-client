import { FC } from "react";
import CardLayout from "@/UI/CardLayout/CardLayout";
import { projectsPageMenuData } from "@/utils/ProjectsPageMenuData";

interface ProjectsProps {}

const Projects: FC<ProjectsProps> = ({}) => {
    return (
        <CardLayout
            sideBarMenu={projectsPageMenuData}
        />
    );
};

export default Projects;
