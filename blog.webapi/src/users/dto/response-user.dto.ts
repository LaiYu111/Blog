import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class ResponseUserDto {
  @ApiProperty()
  _id: ObjectId;

  @ApiProperty()
  email: string;

  @ApiProperty()
  roles: string[];
}
