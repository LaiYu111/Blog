import { Injectable } from '@nestjs/common';
import { ArticlesService } from '../articles/articles.service';
import { TagsService } from '../tags/tags.service';
import { Article } from '../schemas/article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from '../schemas/tag.schema';

@Injectable()
export class StatisticService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
    @InjectModel('Tag') private readonly tagModel: Model<Tag>,
  ) {}

  async getTagDistribution() {
    // Get total number of articles
    const totalArticles = await this.articleModel.countDocuments();

    // Get total number of tags
    const totalTags = await this.tagModel.countDocuments();

    // Aggregation pipeline to get distribution of articles by tags
    const distribution = await this.articleModel.aggregate([
      // 关联 tags
      {
        $lookup: {
          from: 'tags',
          localField: 'tagIds',
          foreignField: '_id',
          as: 'tags',
        },
      },
      // 展开 tags
      {
        $unwind: {
          path: '$tags',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$tags.name',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: null,
          name: '$_id',
          count: '$count',
        },
      },
    ]);

    return {
      titleArticles: totalArticles,
      titleTags: totalTags,
      distribution: distribution,
    };
  }
}
