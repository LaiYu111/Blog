import { ApiProperty } from '@nestjs/swagger';
import { Tag, TagSchema } from '../../schemas/tag.schema';

export class CreateArticleDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  imagePath: string;

  @ApiProperty()
  highQualityImage: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createDate: Date;

  @ApiProperty()
  modifyDate: Date;

  @ApiProperty({ type: [TagSchema] })
  tags: Tag[];
}
