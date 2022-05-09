import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(validationPayload: {
        email: string;
        sub: number;
        type: string;
    }): Promise<import("../../trainers/entities/trainer.entity").Trainer | import("../../users/entities/user.entity").User>;
}
export {};
