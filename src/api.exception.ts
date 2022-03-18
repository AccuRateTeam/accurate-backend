class BaseError {
    constructor() {
        Error.apply(this, arguments);
    }
}

export class ApiException extends BaseError {
    constructor(
        public message: string,
        public status: number = 500
    ) {
        super();
    }
}