/*
|--------------------------------------------------------------------------
| TypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Type = use('App/Models/Type');

class TypeSeeder {
  async run() {
    await Type.query().delete();

    const types = [{ name: 'pc' }, { name: 'car' }, { name: 'building' }];
    await Type.createMany(types);
  }
}

module.exports = TypeSeeder;
