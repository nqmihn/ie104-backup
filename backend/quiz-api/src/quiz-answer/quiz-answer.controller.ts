import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Put, UseInterceptors, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { QuizAnswerService } from './quiz-answer.service';
import { CreateQuizAnswerDto } from './dto/create-quiz-answer.dto';
import { UpdateQuizAnswerDto } from './dto/update-quiz-answer.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { QuizQuestionService } from 'src/quiz-question/quiz-question.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { IUserAnswer } from 'src/users/userAnswer.interface';
import { quizResult } from './entities/answer.interface';
import { IUser } from 'src/users/user.interface';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("answer")
@Controller('answer')
export class QuizAnswerController {
  constructor(private readonly quizAnswerService: QuizAnswerService,) { }

  @Post()
  create(@Body() createQuizAnswerDto: CreateQuizAnswerDto) {
    return this.quizAnswerService.create(createQuizAnswerDto);


  }

  @Get()
  findAll() {
    return this.quizAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizAnswerService.findOne(+id);
  }

  @Put()
  update(@Body() updateQuizAnswerDto: UpdateQuizAnswerDto) {
    return this.quizAnswerService.update(updateQuizAnswerDto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.quizAnswerService.remove(+id);
  }

  @Post('quiz-submit')
  @ResponseMessage("Submit Quiz Success")
  submitAnswer(@Body() userAnswer: IUserAnswer, @User() user: IUser): Promise<quizResult> {
    return this.quizAnswerService.submit(userAnswer, user);
  }
}
