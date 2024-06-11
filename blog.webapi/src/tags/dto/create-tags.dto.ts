import { ApiProperty } from '@nestjs/swagger';

export class CreateTagsDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  bgColor: string;

  @ApiProperty()
  textColor: string;
}
