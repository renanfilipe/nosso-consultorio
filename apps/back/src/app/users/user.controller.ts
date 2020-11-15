import { Controller, Get, Post, Body, Param, Delete, UsePipes, ParseUUIDPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UsersService } from './user.service';
import { User, UserWithoutPassword } from './user.entity';
import { createUserSchema } from './schemas';
import { JoiValidationPipe } from '../joiValidationPipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const user = await this.usersService.create(createUserDto);
    if(!user) {
      throw new HttpException('User already registered', HttpStatus.BAD_REQUEST);
    }

    return this.removePassword(user)
  }

  @Get()
  async findAll(): Promise<UserWithoutPassword[]> {
    const users = await this.usersService.findAll();

    return users.map(this.removePassword)
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<UserWithoutPassword> {
    const user = await this.usersService.findOne(id);
    if(!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.removePassword(user)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserWithoutPassword> {
    const user = await this.usersService.remove(id);
    if(!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.removePassword(user)
  }

  private removePassword(user: User): UserWithoutPassword {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, tempPassword, isActive, ...rest } = user;

    return rest
  }
}
