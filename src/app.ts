import express, { Application } from "express"
import globalErrorMiddleware from "./middlewares/global-error_middleware"
import ApplicationException from "./exceptions/application.exception"

const app: Application = express()

app.use(express.json())

// 404 Handler
app.use((req, res, next) => {
    next(new ApplicationException(404, "Not Found"))
})

// Global Error Middleware
app.use(globalErrorMiddleware)

export default app
