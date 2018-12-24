import { ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    const now = Date.now();
    const { req: { method, url } } = context.switchToHttp().getRequest();

    return call$.pipe(
      tap(() => Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name))
    );
  }
}
