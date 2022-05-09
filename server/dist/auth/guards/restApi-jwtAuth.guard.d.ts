import { ExecutionContext } from '@nestjs/common';
declare const RestApiJwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RestApiJwtAuthGuard extends RestApiJwtAuthGuard_base {
    getRequest(context: ExecutionContext): any;
    handleRequest(err: any, user: any, _info: any, _context: any): any;
}
export {};
