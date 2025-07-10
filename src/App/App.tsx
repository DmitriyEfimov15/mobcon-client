import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import '@/styles/global.styles.css'

const App: FC = () => {
    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default App;