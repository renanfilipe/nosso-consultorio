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
    const userWithSameCPF = await this.usersRepository.findOne({ where: { cpf, isActive: true }})
    if(userWithSameCPF) {
      return {} as User;
    }
    const user = new User(createUserDto)

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ where: { isActive: true }});
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id, isActive: true } });
    
    return user || {} as User
  }

  async remove(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id, isActive: true } });
    if(!user) {
      return {} as User
    }
    user.isActive = false

    return this.usersRepository.save(user)
  }
}
