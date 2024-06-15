import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { md5Encrypt } from '../utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto) {
    const user = await this.usersService.findOneAsync(authDto.email);

    if (user?.password !== md5Encrypt(authDto.password)) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate a JWT
    const payload = {
      email: user.email,
      username: user.username,
      roles: user.role,
    };
    const accessToken = this.jwtService.sign(payload);
    const decodedToken = this.jwtService.decode(accessToken) as { exp: number };

    return {
      access_token: accessToken,
      expires_in: decodedToken.exp,
    };
  }
}
