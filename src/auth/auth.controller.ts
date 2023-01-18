import {Controller, Post, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    // TODO:: Return refresh token using refreshToken.strategy to be used after access_token expired
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.body);
    }
}
