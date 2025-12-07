import { ErrorRequestHandler } from 'express';
import envConfig from '../configs/env.config';
import ApplicationException from '../exceptions/application.exception';
import { ZodError } from 'zod';

type TGlobalError = Error | ApplicationException | ZodError;

const globalErrorMiddleware: ErrorRequestHandler = (
  err: TGlobalError,
  _req,
  res,
  _next
) => {
  let statusCode = 500;
  let errorMessage = err.message || 'Oops! Something went wrong';

  // If the error is a custom application exception
  if (err instanceof ApplicationException) {
    statusCode = err.statusCode;
  }

  // If the error is a Zod validation failure
  else if (err instanceof ZodError) {
    statusCode = 422;

    if (err.issues.length > 0) {
      const { path, message } = err.issues[0];

      const formattedPath =
        path && path.length > 0 ? `${path.join('.')} -> ` : '';

      errorMessage = `${formattedPath}${message}`;
    }
  }

  // Build safe JSON response
  const response = {
    success: false,
    message: errorMessage,
  };

  // Log contextual metadata for debugging
  console.dir(
    {
      ...response,
      stack: err.stack,
      environment: envConfig.NODE_ENV,
    },
    { depth: null, colors: true }
  );

  return res.status(statusCode).json(response);
};

export default globalErrorMiddleware;
