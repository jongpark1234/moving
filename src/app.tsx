import Router from './routers/router'
import { BrowserRouter } from 'react-router-dom'
import { InputController } from './components/inputController'

const App = () => {
    return (
        <BrowserRouter>
            <InputController />
            <Router />
        </BrowserRouter>
    )
}

export default App