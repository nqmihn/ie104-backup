import { Controller, Get, UseGuards, Post, Req, Res, Body, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { Response, Request } from 'express';
import { IUser } from 'src/users/user.interface';
import { RegisterUserDto, UserLoginDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { QuizQuestionService } from 'src/quiz-question/quiz-question.service';
import { QuizAnswerService } from 'src/quiz-answer/quiz-answer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBody } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService, private quizService: QuizzesService, private quizQuestionService: QuizQuestionService,
        private quizAnswerService: QuizAnswerService) { }


    @UseGuards(LocalAuthGuard)
    @ResponseMessage("Login Success")
    @Public()
    @ApiBody({ type: UserLoginDto })
    @Post('login')
    async login(@Req() req, @Res({ passthrough: true }) response: Response) {
        return this.authService.login(req.user, response);
    }

    @Get('/account')
    getAccount(@User() user: IUser) {
        return { user };
    }

    @Post('/refresh')
    @Public()
    handleRefreshToken(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
        const refreshToken = req.cookies["refresh_token"];
        return this.authService.processNewToken(refreshToken, response);
    }
    @Post('logout')
    @ResponseMessage("Logout Success !")
    logout(@Res({ passthrough: true }) response: Response, @User() user: IUser) {
        return this.authService.logout(response, user)
    }
    @Post('register')
    @ResponseMessage("Register User success")
    @Public()
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.userService.register(registerUserDto);
    }
    @Post('change-password')
    changePassword(@User() user: IUser, @Body('current_password') currentPassword: string, @Body('new_password') newPassword: string) {
        return this.userService.changePassword(user, currentPassword, newPassword);
    }

    @Get('overview')
    @Public()
    async getOverview() {
        const users = await this.userService.countUser()
        const countQuiz = await this.quizService.countQuizzes()
        const countQuestions = await this.quizQuestionService.countQuestions()
        const countAnswers = await this.quizAnswerService.countAnswers()
        return {
            users, others: {
                countQuiz, countQuestions, countAnswers
            }
        }
    }
    @Post("profile")
    @UseInterceptors(FileInterceptor('userImage'))
    updateProfile(@UploadedFile(new ParseFilePipe({
        fileIsRequired: false,
        validators: [
            new MaxFileSizeValidator({ maxSize: 5000 * 1024 }),
            new FileTypeValidator({ fileType: /^(image\/png|image\/jpeg|jpg|jpeg|png|gif)$/i }),
        ],
    }),) image: Express.Multer.File, @Body("username") username: string, @User() user: IUser) {
        return this.userService.updateProfile(image?.filename, username, user)
    }
    @Get('profile')
    getProfile(@User() user: IUser) {
        return this.userService.findOne(user.id);
    }

}   
