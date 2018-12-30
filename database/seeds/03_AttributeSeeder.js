/*
|--------------------------------------------------------------------------
| AttributeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Attribute = use('App/Models/Attribute');
const Type = use('App/Models/Type');

class AttributeSeeder {
  async run() {
    await Attribute.query().delete();

    const attributes = [{ name: 'diagonal' }, { name: 'processor' }, { name: 'RAM' }];
    const type = await Type.findByOrFail('name', 'PC');
    await type.attributes().createMany(attributes);
  }
}

module.exports = AttributeSeeder;
