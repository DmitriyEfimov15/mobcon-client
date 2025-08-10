import { AppstoreFilled, InboxOutlined } from '@ant-design/icons'
import { ALL_PROJECTS_PAGE, DASHBORD_PAGE } from './routes';
import { Link } from 'react-router-dom';
import { MenuItem } from '@/types/utilsTypes/antdTypes';

export const projectsPageMenuData: MenuItem[] = [
    {
        key: 'dashboard',
        label: <Link to={DASHBORD_PAGE}>Обзор</Link>,
        icon: <AppstoreFilled />
    },
    {
        key: 'all_projects',
        label: <Link to={ALL_PROJECTS_PAGE}>Все проекты</Link>,
        icon: <InboxOutlined />
    }
]