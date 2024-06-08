import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from './dto/create-article.dto';

@ApiTags('article')
@Controller('api/articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}
  @Get()
  async queryAll() {
    return this.articleService.queryAll();
  }

  @ApiOperation({ summary: 'Create an Article' })
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.createAsync(createArticleDto);
  }

  @ApiOperation({ summary: 'Get By ID' })
  @Get(':id')
  async query(@Param('id') id: string) {
    return this.articleService.queryByIDAsync(id);
  }
}
