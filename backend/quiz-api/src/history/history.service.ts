import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { IUser } from 'src/users/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(@InjectRepository(History) private historyRepository: Repository<History>) { }
  create(createHistoryDto: CreateHistoryDto) {
    return 'This action adds a new history';
  }

  findAll() {
    return `This action returns all history`;
  }

  findOne(id: number) {
    return `This action returns a #${id} history`;
  }

  update(id: number, updateHistoryDto: UpdateHistoryDto) {
    return `This action updates a #${id} history`;
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
  async getByUser(user: IUser) {
    return await this.historyRepository.find({
      where: {
        userId: user.id
      }, relations: {
        quiz: true
      },
      select: {
        quiz: {
          id: true,
          description: true,
        }
      }
    })
  }
}
