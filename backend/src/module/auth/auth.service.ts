import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }
    async login(loginDto: LoginDto) {
        const user = await this.userService.findByEmail(
            loginDto.email
        );
        if (!user) {
            throw new UnauthorizedException(
                'Invalid credentials',
            );
        }
        const isPasswordValid = await bcrypt.compare(
            loginDto.password,
            user.passwordHash,
        );
        if (!isPasswordValid) {
            throw new UnauthorizedException(
                'Invalid credentials'
            );
        }
        const userId = (user as any).id ?? (user as any)._id;
        const token = this.jwtService.sign({
            sub: userId,
            email: user.email,
        });
        const userResponse = {
            id: (user as any)._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            designation: user.designation,
            department: user.department,
            avatar: user.avatar,
            status: user.status
        };
        return {
            access_token: token,
            user: userResponse,
        };
    }
}
