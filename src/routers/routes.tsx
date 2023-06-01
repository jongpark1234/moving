import Main from '../components/main/index'

const routes = [
    { path: '*', component: <Main />},
    { path: '', component: <Main />},
]

export default routes