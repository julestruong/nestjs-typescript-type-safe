import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { OrgaEntity } from './orga.entity';
import { UserEntity } from './user.entity';
import { Loaded } from '@mikro-orm/core';

class UserServiceMock {
  createUser = jest.fn();
}

describe('UserController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceMock,
        },
      ],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', async () => {
      const appController = app.get(UserController);
      const userService = app.get(UserService);

      const orga = new OrgaEntity(1, 'orgaName');
      const loadedUserEntity = new UserEntity(
        1,
        'email@email.com',
        orga,
      ) as Loaded<UserEntity, 'orga'>; // @martin is this normal to have to cast it?

      jest.spyOn(userService, 'createUser').mockResolvedValue(loadedUserEntity);
      const result = await appController.create();

      expect(result).toBe(loadedUserEntity);

      expect(userService.createUser).toBeCalledWith(loadedUserEntity, {
        populate: ['orga'],
      });
    });
  });
});
