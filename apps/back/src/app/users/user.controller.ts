import { Controller, Get, Post, Body, Param, Delete, UsePipes, ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UsersService } from './user.service';
import { User } from './interfaces';
import { createUserSchema } from './schemas';
import { JoiValidationPipe } from '../joiValidationPipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return `This action returns a #${id} user`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }
}
