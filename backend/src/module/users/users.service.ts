import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) { }
    async createUser(createUserDto: any): Promise<User> {
        const createdUser = new this.userModel({
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            passwordHash: await bcrypt.hash(createUserDto.password, 10),
            designation: createUserDto.designation,
            department: createUserDto.department,
            avatar: createUserDto.avatar,
        });

        return createdUser.save();
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async updateUser(id: string, updateUserDto: any): Promise<User> {
        const updateUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
        if (!updateUser) {
            throw new Error("User not found");
        }
        return updateUser;
    }

    async deleteUser(id: string) {
        const deleteUser = await this.userModel.findByIdAndDelete(id);
        if (!deleteUser) {
            return {
                status: false,
                message: "User not found"
            };
        }
        else {
            return {
                status: true,
                message: "User deleted successfully"
            };
        }
    }

}
