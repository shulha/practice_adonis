const Type = use('App/Models/Type');

class Attribute {
  static async getAllAttributes(typesId) {
    const type = await Type.findOrFail(typesId);
    const { rows: result } = await type
      .attributes()
      .select('name')
      .fetch();

    return result;
  }

  static async getAttributes(typesId, id) {
    return Type.query()
      .where('id', typesId)
      .with('attributes', builder => {
        builder.where({ id });
      })
      .firstOrFail();
  }

  static async createAttribute(typesId, name) {
    const type = await Type.findOrFail(typesId);
    return type.attributes().create({ name });
  }

  static async updateAttribute(typesId, id, name) {
    const type = await Type.findOrFail(typesId);
    const attribute = await type
      .attributes()
      .where({ id })
      .firstOrFail();
    attribute.name = name;
    await attribute.save();
  }

  static async deleteAttribute(typesId, id) {
    const type = await Type.findOrFail(typesId);
    const attribute = await type
      .attributes()
      .where({ id })
      .first();
    await attribute.delete();
  }
}

module.exports = Attribute;
