export class ApiException extends BaseException {
    constructor(
        public message: string,
        public status: number = 500
    ) {
        super();
    }
}