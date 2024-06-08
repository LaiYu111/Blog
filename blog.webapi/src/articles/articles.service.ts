import { Injectable } from '@nestjs/common';
import { Article } from '../schemas/article.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async queryAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async createAsync(createArticleDto: CreateArticleDto) {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async queryByIDAsync(articleId: string): Promise<Article> {
    return this.articleModel.findById(articleId);
  }
}
