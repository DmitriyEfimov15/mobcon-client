import { FC } from 'react'
import * as classes from './index.module.scss'

interface ProjectProps {

}

const Project: FC<ProjectProps> = ({

}) => {
    return (
        <div className={classes.container}>
            <div className={classes.dragNDrop}>
                
            </div>
            <div className={classes.workspace}></div>
            <div></div>
        </div>
    )
}

export default Project;