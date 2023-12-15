import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizUserAnswerService } from './quiz-user-answer.service';
import { CreateQuizUserAnswerDto } from './dto/create-quiz-user-answer.dto';
import { UpdateQuizUserAnswerDto } from './dto/update-quiz-user-answer.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("user-answer")
@Controller('quiz-user-answer')
export class QuizUserAnswerController {
  constructor(private readonly quizUserAnswerService: QuizUserAnswerService) {}

  @Post()
  create(@Body() createQuizUserAnswerDto: CreateQuizUserAnswerDto) {
    return this.quizUserAnswerService.create(createQuizUserAnswerDto);
  }

  @Get()
  findAll() {
    return this.quizUserAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizUserAnswerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizUserAnswerDto: UpdateQuizUserAnswerDto) {
    return this.quizUserAnswerService.update(+id, updateQuizUserAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizUserAnswerService.remove(+id);
  }
}
