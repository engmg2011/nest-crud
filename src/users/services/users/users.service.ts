import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserParams, UpdateUserParams} from "../../../utils/types";
import {Hash} from "../../../utils/Hash";

@Injectable()
export class UsersService {

    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
        },
    ];

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    findUsers() {
        return this.userRepository.find();
    }

    async findOne(username): Promise<any> {

        return this.users.find(user => user.username === username);
        // return await this.userRepository.findOne({where: params});
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
