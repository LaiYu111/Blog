import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TagDocument = HydratedDocument<Tag>;

@Schema()
export class Tag {
  @Prop()
  name: string;

  @Prop()
  bgColor: string;

  @Prop({ default: '' })
  textColor: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
