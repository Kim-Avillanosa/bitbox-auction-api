import { JwtService } from '@nestjs/jwt';
interface JwtResponse {
    sub: number;
    username: string;
    iat: number;
    exp: number;
}
export declare class JWTUtil {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    decode(auth: string): JwtResponse;
}
export {};
