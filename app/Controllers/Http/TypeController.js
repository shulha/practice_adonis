class TypeController {
  /**
   * Get all types
   *
   * @returns {Promise<{status: number, products: string[]}>}
   */
  async index() {
    return {
      status: 200,
      products: ['type1', 'type2']
    };
  }

  /**
   * Create type of products
   *
   * @returns {Promise<{status: number, product: {id: string, title: string, product_id: string, created_at: string}}>}
   */
  async store() {
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
   * Show one type
   *
   * @param request
   * @returns {Promise<{status: number, product: {id: *, title: string, type: string, product_id: string, created_at: string}}>}
   */
  async show(request) {
    return {
      status: 200,
      product: {
        id: request.params.id,
        title: 'title',
        type: 'type',
        product_id: 'product_id',
        created_at: 'created_at'
      }
    };
  }

  /**
   * Edit type
   *
   * @param request
   * @returns {Promise<{status: number, product: {id: *, title: string, type: string, product_id: string, created_at: string}}>}
   */
  async update(request) {
    return {
      status: 200,
      product: {
        id: request.params.id,
        title: 'updated-title',
        type: 'type',
        product_id: 'product_id',
        created_at: 'created_at'
      }
    };
  }

  /**
   * Delete type
   *
   * @param request
   * @returns {Promise<{status: number}>}
   */
  async destroy(request) {
    const { id } = request.params;
    console.log(`Type ${id} has been deleted`);
    return {
      status: 204
    };
  }
}

module.exports = TypeController;
