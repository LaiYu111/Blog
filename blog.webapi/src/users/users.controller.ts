import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../auth/constants';
import { handleResponse } from '../utils';
import { ResponseUserDto } from './dto/response-user.dto';

@ApiTags('user')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'create/register a user' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createAsync(createUserDto);
  }

  @Public()
  @Get()
  async get(@Res() res) {
    const users = await this.userService.queryAll();
    const result = users.map((user) => {
      const resUserDto = new ResponseUserDto();
      resUserDto.email = user.email;
      resUserDto._id = user.id;
      resUserDto.roles = user.role;
      return resUserDto;
    });
    return handleResponse(res, HttpStatus.OK, '', result);
  }
}
