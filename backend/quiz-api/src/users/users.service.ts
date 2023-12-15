import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'
import moment from 'moment';
import { IUser } from './user.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  getHashPassword = (password: string) => {

    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash
  }
  async create(createUserDto: CreateUserDto, image: string) {
    const { email, password, username, role } = createUserDto
    const isExsitUser = await this.usersRepository.findOneBy({ email });
    if (isExsitUser) {
      throw new BadRequestException("Email has been used");
    }
    const newUser = this.usersRepository.create({
      email,
      password: this.getHashPassword(password),
      username,
      role,
      image: 'users/' + image
    });
    const data = await this.usersRepository.save(newUser);
    return {
      id: data?.id,
      email: data?.email,
      username: data?.username,
      role: data?.role,
      createdAt: data?.createdAt,
    }
  }

  findAll() {
    return this.usersRepository.find({ select: ['id', 'username', 'email', 'role', 'image'] });
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({
      where: { id }, select: {
        id: true,
        email: true,
        username: true,
        role: true,
        image: true
      }
    });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email })
  }

  async fetchUserPaginate(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const defaultLimit = limit ? limit : 10;
    const totalItems = (await this.usersRepository.find()).length
    const totalPages = Math.ceil(totalItems / defaultLimit)
    const users = await this.usersRepository.find({ take: defaultLimit, skip: offset, select: ['id', 'username', 'email', 'role', 'image'] })
    return {
      totalRows: totalItems,
      totalPages: totalPages,
      users
    }
  }
  isValidPassword(password: string, hashPassword: string) {
    return compareSync(password, hashPassword)
  }

  async update(updateUserDto: UpdateUserDto, image: string) {
    const { id, username, role } = updateUserDto
    return await this.usersRepository.update({ id }, { username, role, image: image ? 'users/' + image : null })
  }
  async updatePassword(id: number, password: string) {
    return await this.usersRepository.update({ id }, { password: this.getHashPassword(password) })
  }
  setRefreshToken(id: number, refresh_token: string) {

    return this.usersRepository.update({ id }, { refresh_token })
  }
  findByToken = (refresh_token: string) => {
    return this.usersRepository.findOneBy({ refresh_token })
  }
  async remove(id: number) {
    return await this.usersRepository.delete({ id });
  }
  register = async (registerUserDto: RegisterUserDto) => {
    const { email, password, username } = registerUserDto
    const isExistEmail = await this.usersRepository.findOneBy({ email })
    if (isExistEmail) {
      throw new BadRequestException("Email has been used")
    }
    const newUser = this.usersRepository.create({
      email,
      password: this.getHashPassword(password),
      username,
      role: "USER"
    });
    const data = await this.usersRepository.save(newUser);
    return {
      id: data?.id,
      email: data?.email,
      username: data?.username,
      role: data?.role,
      createdAt: data?.createdAt,
    }
  }
  changePassword = async (user: IUser, currentPassword: string, newPassword: string) => {
    const { id } = user
    const userData = await this.usersRepository.findOneBy({ id })
    if (user && this.isValidPassword(currentPassword, userData.password)) {
      await this.usersRepository.update({ id }, { password: this.getHashPassword(newPassword) })
      return {
        email: userData?.email
      }
    } else {
      throw new BadRequestException("Current Password is wrong !")
    }
  }
  countUser = async () => {
    const total = await this.usersRepository.count()
    const countUser = await this.usersRepository.count({
      where: {
        role: "USER"
      }
    })
    const countAdmin = await this.usersRepository.count({
      where: {
        role: "ADMIN"
      }
    })
    return {
      total,
      countUser,
      countAdmin,

    }
  }
  updateProfile = async (image: string, username: string, user: IUser) => {
    return await this.usersRepository.update({ id: user.id }, { image: image ? "users/" + image : undefined, username })
  }
}
