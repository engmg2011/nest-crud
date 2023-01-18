import {Match} from "../../decorators/match.decorator";
import {IsEmail, IsOptional, MinLength} from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    @MinLength(4)
    username?: string;

    @IsOptional()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @Match('password')
    confirmPassword?: string;
}