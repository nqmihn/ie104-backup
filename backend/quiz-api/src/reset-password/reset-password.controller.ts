import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { UpdateResetPasswordDto } from './dto/update-reset-password.dto';
import { Public, ResponseMessage } from 'src/decorator/customize';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) { }



  @Get()
  findAll() {
    return this.resetPasswordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resetPasswordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResetPasswordDto: UpdateResetPasswordDto) {
    return this.resetPasswordService.update(+id, updateResetPasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resetPasswordService.remove(+id);
  }

  @Post()
  @Public()
  resetPassword(@Body('verificationCode') verificationCode: string, @Body('userId') userId: number, @Body('password') password: string) {
    return this.resetPasswordService.resetPassword(verificationCode, userId, password)
  }
}
