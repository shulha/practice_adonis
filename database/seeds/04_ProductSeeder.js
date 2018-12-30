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

    const user = await User.firstOrFail();
    const type = await Type.findByOrFail('name', 'PC');

    const product = new Product();
    product.user_id = user.id;
    product.type_id = type.id;
    product.name = 'Computer';
    product.price = 101;
    await user.products().save(product);

    await product.attributes().create({ name: 'HDD', type_id: type.id }, row => {
      row.value = { capacity: '3.75 megabytes', weight: '2,000 pounds' };
    });
  }
}

module.exports = ProductSeeder;
