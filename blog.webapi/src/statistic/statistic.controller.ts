import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/constants';
import { handleResponse } from '../utils';
@ApiTags('statistic')
@Controller('api/statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Public()
  @Get('tag/tag-distribution')
  async getTagDistribution(@Res() res) {
    const result = await this.statisticService.getTagDistribution();
    return handleResponse(res, HttpStatus.OK, '', result);
  }
}
