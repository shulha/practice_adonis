const Product = use('App/Models/Product');

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   */
  async index() {
    return Product.all();
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   *
   * @returns {Promise<*>}
   */
  async store({ request, response }) {
    const { name, type, price, attributes } = request.all();

    const userId = 2; // TODO auth

    await Product.createProduct({ userId, name, type, price, attributes });

    return response.status(201).send();
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   *
   * @returns {Promise<*>}
   */
  async show({ params }) {
    const { id } = params;

    return Product.showProduct(id);
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   *
   * @returns {Promise<*>}
   */
  async update({ params, request, response }) {
    const { id } = params;
    const { name, type, price, attributes } = request.all();
    await Product.updateProduct({ id, name, type, price, attributes });

    return response.status(200).send();
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   *
   * @returns {Promise<*>}
   */
  async destroy({ params, response }) {
    const { id } = params;

    const product = await Product.findOrFail(id);
    await product.delete();

    return response.status(204).send();
  }
}

module.exports = ProductController;
