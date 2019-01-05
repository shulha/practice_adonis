const User = use('App/Models/User');

class Product {
  static async showProduct(id) {
    const product = await this.findOrFail(id);
    const type = await product.type().fetch();
    const { rows: attributes } = await product
      .attributes()
      .select('name')
      .fetch();

    return {
      name: product.name,
      type: type.name,
      price: product.price,
      created_at: product.created_at,
      attributes
    };
  }

  static async createProduct({ userId, name, type, price, attributes }) {
    const user = await User.findOrFail(userId);

    const product = new this();
    product.user_id = userId;
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

  static async updateProduct({ product, name, type, price, attributes }) {
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
