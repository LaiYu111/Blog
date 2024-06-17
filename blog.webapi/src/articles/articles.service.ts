import { Injectable } from '@nestjs/common';
import { Article } from '../schemas/article.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { UpdateArticlePublicationDto } from './dto/update-articlePublication.dto';
import { Tag } from '../schemas/tag.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    @InjectModel(Tag.name) private tagModel: Model<Tag>,
  ) {}

  async queryAll(): Promise<Article[]> {
    return this.articleModel
      .aggregate([
        {
          $lookup: {
            from: 'tags',
            localField: 'tagIds',
            foreignField: '_id',
            as: 'tags',
          },
        },
      ])
      .exec();
  }

  async getPublishedArticles() {
    return this.articleModel
      .aggregate([
        {
          $match: { isPublished: true },
        },
        {
          $lookup: {
            from: 'tags',
            localField: 'tagIds',
            foreignField: '_id',
            as: 'tags',
          },
        },
      ])
      .exec();
  }

  async createAsync(createArticleDto: CreateArticleDto) {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async queryByIDAsync(articleId: string): Promise<Article> {
    // return this.articleModel.findById(articleId);
    const articles = await this.articleModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(articleId) },
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'tagIds',
          foreignField: '_id',
          as: 'tags',
        },
      },
    ]);
    return articles[0];
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
