const Type = use('App/Models/Type');

/**
 * Resourceful controller for interacting with types
 */
class TypeController {
  /**
   * Show a list of all types.
   * GET types
   *
   * @returns {Promise<*>}
   */
  async index() {
    return Type.all();
  }

  /**
   * Create/save a new type.
   * POST types
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   *
   * @returns {Promise<*>}
   */
  async store({ request, response }) {
    const { name } = request.all();
    await Type.create({ name });

    return response.status(201).send();
  }

  /**
   * Display a single type.
   * GET types/:id
   *
   * @param {object} ctx
   *
   * @returns {Promise<*>}
   */
  async show({ params }) {
    const { id } = params;
    return Type.findOrFail(id);
  }

  /**
   * Update type details.
   * PUT or PATCH types/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   *
   * @returns {Promise<*>}
   */
  async update({ params, request, response }) {
    const { id } = params;
    const { name } = request.all();
    await Type.updateType(id, name);

    return response.status(200).send();
  }

  /**
   * Delete a type with id.
   * DELETE types/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   *
   * @returns {Promise<*>}
   */
  async destroy({ params, response }) {
    const { id } = params;

    const type = await Type.findOrFail(id);
    await type.delete();

    return response.status(204).send();
  }
}

module.exports = TypeController;
