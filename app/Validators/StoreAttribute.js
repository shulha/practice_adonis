/* eslint camelcase: ["error", {ignoreDestructuring: true}] */
const Validator = use('Validator');
const Type = use('App/Models/Type');

const typeFn = async (data, field, message, args, get) => {
  const value = get(data, field);
  if (!value) {
    return;
  }

  const [typeId] = args;
  const type = await Type.findOrFail(typeId);
  const attrs = await type
    .attributes()
    .select('name')
    .fetch();

  const result = attrs.toJSON().filter(row => row.name === value);

  if (result.length > 0) {
    throw message;
  }
};
Validator.extend('type', typeFn);

class StoreAttribute {
  get rules() {
    const { types_id } = this.ctx.params;

    return {
      name: `required|max:50|type:${types_id}`// eslint-disable-line
    };
  }
}

module.exports = StoreAttribute;
