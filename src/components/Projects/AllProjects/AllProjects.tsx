import { FC } from "react";
import { IProject } from "@/containers/Projects/AllProjects/allProjects.types";
import { List } from "antd";
import ProjectItemContainer from "@/containers/Projects/AllProjects/ProjectItem/ProjectItemContainer";

interface AllProjectsProps {
    allProjects: IProject[];
}

const AllProjects: FC<AllProjectsProps> = ({ allProjects }) => {
    return (
        <div>
            <h1>Все проекты</h1>
            <List
                dataSource={allProjects}
                pagination={{ pageSize: 5, align: "center" }}
                renderItem={(item) => (
                    <ProjectItemContainer
                        name={item.name}
                        description={item.description}
                        icon_url={item.icon_url}
                        projectId={item.id}
                    />
                )}
            />
        </div>
    );
};

export default AllProjects;
