import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserParams, UpdateUserParams} from "../../../utils/types";
import {Hash} from "../../../utils/Hash";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    findUsers() {
        return this.userRepository.find();
    }

    async findOne(params): Promise<any> {
        return await this.userRepository.findOne({where: params});
    }

    async createUser(user: CreateUserParams) {
        // TODO:: Create app exception handler and throw exceptions to make only one error structured message
        const oldRegistered =  await this.userRepository.find({where:{email: user.email}});
        if(oldRegistered.length)
            return {error: true, message: 'User with the same email exists'};
        user.password = Hash.make(user.password)
        const data = this.userRepository.create(user);
        const {password, ...userData } = await this.userRepository.save(data);
        return userData
    }

    async updateUser(id: number, updateUserDetails: UpdateUserParams) {
        if (updateUserDetails.password)
            updateUserDetails.password = Hash.make(updateUserDetails.password);
        if (updateUserDetails.email) {
            const oldRegistered = await this.userRepository.find({where: {email: updateUserDetails.email}});
            if (oldRegistered.length)
                return {error: true, message: 'User with the same email exists'};
        }

        await this.userRepository.update(id, updateUserDetails);
        return this.userRepository.findBy({id})
    }

    deleteUser(id: number) {
        return this.userRepository.delete({id});
    }

}
