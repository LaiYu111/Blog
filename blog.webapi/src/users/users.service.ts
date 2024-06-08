import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { md5Encrypt } from '../utils';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneAsync(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async createAsync(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOneAsync(createUserDto.email);
    if (user) {
      throw new BadRequestException('User with this email already exists');
    }

    createUserDto.password = md5Encrypt(createUserDto.password);
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
}
