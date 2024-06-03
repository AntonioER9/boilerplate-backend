import { ConsoleLogger, ConsoleLoggerOptions, Inject, Injectable, LogLevel, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import type { HelpCenterHeaders } from 'common/types/hc-header.type';
import type { Request } from 'express';

@Injectable({ scope: Scope.TRANSIENT })
export class HelpCenterLogger extends ConsoleLogger {
  private readonly isDebugEnabled: boolean;
  private readonly standardLogLevels: LogLevel[] = ['log', 'error', 'warn'];
  private readonly debugLogLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  override readonly options: ConsoleLoggerOptions = { logLevels: this.standardLogLevels };

  constructor(private readonly configService: ConfigService, @Inject(REQUEST) private request: Request) {
    super();
    this.isDebugEnabled = this.configService.get<boolean>('debug', false);
    const currentLevels = this.isDebugEnabled ? this.debugLogLevels : this.standardLogLevels;
    super.setLogLevels(currentLevels);
    this.options = { logLevels: currentLevels };
  }

  private getOptions(): ConsoleLoggerOptions {
    return this.options;
  }

  private formatMsg(
    functionName: string,
    message: string,
    extras?: object | undefined,
    printHeaders = false,
    isAlert = false,
  ): string {
    const headers = this.request.headers as unknown as HelpCenterHeaders;
    const { 'trace-id': traceId, 'flag-name': flagName, 'flag-id': flagId, 'flag-country': flagCountry } = headers;

    let finalMessage = '';
    if (isAlert) finalMessage += '[ALERT] ';
    if (traceId) finalMessage += `[${traceId}] `;
    if (functionName) finalMessage += `[${functionName}] `;
    if (message) finalMessage += `${message}`;
    if (printHeaders) finalMessage += ` | hc-headers: ${JSON.stringify({ flagName, flagId, flagCountry })}`;
    if (extras) finalMessage += ` | extras: ${JSON.stringify(extras)}`;

    return finalMessage;
  }

  getLogLevels(): LogLevel[] {
    return this.getOptions().logLevels ?? [];
  }

  hcInfo(functionName: string, message: string, parameters?: object): void {
    super.log(this.formatMsg(functionName, message, parameters));
  }

  hcDebug(functionName: string, message: string, parameters?: object): void {
    super.debug(this.formatMsg(functionName, message, parameters, true));
  }

  hcVerbose(functionName: string, message: string, parameters?: object): void {
    super.verbose(this.formatMsg(functionName, message, parameters));
  }

  hcWarn(functionName: string, message: string, parameters?: object): void {
    super.warn(this.formatMsg(functionName, message, parameters));
  }

  hcError(functionName: string, message: string, parameters?: object): void {
    super.error(this.formatMsg(functionName, message, parameters));
  }

  hcAlert(functionName: string, message: string, parameters?: object): void {
    super.error(this.formatMsg(functionName, message, parameters, true, true));
  }
}
