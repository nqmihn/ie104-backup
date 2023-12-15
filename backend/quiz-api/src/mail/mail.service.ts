import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MailService {
    constructor(private userService: UsersService){}
    async isValidEmail(email:string){
        const user = await this.userService.findByEmail(email)
        if (!user) {
          throw new BadRequestException("Email is not exist !")
        }
        return user
    }
}
