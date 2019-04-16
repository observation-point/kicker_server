import { Request, Response, NextFunction } from 'express';
import { Middleware, HttpError, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import {
    HttpError as CoreHttpError,
    NotFoundError,
    InternalServerError,
    BadRequestError,
    ErrorCode
} from '../http-error';
const LAST_PRIORITY = 0;

@Middleware({ type: 'after', priority: LAST_PRIORITY })
export class ErrorHandlingMiddleware implements ExpressErrorMiddlewareInterface {
    public error(originError: Error, request: Request, response: Response, next: NextFunction) {
        let error: Error = originError;
        let status: number;

        if (originError instanceof CoreHttpError) {
            status = originError.code;
        } else if (originError instanceof HttpError) {
            status = originError.httpCode;
            error = this.createCoreError(status, originError);
        }else {
            status = ErrorCode.InternalServerError;
            error = this.createCoreError(status, error);
        }

        this.logError(error);
        const data = (<CoreHttpError>error).data || error.message;
        response.status(status).json({ data });
        next();
    }

    protected logError(error: Error): void {
    
        console.error(error);
        console.info(error.message);
    }

    protected createCoreError(status: number, error: Error): CoreHttpError {
        const message = error.message;
        let result: CoreHttpError = <CoreHttpError>error;
        switch (status) {
            case ErrorCode.BadRequest:
                result = new BadRequestError(message);
                break;
            case ErrorCode.NotFound:
                result = new NotFoundError(message);
                break;
            case ErrorCode.InternalServerError:
                result = new InternalServerError(message);
                result.stack = error.stack;
                break;
        }
        return result;
    }
}