export class BaseException {
  constructor({ ...rest } = []) {
    Error.apply(this, rest);
  }
}
