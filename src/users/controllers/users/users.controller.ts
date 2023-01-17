import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put} from '@nestjs/common';
import {CreateUserDto} from "../../dtos/CreateUser.dto";
import {UsersService} from "../../services/users/users.service";
import {UpdateUserDto} from "../../dtos/UpdateUser.dto";

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @Get()
    getUsers(){
        return this.userService.findUsers();
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto){
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete()
    deleteUser(@Body() id: number){
        return this.userService.deleteUser(id);
    }
}
