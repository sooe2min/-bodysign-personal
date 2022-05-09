import { Request, Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getProfile(req: any): any;
    oauthGoogle(req: any): void;
    oauthGoogleRedirect(req: any, res: any): Promise<any>;
    renewToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    localLoginRedirect(req: any, res: any): Promise<any>;
}
