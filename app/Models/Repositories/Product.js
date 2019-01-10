const User = use('App/Models/User');

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
}

module.exports = Product;
