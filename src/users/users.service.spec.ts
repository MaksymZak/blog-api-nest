import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  // тип берём у настоящего метода: TS проверит, что мок возвращает User | null
  const findOne = jest.fn<Repository<User>['findOne']>();

  beforeEach(async () => {
    findOne.mockReset();

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: { findOne },
        },
      ],
    }).compile();

    service = moduleRef.get(UsersService);
  });

  it('findOne возвращает пользователя', async () => {
    const user = { id: 1, email: 'a@b.c', name: 'Ann' } as User;
    findOne.mockResolvedValue(user);

    await expect(service.findOne(1)).resolves.toBe(user);
  });

  it('findOne бросает NotFoundException', async () => {
    findOne.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});
