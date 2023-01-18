import {IsEmail, IsNotEmpty, MinLength, Validate} from "class-validator";
import {Match} from "../../decorators/match.decorator";

export class CreateUserDto{
    @IsNotEmpty()
    @MinLength(4)
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Match('password')
    confirmPassword: string;
}