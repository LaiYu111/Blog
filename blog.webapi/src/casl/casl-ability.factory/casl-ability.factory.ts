import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Article } from '../../schemas/article.schema';
import { User } from '../../schemas/user.schema';
import { Action } from '../../enums/action.enum';
import { Injectable } from '@nestjs/common';
import { Role } from '../../enums/role.enum';

type Subjects = InferSubjects<typeof Article | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;
@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.role.includes(Role.Admin)) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    // cannot(Action.Delete, Article) // cannot Action, See https://nest.nodejs.cn/security/authorization

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
