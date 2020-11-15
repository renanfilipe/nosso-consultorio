import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { cpf } = createUserDto;
    const isCPFAlreadyRegistered = await this.usersRepository.findOne({ where: { cpf, isActive: true }})
    if(isCPFAlreadyRegistered) {
      return;
    }
    const user = new User(createUserDto)

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ where: { isActive: true }});
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id, isActive: true } });
  }

  async remove(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id, isActive: true } });
    if(!user) {
      return
    }
    user.isActive = false

    return this.usersRepository.save(user)
  }
}
