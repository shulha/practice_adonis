/* eslint camelcase: ["error", {ignoreDestructuring: true}] */

const Attribute = use('App/Models/Attribute');
const Type = use('App/Models/Type');
const { validate } = use('Validator');

/**
 * Resourceful controller for interacting with attributes
 */
class AttributeController {
  /**
   * Show a list of type's attributes.
   * GET types/:types_id/attributes
   *
   * @returns {Promise<*>}
   */
  async index({ params }) {
    const { types_id } = params;
    const type = await Type.findOrFail(types_id);

    return type
      .attributes()
      .select('name')
      .fetch();
  }

  /**
   * Create/save a new attribute.
   * POST types/:types_id/attributes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   *
   * @returns {Promise<*>}
   */
  async store({ params, request, response }) {
    const requestAll = request.all();
    const rules = {
      name: 'required'
    };
    const validation = await validate(requestAll, rules);
    if (validation.fails()) {
      return validation.messages();
    }

    const { types_id } = params;
    const { name } = requestAll;
    await Attribute.createAttribute(types_id, name);

    return response.status(201).send();
  }

  /**
   * Display a single attribute.
   * GET types/:types_id/attributes/:id
   *
   * @param {object} ctx

   * @returns {Promise<*>}
   */
  async show({ params }) {
    const { types_id, id } = params;

    return Attribute.getAttributes(types_id, id);
  }

  /**
   * Update attribute details.
   * PUT or PATCH types/:types_id/attributes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   *
   * @returns {Promise<*>}
   */
  async update({ params, request, response }) {
    const requestAll = request.all();
    const rules = {
      name: 'required'
    };
    const validation = await validate(requestAll, rules);
    if (validation.fails()) {
      return validation.messages();
    }

    const { types_id, id } = params;
    const { name } = requestAll;
    await Attribute.updateAttribute(types_id, id, name);

    return response.status(200).send();
  }

  /**
   * Delete a attribute with id.
   * DELETE types/:types_id/attributes/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   *
   * @returns {Promise<*>}
   */
  async destroy({ params, response }) {
    const { types_id, id } = params;
    await Attribute.deleteAttribute(types_id, id);

    return response.status(204).send();
  }
}

module.exports = AttributeController;
