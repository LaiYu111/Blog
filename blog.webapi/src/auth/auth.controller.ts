import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './constants';
import { GetUser } from '../customDecorators/getUser.decorator';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'sign in' })
  @Post('/login')
  async signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @Get('/profile')
  async profile(@GetUser() user) {
    console.log(user);
    return 1;
  }
}
