import { Request, Response, NextFunction } from 'express';
import {
   AuthorizeError,
   NotFoundError,
   ValidationError,
} from './errors';
import { logger } from '../logger';

export const HandleErrorWithLogger = (
   error: Error,
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   let reportError = true;
   let status = error["status"] || 500;
   let data = error.message;

   // skip common / known errors
   const handledErrors = [NotFoundError, ValidationError, AuthorizeError];

   if (handledErrors.some(errType => error instanceof errType)) {
      reportError = false;
      status = status;
      data = error.message;
   }

   if (reportError) {
      // error reporting tools implementation eg: Cloudwatch,Sentry etc;
      logger.error(error);
   } else {
      logger.warn(error); // ignore common errors caused by user
   }

   return res.status(status).json({
      message: error.message,
      name: error.name
   });
};

export const HandleUnCaughtException = async (
   error: Error,
) => {
   // error report / monitoring tools
   logger.error(error);
   // recover
   process.exit(1);
};
