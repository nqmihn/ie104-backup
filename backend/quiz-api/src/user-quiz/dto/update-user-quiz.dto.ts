import { PartialType } from '@nestjs/mapped-types';
import { CreateUserQuizDto } from './create-user-quiz.dto';

export class UpdateUserQuizDto extends PartialType(CreateUserQuizDto) {}
