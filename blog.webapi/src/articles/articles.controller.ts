import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { ArticlesService } from './articles.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from './dto/create-article.dto';
import { handleResponse } from "../utils";

@ApiTags('article')
@Controller('api/articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}
  @Get()
  async queryAll(@Res() res) {
    const result = await this.articleService.queryAll();
    return handleResponse(res, HttpStatus.OK, ``, result, '')
  }

  @ApiOperation({ summary: 'Create an Article' })
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto, @Res() res) {
    const result = await this.articleService.createAsync(createArticleDto);
    return handleResponse(res, HttpStatus.OK, `[${result.title}] create complete`, result, '')
  }

  @ApiOperation({ summary: 'Get By ID' })
  @Get(':id')
  async query(@Param('id') id: string) {
    return this.articleService.queryByIDAsync(id);
  }
}
