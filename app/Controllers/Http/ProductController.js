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
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store({ request }) {
    console.log(request.params);
    return {
      status: 201,
      product: {
        id: 'id',
        title: 'title',
        type: 'type',
        price: 'price',
        created_at: 'created_at'
      }
    };
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    const { id } = params;
    return {
      status: 200,
      product: {
        id,
        title: 'title',
        type: 'type',
        price: 'price',
        created_at: 'created_at'
      }
    };
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update({ params, request }) {
    const { id } = params;
    console.log(request.params);
    return {
      status: 200,
      product: {
        id,
        title: 'updated-title',
        type: 'type',
        price: 'price',
        created_at: 'created_at'
      }
    };
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   */
  async destroy({ params }) {
    const { id } = params;
    console.log(`Product ${id} has been deleted`);
    return {
      status: 204
    };
  }
}

module.exports = ProductController;
