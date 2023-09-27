import { Seeder } from '@jorgebodega/typeorm-seeding';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

const users: User[] = [
  {
    id: 1,
    email: 'kmavillanosa',
    password: 'sample!@',
    verified: true,
  },
];

class UserSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.createEntityManager().save<User>(users);
  }
}
