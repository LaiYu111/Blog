import { Injectable } from '@nestjs/common';
import { Article } from '../schemas/article.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { UpdateArticlePublicationDto } from './dto/update-articlePublication.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async queryAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async getPublishedArticles() {
    return this.articleModel.find({ isPublished: true }).exec();
  }

  async createAsync(createArticleDto: CreateArticleDto) {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async queryByIDAsync(articleId: string): Promise<Article> {
    return this.articleModel.findById(articleId);
  }

  async updateByIDAsync(updateArticleDto: UpdateArticleDto) {
    return this.articleModel.findByIdAndUpdate(
      updateArticleDto.id,
      updateArticleDto.article,
      { new: true },
    );
  }
  async deleteByIDsAsync(ids: string[]) {
    return this.articleModel.deleteMany({
      _id: { $in: ids },
    });
  }

  async updateArticlePublicationByIDAsync(
    updateArticlePublication: UpdateArticlePublicationDto,
  ) {
    return this.articleModel
      .findByIdAndUpdate(
        updateArticlePublication.id,
        { isPublished: updateArticlePublication.isPublished },
        { new: true },
      )
      .exec();
  }
}
