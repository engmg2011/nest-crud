import { Injectable } from '@nestjs/common';
import {LoginDataParams} from "../../../utils/types";
import {UsersService} from "../users/users.service";
import {Hash} from "../../../utils/Hash";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {
    }

    async login(data: LoginDataParams){
        const user = await this.userService.findOne({email: data.email});
        console.log("user", user);
        if(Hash.make(data.password) === user.password){
            return user
        }
        else {
            return {
                'message': 'Invalid login'
            }
        }
    }
}
