const Validator = use('Validator');
const Type = use('App/Models/Type');

const existsFn = async (data, field, message, args, get) => {
  const value = get(data, field);
  if (!value) {
    return;
  }

  const typeIds = await Type.ids();

  if (!typeIds.includes(value)) {
    throw message;
  }
};
Validator.extend('exists', existsFn);

const checkFn = async (data, field, message, args, get) => {
  const values = get(data, field);
  if (!values) {
    return;
  }

  const [typeId] = args;
  const type = await Type.findOrFail(typeId);
  const typeCount = await type.attributes().getCount();

  if (parseInt(typeCount, 10) !== values.length) {
    throw message;
  }

  const attrIds = await type.attributes().ids();
  for (const val of values) {
    if (!attrIds.includes(val.id)) {
      throw message;
    }
  }
};
Validator.extend('check', checkFn);

class StoreProduct {
  // TODO authorize ()
  get rules() {
    const { type } = this.ctx.request.all();

    return {
      name: 'required|string',
      type: 'required|integer|exists',
      price: 'required|integer',
      attributes: `required|array|check:${type}`
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = StoreProduct;
