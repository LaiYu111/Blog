import { Module } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { ArticlesService } from '../articles/articles.service';
import { TagsService } from '../tags/tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from "../schemas/article.schema";
import { Tag, TagSchema } from "../schemas/tag.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
  ],
  controllers: [StatisticController],
  providers: [StatisticService, ArticlesService, TagsService],
})
export class StatisticModule {}
