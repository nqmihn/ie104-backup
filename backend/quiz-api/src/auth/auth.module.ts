import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './local/jwt.strategy';
import ms from 'ms';
import { AuthController } from './auth.controller';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { QuizQuestionModule } from 'src/quiz-question/quiz-question.module';
import { QuizAnswerModule } from 'src/quiz-answer/quiz-answer.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/files/multer.config';

@Module({
  imports: [UsersModule, QuizzesModule, QuizQuestionModule, QuizAnswerModule, PassportModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_ACCESS_SECRET'),
      signOptions: {
        expiresIn: ms(configService.get<string>('JWT_ACCESS_EXPIRE')) / 1000,
      },
    }),
    inject: [ConfigService],
  }), MulterModule.registerAsync({
    useClass: MulterConfigService,
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
