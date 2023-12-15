import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { QuizQuestion } from 'src/quiz-question/entities/quiz-question.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>, @InjectRepository(QuizQuestion)
    private quizQuestionRepository: Repository<QuizQuestion>,

  ) { }
  async create(createQuizDto: CreateQuizDto, quizImage: string) {
    const newQuiz = this.quizRepository.create({ ...createQuizDto, quizImage: 'quizzes/' + quizImage });
    const data = await this.quizRepository.save(newQuiz)
    return data;
  }

  findAll() {
    return this.quizRepository.find();
  }

  async findOne(id: number) {
    return await this.quizRepository.findOneBy({ id });
  }

  async update(updateQuizDto: UpdateQuizDto, quizImage: string) {
    const { id, name, description, difficulty } = updateQuizDto
    return await this.quizRepository.update({ id }, { name, description, difficulty, quizImage: quizImage ? 'quizzes/' + quizImage : null })
  }

  async remove(id: number) {
    return await this.quizRepository.delete({ id });
  }
  async getQuizWithQA(id: number) {
    const quiz = await this.quizRepository.find({ where: { id }, select: ['id', 'name', 'description', 'difficulty'] });
    const qa = await this.quizQuestionRepository.find({
      where: { quizId: id },
      relations: {
        quizAnswers: true,
      },
      select: ['id', 'description', 'image', "quizAnswers"]
    })

    return { quizId: quiz[0].id, qa }

  }
  async countQuizzes() {
    return await this.quizRepository.count();
  }
}
