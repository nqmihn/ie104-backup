import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetPassword } from './entities/reset-password.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule,TypeOrmModule.forFeature([ResetPassword])],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
  exports: [ResetPasswordService]
})
export class ResetPasswordModule { }
