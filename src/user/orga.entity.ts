import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { UserEntity } from './user.entity';

@Entity({ tableName: 'orga' })
export class OrgaEntity {
  @PrimaryKey({ columnType: 'serial', type: 'int' })
  id: number;

  @Property()
  name: string;

  @OneToMany(() => UserEntity, (user) => user.orga)
  users: UserEntity[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
