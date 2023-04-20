import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react' // Логирование ошибок
// import { integrations } from '@sentry/tracing'
import { BrowserTracing } from '@sentry/tracing'
import './index.css'
import App from './app/App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
// https://sentry.io/
Sentry.init({
    dsn: 'https://02ba5f4e8c0842a48e8cf81f8010e5d5@o4504388341989376.ingest.sentry.io/4504389412454400',
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
