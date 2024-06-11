import { ApiProperty } from '@nestjs/swagger';
import { Tag } from "../../schemas/tag.schema";

export class UpdateTagsDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tag: Tag;
}
