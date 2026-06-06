import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly UsersService: UsersService,
    ) { }


    @Post()
    async createUser(
        @Body() createUserDto: CreateUserDto,
    ) {
        return this.UsersService.createUser(createUserDto);
    }

    @Get()
    async getAllUsers() {
        return this.UsersService.getAllUsers();
    }

    @Put(':id')
    async updateUser(
        @Body() updateUserDto: UpdateUserDto,
        @Param('id') id: string,
    ) {
        return this.UsersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') id: string,
    ) {
        return this.UsersService.deleteUser(id);
    }


}