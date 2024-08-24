import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import {Response, Request} from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
catch(exception: HttpException, host: ArgumentsHost){
    const ctx = host.switchToHttp();
    console.log(ctx);
    const response = ctx.getResponse<Response>();
    console.log(response);
    const request = ctx.getRequest<Request>();
    console.log(request);
    const status: number = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log(status);
    //const error = typeof response === 'string' ? { message: exceptionResponse } : (exceptionResponse as object);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
}
}