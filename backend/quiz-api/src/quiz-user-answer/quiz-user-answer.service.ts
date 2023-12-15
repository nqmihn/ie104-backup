import { Injectable } from '@nestjs/common';
import { CreateQuizUserAnswerDto } from './dto/create-quiz-user-answer.dto';
import { UpdateQuizUserAnswerDto } from './dto/update-quiz-user-answer.dto';

@Injectable()
export class QuizUserAnswerService {
  create(createQuizUserAnswerDto: CreateQuizUserAnswerDto) {
    return 'This action adds a new quizUserAnswer';
  }

  findAll() {
    return `This action returns all quizUserAnswer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizUserAnswer`;
  }

  update(id: number, updateQuizUserAnswerDto: UpdateQuizUserAnswerDto) {
    return `This action updates a #${id} quizUserAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizUserAnswer`;
  }
}
