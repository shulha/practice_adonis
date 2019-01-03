/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Product = use('App/Models/Product');
const Type = use('App/Models/Type');
const User = use('App/Models/User');

class ProductSeeder {
  async run() {
    await Product.query().delete();

    const user = await User.findByOrFail('username', 'user');
    const pc = await Type.findByOrFail('name', 'pc');
    const { rows: pcItems } = await pc.attributes().fetch();

    const pcAttrs = {};
    for (const attr of pcItems) {
      pcAttrs[attr.name] = attr.id;
    }

    const comp = new Product();
    comp.user_id = user.id;
    comp.type_id = pc.id;
    comp.name = 'computer';
    comp.price = 101;
    await user.products().save(comp);

    await comp.attributes().attach(pcAttrs.HDD, row => {
      row.value = { capacity: '3.75 megabytes' };
    });
    await comp.attributes().attach(pcAttrs.processor, row => {
      row.value = { model: 'intel core i5' };
    });
    await comp.attributes().attach(pcAttrs.RAM, row => {
      row.value = { type: 'DDR SDRAM' };
    });

    const building = await Type.findByOrFail('name', 'building');
    const { rows: buildItems } = await building.attributes().fetch();

    const buildAttrs = {};
    for (const attr of buildItems) {
      buildAttrs[attr.name] = attr.id;
    }

    const myHouse = new Product();
    myHouse.user_id = user.id;
    myHouse.type_id = building.id;
    myHouse.name = 'new house';
    myHouse.price = 2300;
    await user.products().save(myHouse);

    await myHouse.attributes().attach(buildAttrs.floor, row => {
      row.value = { floor: 5 };
    });
    await myHouse.attributes().attach(buildAttrs.square, row => {
      row.value = { square: 350 };
    });

    const admin = await User.findByOrFail('username', 'admin');
    const car = await Type.findByOrFail('name', 'car');
    const { rows: carItems } = await car.attributes().fetch();

    const carAttrs = {};
    for (const attr of carItems) {
      carAttrs[attr.name] = attr.id;
    }

    const auto = new Product();
    auto.user_id = admin.id;
    auto.type_id = car.id;
    auto.name = 'vehicle';
    auto.price = 999;
    await user.products().save(auto);

    await auto.attributes().attach(carAttrs.mark, row => {
      row.value = { mark: 'BMW' };
    });
    await auto.attributes().attach(carAttrs.model, row => {
      row.value = { model: 'X5' };
    });
  }
}

module.exports = ProductSeeder;
