import { AuthService } from './auth.service';
import { SignInDto } from './signin-dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<any>;
    test(): string;
}
