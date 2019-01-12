const Validator = use('Validator');
const Type = use('App/Models/Type');

const existsFn = async (data, field, message, args, get) => {
  const value = get(data, field);
  if (!value) {
    return;
  }

  await Type.findOrFail(value).catch(() => {
    throw message;
  });
};
Validator.extend('exists', existsFn);

const checkFn = async (data, field, message, args, get) => {
  const values = get(data, field);
  if (!values) {
    return;
  }

  const [typeId] = args;
  const type = await Type.findOrFail(typeId);
  const attrIds = await type.attributes().ids();

  const valIds = values.map(val => val.id);

  if (attrIds.length !== valIds.length || !attrIds.every(e => valIds.includes(e))) {
    throw message;
  }
};
Validator.extend('check', checkFn);

class StoreProduct {
  get rules() {
    const { type } = this.ctx.request.all();

    return {
      name: 'required|string|max:50',
      type: 'required|integer|above:1|exists',
      price: 'required|integer|above:0',
      attributes: `required|array|check:${type}`
    };
  }
}

module.exports = StoreProduct;
