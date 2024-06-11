import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from '../schemas/tag.schema';
import { Model } from 'mongoose';
import { CreateTagsDto } from './dto/create-tags.dto';
import { UpdateTagsDto } from './dto/update-tags.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  async createAsync(createTagDto: CreateTagsDto) {
    const createdTag = new this.tagModel(createTagDto);
    return createdTag.save();
  }

  async queryAll(): Promise<Tag[]> {
    return this.tagModel.find().exec();
  }

  async updateAsync(updateTagDto: UpdateTagsDto) {
    return this.tagModel.findByIdAndUpdate(updateTagDto.id, updateTagDto.tag, {new: true});
  }
}
