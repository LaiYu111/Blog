import { ApiProperty } from '@nestjs/swagger';

export class UpdateArticlePublicationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  isPublished: boolean;
}
