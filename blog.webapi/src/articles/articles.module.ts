import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../schemas/article.schema';
// import { CaslModule } from "../casl/casl.module";
import { Tag, TagSchema } from '../schemas/tag.schema';
import { TagsService } from '../tags/tags.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    // CaslModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, TagsService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
