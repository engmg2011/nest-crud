import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "../../dtos/CreateUser.dto";
import {UsersService} from "../../services/users/users.service";
import {UpdateUserDto} from "../../dtos/UpdateUser.dto";
import {JwtAuthGuard} from "../../../auth/jwt-auth.guard";

// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getUsers(){
        return this.userService.findUsers();
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto){
        return this.userService.updateUser(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id',ParseIntPipe) id: number){
        return this.userService.deleteUser(id);
    }

}
