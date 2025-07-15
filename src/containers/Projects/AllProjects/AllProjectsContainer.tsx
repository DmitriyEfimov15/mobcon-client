import AllProjects from "@/components/Projects/AllProjects/AllProjects"
import { FC } from "react"
import { useGetAllProjectsQuery } from "./allProjects.api"

const AllProjectsContainer: FC = () => {
    const {data: allProjects} = useGetAllProjectsQuery()

    return (
        <AllProjects
            allProjects={allProjects ?? []}
        />
    )
}

export default AllProjectsContainer