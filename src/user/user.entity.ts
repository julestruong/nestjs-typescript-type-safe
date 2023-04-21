import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { OrgaEntity } from './orga.entity';

@Entity({ tableName: 'user' })
export class UserEntity {
  @PrimaryKey({ columnType: 'serial', type: 'int' })
  id: number;

  @Property()
  email: string;

  @ManyToOne(() => OrgaEntity)
  orga: Ref<OrgaEntity>;

  constructor(id: number, email: string, orga: OrgaEntity) {
    this.id = id;
    this.email = email;
    this.orga = orga as unknown as Ref<OrgaEntity>; // @martin how do i set the orga here ?
  }
}
