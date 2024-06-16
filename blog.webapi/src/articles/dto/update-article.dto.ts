import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../../schemas/article.schema';

export class UpdateArticleDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  article: Article;
}
