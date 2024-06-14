import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tag, TagSchema } from './tag.schema';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  imagePath: string;

  @Prop()
  highQualityImage: string;

  @Prop()
  content: string;

  @Prop({ default: new Date().getDate() })
  createDate: Date;

  @Prop()
  modifyDate: Date;

  @Prop({ type: [TagSchema], default: [] })
  tags: Tag[];

  @Prop({ default: false })
  isPublished: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
