import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResetPasswordDto } from './dto/create-reset-password.dto';
import { UpdateResetPasswordDto } from './dto/update-reset-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetPassword } from './entities/reset-password.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ResetPasswordService {
  constructor(@InjectRepository(ResetPassword)
  private resetPasswordRepository: Repository<ResetPassword>, private userService: UsersService) { }
  create(createResetPasswordDto: CreateResetPasswordDto) {
    return 'This action adds a new resetPassword';
  }

  findAll() {
    return `This action returns all resetPassword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resetPassword`;
  }

  update(id: number, updateResetPasswordDto: UpdateResetPasswordDto) {
    return `This action updates a #${id} resetPassword`;
  }

  remove(id: number) {
    return `This action removes a #${id} resetPassword`;
  }
  async upsert(userId: number, verificationCode: string) {
    const user = await this.resetPasswordRepository.findOneBy({ userId })
    if (user) {
      return await this.resetPasswordRepository.update({ userId }, { verificationCode })
    } else {
      const newUser = this.resetPasswordRepository.create({ userId, verificationCode });
      return await this.resetPasswordRepository.save(newUser)

    }
  }
  async resetPassword(verificationCode: string, userId: number, password: string) {
    const user = await this.resetPasswordRepository.findOneBy({ userId })
    if (user) {
      if (verificationCode !== user.verificationCode) {
        throw new BadRequestException("Invalid Verification Code")
      }
      const now = new Date().getTime()
      // const createdTime = user.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
      const createdTime = user.updatedAt.getTime()

      const isExpire = (Math.floor((now - createdTime) / (60 * 1000) - 7 * 60))
      
      if (isExpire > 5) {
        throw new BadRequestException("Code is expire. Please resend !")
      }
      return await this.userService.updatePassword(userId, password)

    }

  }
}
