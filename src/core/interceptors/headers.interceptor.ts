import { getFlag } from '@cencosud-ds/cda-flags';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import type { HelpCenterHeaders } from 'common/types/hc-header.type';
import type { Request } from 'express';
import type { Observable } from 'rxjs';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class HeadersInterceptor implements NestInterceptor {
  private readonly logger = new Logger(HeadersInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request: Request = context.switchToHttp().getRequest();

    const headers = request.headers as unknown as HelpCenterHeaders;
    let traceId = headers['trace-id'];
    const flagName = headers['flag-name'];
    const flagCountry = headers['flag-country'];

    traceId = this.checkTraceId(traceId, request);
    request.headers['trace-id'] = traceId;

    const flag = this.checkFlagData(flagName, flagCountry);
    request.headers['flag-country'] = flag.country_id;

    return next.handle();
  }

  private checkTraceId(requestTraceId: string | undefined, request: Request): string {
    if (!requestTraceId) {
      const traceId = uuidv4();
      this.logger.warn(` No trace-id for request ${request.url} assigned trace-id: ${traceId}`);
      return traceId;
    } else if (requestTraceId && !validate(requestTraceId)) throw new BadRequestException('Bad trace-id header');
    else return requestTraceId;
  }

  private checkFlagData(requestFlagName: string | undefined, requestFlagCountry: string | undefined) {
    if (requestFlagName) {
      const flagResult = getFlag(requestFlagName, requestFlagCountry);
      if (flagResult instanceof Error) {
        throw new BadRequestException('Requested flag not found');
      } else return flagResult;
    } else throw new BadRequestException('Missing flag header');
  }
}
