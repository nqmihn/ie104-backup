import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, Put, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("quizz")
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) { }

  @Post()
  @ResponseMessage("Create Quizz Success")
  @UseInterceptors(FileInterceptor('quizImage'))
  create(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: /^(image\/png|image\/jpeg|jpg|jpeg|png|gif)$/i,
      })
      .addMaxSizeValidator({
        maxSize: 5000 * 1024
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }),
  ) quizImage: Express.Multer.File, @Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto, quizImage.filename);
  }

  @Get('all')
  @ResponseMessage("Get all quiz")
  findAll() {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(+id);
  }

  @Put()
  @ResponseMessage("Update Quizz Success")
  @UseInterceptors(FileInterceptor('quizImage'))
  update(@UploadedFile(new ParseFilePipe({
    fileIsRequired: false,
    validators: [
      new MaxFileSizeValidator({ maxSize: 5000 * 1024 }),
      new FileTypeValidator({ fileType: /^(image\/png|image\/jpeg|jpg|jpeg|png|gif)$/i }),
    ],
  }),) quizImage: Express.Multer.File, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(updateQuizDto, quizImage?.filename);
  }

  @Delete(':id')
  @ResponseMessage("Delete Quiz Success")
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(+id);
  }

  @Get('quiz-with-qa/:id')
  @Public()
  getQuizWithQA(@Param('id') id: string) {
    return this.quizzesService.getQuizWithQA(+id);
  }
}
