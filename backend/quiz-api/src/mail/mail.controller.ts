import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Public, User } from 'src/decorator/customize';
import { UsersService } from 'src/users/users.service';
import { ResetPasswordService } from 'src/reset-password/reset-password.service';
import { uid } from 'uid'
import { ApiTags } from '@nestjs/swagger';

@ApiTags("mail")
@Controller('mail')
export class MailController {
  constructor(private readonly mailerService: MailerService, private userService: UsersService, private resetPasswordService: ResetPasswordService) { }



  @Post('forgot')
  @Public()
  async forgotPassword(@Body("email") email: string) {
    const user = await this.userService.findByEmail(email)

    if (!user) {
      throw new BadRequestException("Email is not exist")
    } else {
      const randomCode = uid(8)
      await this.resetPasswordService.upsert(user?.id, randomCode)

      this.mailerService
        .sendMail({
          to: user.email, // list of receivers
          from: '"Doing Quiz Support Team" <support@example.com>', // sender address
          subject: 'Forgot Password Support', // Subject line
          text: `Your verification is ${randomCode}. It will expire after 5 minutes`, // plaintext body
          html: `<b>Your verification is ${randomCode}. It will expire after 5 minutes</b>`, // HTML body content
        })
        .then(() => { console.log(1) })
        .catch(() => { console.log(2) });
      return { userId: user.id }
    }

  }
}
