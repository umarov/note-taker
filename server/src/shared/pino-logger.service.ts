import { LoggerService, Injectable } from '@nestjs/common';
import * as pino from 'pino';
import { execSync } from 'child_process';

import { isDevelopment } from '../../scripts/env.js';

const logDir = `${process.cwd()}/log`;
const pinoDestination = isDevelopment
  ? 1 // stdout
  : `${logDir}/${process.env.NODE_ENV}.log`;

execSync(`mkdir -p ${logDir}`);

export const logger = pino(
  {
    level: isDevelopment ? 'debug' : 'info',
    prettyPrint: isDevelopment
  },
  pino.destination(pinoDestination)
);

export class PinoLoggerService implements LoggerService {
  public static log(message: string, ...args: any[]) {
    logger.info(message, args);
  }

  public static error(message: string, trace: string, ...args: any[]) {
    logger.error(message, args);
    PinoLoggerService.trace(trace, args);
  }

  public static trace(trace: string, ...args: any[]) {
    logger.trace(trace, args);
  }

  public static warn(message: string, ...args: any[]) {
    logger.warn(message, args);
  }

  public static debug(message: string, ...args: any[]) {
    logger.debug(message, args);
  }

  public static verbose(message: string, ...args: any[]) {
    logger.debug(message, args);
  }
  public log(message: string, ...args: any[]) {
    PinoLoggerService.log(message, args);
  }

  public error(message: string, trace: string, ...args: any[]) {
    PinoLoggerService.error(message, trace, args);
    PinoLoggerService.trace(trace, args);
  }

  public warn(message: string, ...args: any[]) {
    PinoLoggerService.warn(message, args);
  }

  public debug(message: string, ...args: any[]) {
    PinoLoggerService.debug(message, args);
  }

  public verbose(message: string, ...args: any[]) {
    PinoLoggerService.debug(message, args);
  }
}
