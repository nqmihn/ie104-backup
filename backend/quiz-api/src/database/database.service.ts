import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
    private readonly logger = new Logger(DatabaseService.name);
    constructor(@InjectRepository(User)
    private usersRepository: Repository<User>, private userService: UsersService) { }
    async onModuleInit() {
        const countUser = await this.usersRepository.count()
        if (countUser === 0) {
            const newAdmin = this.usersRepository.create({
                email: "admin@gmail.com",
                password: this.userService.getHashPassword("123456"),
                username: "Admin",
                role: "ADMIN",
                image: "users/sample-admin.jpg"
            })
            await this.usersRepository.save(newAdmin)
            const newUser = this.usersRepository.create({
                email: "user@gmail.com",
                password: this.userService.getHashPassword("123456"),
                username: "User",
                role: "USER",
                image: "users/sample-user.jpg"
            })
            await this.usersRepository.save(newUser)
            const testUser = this.usersRepository.create({
                email: "test@gmail.com",
                password: this.userService.getHashPassword("123456"),
                username: "User",
                role: "USER",
                image: null
            })
            await this.usersRepository.save(testUser)

        } else {
            this.logger.log("ALREADY INIT SAMPLE DATABASE!!! ")
        }
    }
}
