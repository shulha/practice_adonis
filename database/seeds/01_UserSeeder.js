/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User');
const Role = use('Role');

class UserSeeder {
  async run() {
    await User.query().delete();
    await Role.query().delete();

    const roleAdmin = new Role();
    roleAdmin.name = 'Administrator';
    roleAdmin.slug = 'admin';
    roleAdmin.description = 'manage administration privileges';
    await roleAdmin.save();

    const admin = await User.create({
      username: 'admin',
      email: 'admin@test.com',
      password: '123'
    });
    await admin.roles().attach([roleAdmin.id]);

    const roleUser = new Role();
    roleUser.name = 'User';
    roleUser.slug = 'user';
    roleUser.description = 'manage user privileges';
    await roleUser.save();

    const user = await User.create({
      username: 'user',
      email: 'user@test.com',
      password: '123'
    });
    await user.roles().attach([roleUser.id]);
  }
}

module.exports = UserSeeder;
