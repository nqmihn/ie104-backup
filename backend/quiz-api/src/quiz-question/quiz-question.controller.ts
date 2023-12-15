import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Put, Query } from '@nestjs/common';
import { QuizQuestionService } from './quiz-question.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto, UpsertQuizQuestionDto } from './dto/update-quiz-question.dto';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { FileInterceptor } from '@nestjs/platform-express';
import { IQuestionAnswer } from './questionAnswer.interface';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("question")
@Controller('question')
export class QuizQuestionController {
  constructor(private readonly quizQuestionService: QuizQuestionService) { }

  @Post()
  @UseInterceptors(FileInterceptor('questionImage'))
  create(@UploadedFile(new ParseFilePipe({
    fileIsRequired: false,
    validators: [
      new MaxFileSizeValidator({ maxSize: 5000 * 1024 }),
      new FileTypeValidator({ fileType: /^(image\/png|image\/jpeg|jpg|jpeg|png|gif)$/i }),
    ],
  }),) image: Express.Multer.File, @Body() createQuizQuestionDto: CreateQuizQuestionDto) {
    return this.quizQuestionService.create(createQuizQuestionDto, image?.filename);
  }

  @Get()
  findAll() {
    return this.quizQuestionService.findAll();
  }
  @Get('questions-by-quiz')
  getQuestionByQuiz(@Query('quizId') quizId: string) {
    return this.quizQuestionService.getByQuizId(+quizId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizQuestionService.findOne(+id);
  }

  @Put()
  @UseInterceptors(FileInterceptor('questionImage'))
  update(@UploadedFile(new ParseFilePipe({
    fileIsRequired: false,
    validators: [
      new MaxFileSizeValidator({ maxSize: 5000 * 1024 }),
      new FileTypeValidator({ fileType: /^(image\/png|image\/jpeg|jpg|jpeg|png|gif)$/i }),
    ],
  }),) image: Express.Multer.File, @Body() updateQuizQuestionDto: UpdateQuizQuestionDto) {
    return this.quizQuestionService.update(updateQuizQuestionDto, image?.filename);
  }

  @Delete()
  remove(@Body('id') id: string) {
    return this.quizQuestionService.remove(+id);
  }

  @Post('upsert-qa')
  @ResponseMessage("Update Q/A Success")
  upsertQA(@Body() qa: IQuestionAnswer) {

    return this.quizQuestionService.upsert(qa)
  }

  @Post('update-file-qa')
  @UseInterceptors(FileInterceptor('image'))
  updateFile(@UploadedFile(new ParseFilePipe({
    fileIsRequired: false,
    validators: [
      new MaxFileSizeValidator({ maxSize: 5000 * 1024 }),
      new FileTypeValidator({ fileType: /^(image\/png|image\/jpeg|jpg|jpeg|png|gif)$/i }),
    ],
  }),) image: Express.Multer.File) {
    return `questions/${image?.filename}`;
  }
}
