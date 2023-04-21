import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrgaEntity } from './orga.entity';
import { UserEntity } from './user.entity';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity, OrgaEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
