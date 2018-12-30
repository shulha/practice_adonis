const Type = use('App/Models/Type');

/**
 * Resourceful controller for interacting with types
 */
class TypeController {
  /**
   * Show a list of all types.
   * GET types
   *
   * @returns {Promise<{status: number, products: string[]}>}
   */
  async index() {
    return Type.all();
  }

  /**
   * Create/save a new type.
   * POST types
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   *
   * @returns {Promise<{status: number, product: {id: string, title: string, product_id: string, created_at: string}}>}
   */
  async store({ request }) {
    console.log(request.params);
    return {
      status: 201,
      product: {
        id: 'id',
        title: 'title',
        product_id: 'product_id',
        created_at: 'created_at'
      }
    };
  }

  /**
   * Display a single type.
   * GET types/:id
   *
   * @param {object} ctx
   *
   * @returns {Promise<{status: number, product: {id: *, title: string, type: string, product_id: string, created_at: string}}>}
   */
  async show({ params }) {
    const { id } = params;
    return {
      status: 200,
      product: {
        id,
        title: 'title',
        type: 'type',
        product_id: 'product_id',
        created_at: 'created_at'
      }
    };
  }

  /**
   * Update type details.
   * PUT or PATCH types/:id
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
        product_id: 'product_id',
        created_at: 'created_at'
      }
    };
  }

  /**
   * Delete a type with id.
   * DELETE types/:id
   *
   * @param {object} ctx
   */
  async destroy({ params }) {
    const { id } = params;
    console.log(`Type ${id} has been deleted`);
    return {
      status: 204
    };
  }
}

module.exports = TypeController;
