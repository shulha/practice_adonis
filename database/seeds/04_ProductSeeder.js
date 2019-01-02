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
    const hdd = await pc
      .attributes()
      .where('name', 'HDD')
      .first();
    const proc = await pc
      .attributes()
      .where('name', 'processor')
      .first();

    const comp = new Product();
    comp.user_id = user.id;
    comp.type_id = pc.id;
    comp.name = 'computer';
    comp.price = 101;
    await user.products().save(comp);

    await comp.attributes().attach(hdd.id, row => {
      row.value = { capacity: '3.75 megabytes' };
    });
    await comp.attributes().attach(proc.id, row => {
      row.value = { model: 'intel core i5' };
    });

    const building = await Type.findByOrFail('name', 'building');
    const square = await building
      .attributes()
      .where('name', 'square')
      .first();
    const floor = await building
      .attributes()
      .where('name', 'floor')
      .first();

    const myHouse = new Product();
    myHouse.user_id = user.id;
    myHouse.type_id = building.id;
    myHouse.name = 'new house';
    myHouse.price = 2300;
    await user.products().save(myHouse);

    await myHouse.attributes().attach(floor.id, row => {
      row.value = { floor: 5 };
    });
    await myHouse.attributes().attach(square.id, row => {
      row.value = { square: 350 };
    });

    const admin = await User.findByOrFail('username', 'admin');
    const car = await Type.findByOrFail('name', 'car');
    const mark = await car
      .attributes()
      .where('name', 'mark')
      .first();
    const model = await car
      .attributes()
      .where('name', 'model')
      .first();

    const auto = new Product();
    auto.user_id = admin.id;
    auto.type_id = car.id;
    auto.name = 'vehicle';
    auto.price = 999;
    await user.products().save(auto);

    await auto.attributes().attach(mark.id, row => {
      row.value = { mark: 'BMW' };
    });
    await auto.attributes().attach(model.id, row => {
      row.value = { model: 'X5' };
    });
  }
}

module.exports = ProductSeeder;
