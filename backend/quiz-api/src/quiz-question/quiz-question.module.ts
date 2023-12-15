import { Module } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { QuizQuestionController } from './quiz-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/files/multer.config';
import { UserQuizModule } from 'src/user-quiz/user-quiz.module';
import { QuizAnswer } from 'src/quiz-answer/entities/quiz-answer.entity';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports: [UserQuizModule, HistoryModule, TypeOrmModule.forFeature([QuizQuestion, QuizAnswer]), MulterModule.registerAsync({
    useClass: MulterConfigService,
  }),],
  controllers: [QuizQuestionController],
  providers: [QuizQuestionService],
  exports: [QuizQuestionService],
})
export class QuizQuestionModule { }
