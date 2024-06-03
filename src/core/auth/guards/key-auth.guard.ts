import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { BadRequestError } from 'passport-headerapikey';

@Injectable()
export class ApiKeyAuthGuard extends AuthGuard('api-key') {
  private readonly logger = new Logger(ApiKeyAuthGuard.name);

  override handleRequest<TUser = unknown>(
    err: Error | false,
    user: TUser | false,
    info: object | null,
    context: ExecutionContext,
  ): TUser {
    if (err || !user) {
      const request: Request = context.switchToHttp().getRequest();
      const message = 'Unauthorized access attempt';
      let params: object = { endpoint: request.url, ip: request.ip };
      if (info && info instanceof BadRequestError) {
        params = { cause: info.message, ...params };
      }

      this.logger.warn(`${message} from ${JSON.stringify(params)}`);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
