import {
    IsEmail,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstName!: string;

    @IsString()
    lastName!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsString()
    designation!: string;

    @IsString()
    department!: string;

    @IsOptional()
    @IsString()
    avatar?: string;
}