const Product = use('App/Models/Product');

class CheckUser {
  /**
   * @param auth
   * @param params
   * @param next
   * @returns {Promise<*>}
   */
  async handle({ auth, params }, next) {
    const { id } = params;

    const product = await Product.findOrFail(id);
    const user = await product.user().fetch();

    if (auth.user.id !== user.id) {
      throw new Error('permission denied');
    }
    await next();
  }
}

module.exports = CheckUser;
