import { Injectable, NotFoundException, Param } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Anna' },
    { id: 2, name: 'Bob' },
  ];

  findOne(@Param('id') id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`Пользователь ${id} не найден`);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }
}
