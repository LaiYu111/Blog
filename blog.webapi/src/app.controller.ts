import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles/roles.decorator';
import { Role } from './enums/role.enum';
import { CaslAbilityFactory } from './casl/casl-ability.factory/casl-ability.factory';

@Controller('api/system')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Roles(Role.User)
  @Get('version')
  getHello(): string {
    return '1';
  }
}
