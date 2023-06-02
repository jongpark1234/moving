import ReactDom from 'react-dom'

const Portal = ({ children }) => {
    const container = document.getElementById('skillContainer')
    return ReactDom.createPortal(children, container as Element)
}

export default Portal