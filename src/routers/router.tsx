import { Route, Routes } from 'react-router-dom'
import routes from './routes'

const Router = () => {
    return (
        <Routes>
            { routes.map(route => {
                return <Route path={route.path} element={route.component} key={route.path} />
            }) }
        </Routes>
    )
}

export default Router