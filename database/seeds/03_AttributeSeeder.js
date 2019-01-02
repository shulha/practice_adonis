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

    const pcAttributes = [{ name: 'HDD' }, { name: 'processor' }, { name: 'RAM' }];
    const pcType = await Type.findByOrFail('name', 'pc');
    await pcType.attributes().createMany(pcAttributes);

    const carAttributes = [{ name: 'mark' }, { name: 'model' }];
    const carType = await Type.findByOrFail('name', 'car');
    await carType.attributes().createMany(carAttributes);

    const buildingAttributes = [{ name: 'square' }, { name: 'floor' }];
    const buildingType = await Type.findByOrFail('name', 'building');
    await buildingType.attributes().createMany(buildingAttributes);
  }
}

module.exports = AttributeSeeder;
