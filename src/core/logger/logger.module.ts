import { Module } from '@nestjs/common';
import { HelpCenterLogger } from './logger.service';

@Module({
  providers: [HelpCenterLogger],
  exports: [HelpCenterLogger],
})
export class LoggerModule {}
