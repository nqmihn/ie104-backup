import { Module } from '@nestjs/common';
import { QuizUserAnswerService } from './quiz-user-answer.service';
import { QuizUserAnswerController } from './quiz-user-answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizUserAnswer } from './entities/quiz-user-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizUserAnswer]),],
  controllers: [QuizUserAnswerController],
  providers: [QuizUserAnswerService]
})
export class QuizUserAnswerModule { }
