import { ApiProperty } from '@nestjs/swagger';
import { Tag, TagSchema } from '../../schemas/tag.schema';
import { Article } from "../../schemas/article.schema";

export class UpdateArticleDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  article: Article;
}
