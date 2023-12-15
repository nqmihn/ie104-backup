import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizUserAnswerDto } from './create-quiz-user-answer.dto';

export class UpdateQuizUserAnswerDto extends PartialType(CreateQuizUserAnswerDto) {}
