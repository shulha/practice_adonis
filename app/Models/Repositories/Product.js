const User = use('App/Models/User');

class Product {
  static async showProduct(id) {
    const product = await this.findOrFail(id);
    await product.loadMany(['user', 'type', 'attributes']);

    return product;
  }

  static async createProduct({ userId, name, type, price, attributes }) {
    const user = await User.findOrFail(userId);

    const product = new this();
    product.type_id = type;
    product.name = name;
    product.price = price;
    await user.products().save(product);

    const promises = attributes.map(attribute =>
      product.attributes().attach(attribute.id, row => {
        row.value = attribute.value;
      })
    );
    await Promise.all(promises);
  }

  static async updateProduct({ id, name, type, price, attributes }) {
    const product = await this.findOrFail(id);
    product.merge({ name, type_id: type, price });
    await product.save();

    const promises = attributes.map(attribute =>
      product.attributes().sync(attribute.id, row => {
        row.value = attribute.value;
      })
    );
    await Promise.all(promises);
  }

  // http://127.0.0.1:3333/products?filter[user_id]=2&filter[type_id]=2&filter[name]=veh&field=created_at&order=desc
  static async allProducts(req) {
    const { filter = [], field = 'price', order = 'asc' } = req;
    const page = 1;

    const query = this.query();
    Object.keys(filter).forEach(key => {
      if (key !== 'name') {
        query.where(key, filter[key]);
      } else {
        query.whereRaw(`"name" LIKE '%${filter.name}%'`);
      }
    });

    return query
      .orderBy(field, order)
      .with('user')
      .with('type')
      .paginate(page);
  }
}

module.exports = Product;
