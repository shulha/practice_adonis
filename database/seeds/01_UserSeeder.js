/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory');
const User = use('App/Models/User');

class UserSeeder {
  async run() {
    await User.query().delete();

    await Factory.model('App/Models/User').createMany(5);
  }
}

module.exports = UserSeeder;
