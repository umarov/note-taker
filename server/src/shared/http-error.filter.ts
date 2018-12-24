import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter<HttpException> {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const { req: { url: path, method } } = context.getRequest();
    const response = context.getResponse();
    const status = exception.getStatus();

    const errorResponse = {
      code: status,
      timestamp: (new Date()).toUTCString(),
      path,
      method,
      message: exception.message.error || exception.message
    };

    Logger.error(`${method} ${path}`, JSON.stringify(errorResponse), 'ExceptionFilter');

    response.status(status).send(errorResponse);
  }
}
