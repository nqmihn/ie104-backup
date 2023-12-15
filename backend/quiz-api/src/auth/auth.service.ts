import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/user.interface';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { Response } from 'express';
import { verify } from 'crypto';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private configService: ConfigService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(username);
        if (user) {
            const isValid = this.usersService.isValidPassword(pass, user.password)
            if (isValid) {
                return user;
            }
        }

        return null;
    }
    async login(user: IUser, response: Response) {
        const { id, email, username, role, image } = user
        const payload = {
            sub: "token login",
            iss: "from server",
            id,
            email,
            username,
            role,
            image
        }
        const refresh_token = this.createRefreshToken(payload)
        await this.usersService.setRefreshToken(id, refresh_token);

        // set cookies
        response.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: ms(this.configService.get<string>("JWT_REFRESH_EXPIRE"))
        })
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token,
            id,
            email,
            username,
            role,
            image
        };
    }
    createRefreshToken = (payload) => {
        const refresh_token = this.jwtService.sign(payload, {
            secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
            expiresIn: ms(this.configService.get<string>("JWT_REFRESH_EXPIRE")) / 1000
        });
        return refresh_token;
    }
    processNewToken = async (refreshToken: string, response: Response) => {
        try {
            let isRefreshToken = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>("JWT_REFRESH_SECRET")
            })

            let user = await this.usersService.findByToken(refreshToken)
            if (user) {

                const { id, email, username, role, image } = user
                const payload = {
                    sub: "token login",
                    iss: "from server",
                    id,
                    email,
                    username,
                    role,
                    image
                }
                const refresh_token = this.createRefreshToken(payload)
                await this.usersService.setRefreshToken(id, refresh_token)
                response.clearCookie("refresh_token");
                response.cookie('refresh_token', refresh_token, {
                    httpOnly: true,
                    maxAge: ms(this.configService.get<string>("JWT_REFRESH_EXPIRE"))
                })
                return {
                    access_token: this.jwtService.sign(payload),
                    refresh_token,
                    id,
                    email,
                    username,
                    role,
                    image
                };
            } else {
                throw new BadRequestException("Invalid Refresh Token. Please Login !")
            }
        } catch (error) {
            throw new BadRequestException("Invalid Refresh Token. Please Login !")
        }
    }
    logout = async (response: Response, user: IUser) => {
        await this.usersService.setRefreshToken(user.id, null)
        response.clearCookie("refresh_token");
        return "logout successsssss"
    }

}
