import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  FindOneOptions,
  FindOptions,
  Loaded,
  RequiredEntityData,
} from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: EntityRepository<UserEntity>,
  ) {}

  async createUser<P extends string = never>(
    data: RequiredEntityData<UserEntity>,
    options?: FindOneOptions<UserEntity, P>,
  ): Promise<Loaded<UserEntity, P>> {
    const user = this.userEntityRepository.create(data);

    await this.userEntityRepository.persistAndFlush(user);

    return this.userEntityRepository.findOne({ id: user.id }, options);
  }
}
