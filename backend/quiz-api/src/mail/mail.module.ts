import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UsersModule } from 'src/users/users.module';
import { ResetPasswordModule } from 'src/reset-password/reset-password.module';

@Module({
  imports: [ResetPasswordModule,UsersModule, MailerModule.forRootAsync({
    useFactory: async (configService: ConfigService) => ({
      transport: {
        host: configService.get<string>('EMAIL_HOST'),
        secure: false,
        auth: {
          user: configService.get<string>('SENDER_EMAIL'),
          pass: configService.get<string>('PASSWORD_EMAIL'),
        },
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      preview: configService.get<string>("EMAIL_PREVIEW") === 'true' ? true : false,
    }),
    inject: [ConfigService],
  }),],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule { }
