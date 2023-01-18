import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/services/users/users.service";
import { JwtService } from '@nestjs/jwt';
import {Hash} from "../utils/Hash";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}


    async validateUser(params): Promise<any> {
        return await this.usersService.findOne({email: params.email, password: Hash.make(params.password)});
    }

    async login(user: any) {
        const userData = await this.validateUser(user);
        if(userData) {
            const payload = {email: userData.email, sub: userData.userId};
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        return {error: true, message: 'Wrong credentials'}
    }
}