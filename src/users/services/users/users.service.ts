import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserParams, UpdateUserParams} from "../../../utils/types";
import {createHash} from 'node:crypto'
import {Hash} from "../../../utils/Hash";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    findUsers() {
        return this.userRepository.find();
    }

    createUser(user: CreateUserParams) {
        user.password = Hash.make(user.password)
        const data = this.userRepository.create(user);
        return this.userRepository.save(data);
    }

    async updateUser(id: number, updateUserDetails: UpdateUserParams) {
        if (updateUserDetails.password)
            updateUserDetails.password = Hash.make(updateUserDetails.password);
        await this.userRepository.update(id, updateUserDetails);
        return this.userRepository.findBy({id})
    }

    deleteUser(id: number) {
        return this.userRepository.delete({id});
    }
}
