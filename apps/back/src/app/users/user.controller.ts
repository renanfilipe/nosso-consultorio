import { Controller, Get, Post, Body, Param, Delete, UsePipes, ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { createUserSchema } from './schemas';
import { JoiValidationPipe } from '../joiValidationPipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
