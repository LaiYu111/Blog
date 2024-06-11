import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTagsDto } from './dto/create-tags.dto';
import { handleResponse } from '../utils';
import { UpdateTagsDto } from './dto/update-tags.dto';

@ApiTags('tags')
@Controller('api/tags')
export class TagsController {
  constructor(private tagService: TagsService) {}

  @ApiOperation({ summary: 'Get all tags ' })
  @Get()
  async queryAll(@Res() res) {
    const result = await this.tagService.queryAll();
    return handleResponse(res, HttpStatus.OK, `complete`, result);
  }

  @Post()
  async create(@Body() createTagDto: CreateTagsDto, @Res() res) {
    const result = await this.tagService.createAsync(createTagDto);
    return handleResponse(
      res,
      HttpStatus.OK,
      `[${result.name}] create complete`,
      result,
    );
  }

  @Put()
  async update(@Body() updateTagDto: UpdateTagsDto, @Res() res) {
    const result = await this.tagService.updateAsync(updateTagDto);
    return handleResponse(
      res,
      HttpStatus.OK,
      `[${result._id}] update complete`,
      result,
    );
  }
}
