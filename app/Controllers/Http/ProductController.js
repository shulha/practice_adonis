class ProductController {
  async index() {
    return {
      status: 200,
      products: ['product1', 'product2']
    };
  }

  async store() {
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

  async show(request) {
    return {
      status: 200,
      product: {
        id: request.params.id,
        title: 'title',
        type: 'type',
        price: 'price',
        created_at: 'created_at'
      }
    };
  }

  async update(request) {
    return {
      status: 200,
      product: {
        id: request.params.id,
        title: 'updated-title',
        type: 'type',
        price: 'price',
        created_at: 'created_at'
      }
    };
  }

  async destroy(request) {
    const { id } = request.params;
    console.log(`Product ${id} has been deleted`);
    return {
      status: 204
    };
  }
}

module.exports = ProductController;
