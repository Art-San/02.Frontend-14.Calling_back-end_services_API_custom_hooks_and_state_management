import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://02ba5f4e8c0842a48e8cf81f8010e5d5@o4504388341989376.ingest.sentry.io/4504389412454400",
        integrations: [new BrowserTracing()],
      
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
      });
}
function log(error) {
    Sentry.captureException(error)
}

const logger = {
    init,
    log
}

export default logger
