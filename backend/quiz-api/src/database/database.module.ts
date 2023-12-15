import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [UsersModule,TypeOrmModule.forFeature([User])],
  controllers: [DatabaseController],
  providers: [DatabaseService, UsersService]
})
export class DatabaseModule { }
