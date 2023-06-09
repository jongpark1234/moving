import ReactDOM from 'react-dom/client'
import App from './app'
import GlobalFonts from './styles/fonts/pretendard'
import GlobalStyles from './styles/globalStyle'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
        <GlobalFonts />
        <GlobalStyles />
        <App />
    </>
)