import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto, UpsertQuizQuestionDto } from './dto/update-quiz-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizQuestion } from './entities/quiz-question.entity';
import { Repository } from 'typeorm';
import { IQuestionAnswer } from './questionAnswer.interface';
import { QuizAnswer } from 'src/quiz-answer/entities/quiz-answer.entity';
import { toArray } from 'rxjs';
import { History } from 'src/history/entities/history.entity';

@Injectable()
export class QuizQuestionService {
  constructor(
    @InjectRepository(QuizQuestion)
    private quizQuestionRepository: Repository<QuizQuestion>,
    @InjectRepository(QuizAnswer)
    private quizAnswerRepository: Repository<QuizAnswer>,
  ) { }
  async create(createQuizQuestionDto: CreateQuizQuestionDto, image: string) {
    const newQuestion = this.quizQuestionRepository.create({ ...createQuizQuestionDto, image: image ? 'questions/' + image : null, })
    return await this.quizQuestionRepository.save(newQuestion)
  }

  findAll() {
    return `This action returns all quizQuestion`;
  }

  async findOne(id: number) {
    const question = await this.quizQuestionRepository.findOneBy({ id });
    if (question) {
      return question
    } else {
      throw new BadRequestException("Invalid Question")
    }

  }

  async update(updateQuizQuestionDto: UpdateQuizQuestionDto, image: string) {
    const { id, quizId, description } = updateQuizQuestionDto
    return await this.quizQuestionRepository.update({ id }, { quizId, description, image: image ? 'questions/' + image : null })
  }

  async remove(id: number) {
    return await this.quizQuestionRepository.delete(id);
  }
  async getByQuizId(quizId: number) {
    const quiz = await this.quizQuestionRepository.find({
      where: {
        quizId
      },
      relations: {
        quizAnswers: true,

      },
      select: {
        quizAnswers: {
          correctAnswer: false,
          id: true,
          description: true,
          questionId: true,
        }
      }

    })
    if (quiz) {
      return quiz;
    } else {
      throw new BadRequestException('Invalid quizId');
    }
  }
  async upsert(qa: IQuestionAnswer) {
    let questionId: number = 0;
    // List new quiz
    let listQuiz: number[] = [];
    let listOldQuiz: number[] = [];
    // List quiz before upsert
    const oldQuizzes = await this.quizQuestionRepository.find({
      where: {
        quizId: qa.quizId
      }
    })
    oldQuizzes.map(quiz => {
      listOldQuiz.push(quiz.id)
    })
    // upsert question
    for (let i = 0; i < qa.questions.length; i++) {
      // const newQuestion = await this.quizQuestionRepository.upsert({ description: qa.questions[i].description, quizId: qa.quizId, id: qa.questions[i].id }, ['id'])
      if (qa.questions[i].id) {
        await this.quizQuestionRepository.update({ id: qa.questions[i].id }, { description: qa.questions[i].description, quizId: qa.quizId, image: qa.questions[i].image ?? null })
        listQuiz.push(qa.questions[i].id)
      } else {
        const newQuestion = this.quizQuestionRepository.create({ description: qa.questions[i].description, quizId: qa.quizId, image: qa.questions[i].image ?? null })
        const createdQuestion = await this.quizQuestionRepository.save(newQuestion)
        questionId = createdQuestion.id

      }

      let answer = qa.questions[i]
      for (let j = 0; j < answer.quizAnswers.length; j++) {
        await this.quizAnswerRepository.upsert({
          description: answer.quizAnswers[j].description,
          correctAnswer: answer.quizAnswers[j].correctAnswer,
          id: answer.quizAnswers[j].id,
          questionId: answer.id ?? questionId,
        },
          ['id'])
      }
    }

    await Promise.all(listOldQuiz.map(async quiz => {
      const findQuiz = listQuiz.find(newQuiz => newQuiz === quiz)
      if (!findQuiz) {
        await this.quizQuestionRepository.delete({ id: quiz })
      }
    }))
    return "ok";
  }
  async countQuestions() {
    return await this.quizQuestionRepository.count();
  }
}
