import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { Quiz } from './quizzes/entities/quiz.entity';
import { UserQuizModule } from './user-quiz/user-quiz.module';
import { UserQuiz } from './user-quiz/entities/user-quiz.entity';
import { QuizQuestionModule } from './quiz-question/quiz-question.module';
import { QuizQuestion } from './quiz-question/entities/quiz-question.entity';
import { QuizAnswerModule } from './quiz-answer/quiz-answer.module';
import { QuizAnswer } from './quiz-answer/entities/quiz-answer.entity';
import { QuizUserAnswerModule } from './quiz-user-answer/quiz-user-answer.module';
import { QuizUserAnswer } from './quiz-user-answer/entities/quiz-user-answer.entity';
import { HistoryModule } from './history/history.module';
import { History } from './history/entities/history.entity';
import { MailModule } from './mail/mail.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ResetPassword } from './reset-password/entities/reset-password.entity';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: +(configService.get<string>('DB_PORT')),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [User, Quiz, UserQuiz, QuizQuestion, QuizAnswer, QuizUserAnswer, History, ResetPassword],
      synchronize: true,
    }),
    inject: [ConfigService],
  }), UsersModule, FilesModule, AuthModule, QuizzesModule, UserQuizModule, QuizQuestionModule, QuizAnswerModule, QuizUserAnswerModule, HistoryModule, MailModule, ResetPasswordModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
