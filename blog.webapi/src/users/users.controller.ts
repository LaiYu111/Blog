import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('user')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'create/register a user' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createAsync(createUserDto);
  }
}
