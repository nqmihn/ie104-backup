import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserQuizDto } from './dto/create-user-quiz.dto';
import { UpdateUserQuizDto } from './dto/update-user-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQuiz } from './entities/user-quiz.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { async } from 'rxjs';
import { IUser } from 'src/users/user.interface';

@Injectable()
export class UserQuizService {
  constructor(
    @InjectRepository(UserQuiz)
    private usersQuizRepository: Repository<UserQuiz>,
    // @InjectRepository(User)
    // private usersRepository: Repository<User>,
    // @InjectRepository(Quiz)
    // private quizzesRepository: Repository<Quiz>,
  ) { }
  create(createUserQuizDto: CreateUserQuizDto) {
    return 'This action adds a new userQuiz';
  }

  findAll() {
    return `This action returns all userQuiz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userQuiz`;
  }

  update(id: number, updateUserQuizDto: UpdateUserQuizDto) {
    return `This action updates a #${id} userQuiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} userQuiz`;
  }
  assign = async (createUserQuizDto: CreateUserQuizDto) => {

    const { userId, quizId } = createUserQuizDto
    const userQuiz = await this.usersQuizRepository.findOneBy({ userId, quizId });
    if (userQuiz) {
      throw new BadRequestException("Quiz has been assigned to this user")
    }
    const newQuiz = this.usersQuizRepository.create({ ...createUserQuizDto });
    return await this.usersQuizRepository.save(newQuiz);


  }
  getQuizByUser = async (user: IUser) => {
    return await this.usersQuizRepository.find({
      relations: {
        quiz: true,
      },
      where: {
        userId: user.id
      }
    })
  }
}
