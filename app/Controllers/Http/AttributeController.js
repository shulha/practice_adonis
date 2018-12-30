const Attribute = use('App/Models/Attribute');

/**
 * Resourceful controller for interacting with attributes
 */
class AttributeController {
  /**
   * Show a list of all attributes.
   * GET attributes
   *
   * @returns {Promise<{status: number, products: string[]}>}
   */
  async index() {
    return Attribute.all();
  }

  /**
   * Create/save a new attribute.
   * POST attributes
   *
   * @param {object} ctx
   *
   * @returns {Promise<{status: number, product: {id: string, title: string, value: string, type_id: string, created_at: string}}>}
   */
  async store({ request }) {
    console.log(request.params);
    return {
      status: 201,
      product: {
        id: 'id',
        title: 'title',
        value: 'value',
        type_id: 'type_id',
        created_at: 'created_at'
      }
    };
  }

  /**
   * Display a single attribute.
   * GET attributes/:id
   *
   * @param {object} ctx

   * @returns {Promise<{status: number, product: {id: *, title: string, value: string, type_id: string, created_at: string}}>}
   */
  async show({ params }) {
    const { id } = params;
    return {
      status: 200,
      product: {
        id,
        title: 'title',
        value: 'value',
        type_id: 'type_id',
        created_at: 'created_at'
      }
    };
  }

  /**
   * Update attribute details.
   * PUT or PATCH attributes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   *
   * @returns {Promise<{status: number, product: {id: *, title: string, value: string, type_id: string, created_at: string}}>}
   */
  async update({ params, request }) {
    const { id } = params;
    console.log(request.params);
    return {
      status: 200,
      product: {
        id,
        title: 'updated-title',
        value: 'value',
        type_id: 'type_id',
        created_at: 'created_at'
      }
    };
  }

  /**
   * Delete a attribute with id.
   * DELETE attributes/:id
   *
   * @param {object} ctx
   *
   * @returns {Promise<{status: number}>}
   */
  async destroy({ params }) {
    const { id } = params;
    console.log(`Attribute ${id} has been deleted`);
    return {
      status: 204
    };
  }
}

module.exports = AttributeController;
