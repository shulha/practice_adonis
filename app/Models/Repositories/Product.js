const User = use('App/Models/User');
const Type = use('App/Models/Type');

class Product {
  static async showProduct(id) {
    const product = await this.findOrFail(id);
    await product.load('type');
    await product.load('attributes');

    return product.toJSON();
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

  static async allPoducts(query) {
    if (!query) {
      return this.all();
    }

    let col = 'price';
    let direct = 'asc';
    if (query.price) {
      direct = query.price;
    } else if (query.date) {
      col = 'created_at';
      direct = query.date;
    }

    let res = [];
    if (query.type) {
      const subquery = await Type.query()
        .whereRaw(`"name" LIKE '%${query.type}%'`)
        .ids();
      const { rows: results } = await this.query()
        .whereRaw(`"name" LIKE '%${query.name}%'`)
        .whereIn('type_id', subquery)
        .orderBy(col, direct)
        .fetch();
      res = results;
    } else {
      const { rows: results } = await this.query()
        .whereRaw(`"name" LIKE '%${query.name}%'`)
        .orderBy(col, direct)
        .fetch();
      res = results;
    }
    return res;
  }
}

module.exports = Product;
