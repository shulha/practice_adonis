class AttributeController {
  /**
   * Get all attributes
   *
   * @returns {Promise<{status: number, products: string[]}>}
   */
  async index() {
    return {
      status: 200,
      products: ['attribute1', 'attribute2']
    };
  }

  /**
   * Create attribute of type
   *
   * @returns {Promise<{status: number, product: {id: string, title: string, value: string, type_id: string, created_at: string}}>}
   */
  async store() {
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
   * Show one attribute
   *
   * @param request
   * @returns {Promise<{status: number, product: {id: *, title: string, value: string, type_id: string, created_at: string}}>}
   */
  async show(request) {
    return {
      status: 200,
      product: {
        id: request.params.id,
        title: 'title',
        value: 'value',
        type_id: 'type_id',
        created_at: 'created_at'
      }
    };
  }

  /**
   * Edit attribute
   *
   * @param request
   * @returns {Promise<{status: number, product: {id: *, title: string, value: string, type_id: string, created_at: string}}>}
   */
  async update(request) {
    return {
      status: 200,
      product: {
        id: request.params.id,
        title: 'updated-title',
        value: 'value',
        type_id: 'type_id',
        created_at: 'created_at'
      }
    };
  }

  /**
   * Delete attribute
   *
   * @param request
   * @returns {Promise<{status: number}>}
   */
  async destroy(request) {
    const { id } = request.params;
    console.log(`Attribute ${id} has been deleted`);
    return {
      status: 204
    };
  }
}

module.exports = AttributeController;
