import { ApiException } from './exceptions/api.exception';
import { HttpException } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

export const HttpExceptionHandler = (err) => {
  if (err instanceof ApiException)
    throw new HttpException(err.message, err.status);
  throw err;
};

export const WsExceptionHandler = (err) => {
  if (err instanceof ApiException) throw new WsException(err.message);
  throw err;
};
