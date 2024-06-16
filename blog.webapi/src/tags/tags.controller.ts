import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTagsDto } from './dto/create-tags.dto';
import { handleResponse } from '../utils';
import { UpdateTagsDto } from './dto/update-tags.dto';
import { Public } from '../auth/constants';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../enums/role.enum';

@ApiTags('tags')
@Controller('api/tags')
export class TagsController {
  constructor(private tagService: TagsService) {}

  @Public()
  @ApiOperation({ summary: 'Get all tags ' })
  @Get()
  async queryAll(@Res() res) {
    const result = await this.tagService.queryAll();
    return handleResponse(res, HttpStatus.OK, `complete`, result);
  }

  @Roles(Role.Admin)
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
  @Roles(Role.Admin)
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

  @Roles(Role.Admin)
  @Delete()
  async delete(@Query('ids') ids: string[], @Res() res) {
    const result = await this.tagService.deleteAsync(ids);
    return handleResponse(
      res,
      HttpStatus.OK,
      `[${ids}] delete complete`,
      result,
    );
  }
}
