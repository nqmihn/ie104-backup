import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/files/multer.config';
import { QuizQuestionModule } from 'src/quiz-question/quiz-question.module';
import { QuizQuestion } from 'src/quiz-question/entities/quiz-question.entity';

@Module({
  imports: [QuizQuestionModule, TypeOrmModule.forFeature([Quiz, QuizQuestion]), MulterModule.registerAsync({
    useClass: MulterConfigService,
  }),],
  controllers: [QuizzesController],
  providers: [QuizzesService,],
  exports: [QuizzesService],
})
export class QuizzesModule { }
