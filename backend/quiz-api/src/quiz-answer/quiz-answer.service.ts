import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuizAnswerDto } from './dto/create-quiz-answer.dto';
import { UpdateQuizAnswerDto } from './dto/update-quiz-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizAnswer } from './entities/quiz-answer.entity';
import { IsNull, Repository } from 'typeorm';
import { QuizQuestion } from 'src/quiz-question/entities/quiz-question.entity';
import { IUserAnswer } from 'src/users/userAnswer.interface';
import { IQuizData, ISystemAnswer, quizResult } from './entities/answer.interface';
import { History } from 'src/history/entities/history.entity';
import { IUser } from 'src/users/user.interface';

@Injectable()
export class QuizAnswerService {
  constructor(@InjectRepository(QuizAnswer)
  private quizAnswerRepository: Repository<QuizAnswer>, @InjectRepository(QuizQuestion)
    private quizQuestionRepository: Repository<QuizQuestion>, @InjectRepository(History)
    private HistoryRepository: Repository<History>) { }
  async create(createQuizAnswerDto: CreateQuizAnswerDto) {
    const question = await this.quizQuestionRepository.findOneBy({ id: createQuizAnswerDto.questionId })
    if (!question) {
      throw new BadRequestException("Invalid questionId");
    }


    const newAnswer = this.quizAnswerRepository.create({ ...createQuizAnswerDto });
    return await this.quizAnswerRepository.save(newAnswer);

  }


  findAll() {
    return `This action returns all quizAnswer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizAnswer`;
  }

  async update(updateQuizAnswerDto: UpdateQuizAnswerDto) {
    const { answerId, questionId, description, correctAnswer } = updateQuizAnswerDto;
    const answer = await this.quizAnswerRepository.findOneBy({ id: answerId })
    if (answer) {
      return await this.quizAnswerRepository.update({ id: answerId }, { questionId, description, correctAnswer })
    } else {
      throw new BadRequestException("Invalid answerId")
    }
  }

  async remove(id: number) {
    const isValidId = await this.quizAnswerRepository.findOneBy({ id });
    if (!isValidId) {
      throw new BadRequestException("Invalid Id");
    }
    return await this.quizAnswerRepository.delete({ id });
  }
  async submit(userAnswer: IUserAnswer, user: IUser) {
    let result: quizResult = {}
    result.quizData = [];
    result.countCorrect = 0;
    result.countTotal = 0;
    let totalCorrect: number = 0;
    let totalPoint: number = 0;
    await Promise.all(userAnswer.answers.map(async item => {
      let dataResult: IQuizData = {};
      dataResult.questionId = item?.questionId
      dataResult.userAnswers = item?.userAnswerId
      const answer = await this.quizAnswerRepository.find({ where: { questionId: item.questionId } })
      let correctAnswer: number[] = []
      answer.forEach(a => {
        if (a.correctAnswer) {
          correctAnswer.push(a.id)
          const systemAnswer: ISystemAnswer = { id: a?.id, description: a?.description }
          if (!dataResult.systemAnswers) {
            dataResult.systemAnswers = [];
          }
          dataResult.systemAnswers.push(systemAnswer ?? {})
        }
      })
      let isCorrect: boolean = true;
      correctAnswer.forEach(cA => {
        const find = item.userAnswerId.find(userAnswer => userAnswer === cA)
        if (!find)
          isCorrect = false;

      })
      if (isCorrect) {
        totalCorrect++;
        totalPoint = totalCorrect * 5;
      }
      dataResult.isCorrect = isCorrect
      result.quizData.push(dataResult)
    }))
    result.countCorrect = totalCorrect;
    result.countTotal = totalPoint;
    const totalQuestion = await this.quizQuestionRepository.count({
      where: {
        quizId: userAnswer.quizId
      }
    })
    const quizHistory = this.HistoryRepository.create({ quizId: userAnswer.quizId, userId: user.id, totalCorrect: result.countCorrect, totalQuestions: totalQuestion })
    await this.HistoryRepository.save(quizHistory)
    return result
  }
  async countAnswers() {
    return await this.quizAnswerRepository.count();
  }
}
