import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Container from './components/common/container'
import NavBar from './components/ui/NavBar'
import routes from './routes'
import { ToastContainer } from 'react-toastify' // Отображение ошибок с помощью toastify
import 'react-toastify/dist/ReactToastify.css' // Отображение ошибок с помощью toastify

const getRoutes = (routes) => {
    return routes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />
    })
}

function App() {
    return (
        <div className="App">
            <NavBar routes={routes} />
            <Container>
                <Switch>
                    {getRoutes(routes)}
                    <Redirect to="/" />
                </Switch>
            </Container>
            <ToastContainer
            // Отображение ошибок с помощью toastify
            />
        </div>
    )
}

export default App
