import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { OrgaEntity } from './orga.entity';
import { Loaded } from '@mikro-orm/core';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  create(): Promise<Loaded<UserEntity, 'orga'>> {
    const orga = new OrgaEntity('orgaName');
    const user = new UserEntity('email@email.com', orga);
    const userCreated = this.userService.createUser(user, {
      populate: ['orga'],
    });
    // ... some other actions

    return userCreated;
  }
}
