import {
  ExecutionContext,
  NestInterceptor,
  Injectable,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { performance } from 'perf_hooks';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = performance.now();
    const { req } = context.switchToHttp().getRequest();
    const { method, url: path } = req;

    return next.handle().pipe(
      tap(() =>
        req.log.info({
          controller: context.getClass().name,
          method,
          path,
          duration: `${performance.now() - now}`
        })
      )
    );
  }
}
