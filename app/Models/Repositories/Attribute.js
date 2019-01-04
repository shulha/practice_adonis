const Type = use('App/Models/Type');

class Attribute {
  static async getAllAttributes(typesId) {
    const { rows: result } = await this.query()
      .where('type_id', typesId)
      .select('name')
      .fetch();

    return result;
  }

  static async getAttributes(typesId, id) {
    const { rows: result } = await this.query()
      .join('types as t', 't.id', 'attributes.type_id')
      .where('attributes.id', id)
      .where('type_id', typesId)
      .select({ type: 't.name' }, { attribute: 'attributes.name' })
      .fetch();

    return result.pop();
  }

  static async createAttribute(typesId, name) {
    const type = await Type.findOrFail(typesId);
    await type.attributes().create({ name });
  }

  static async updateAttribute(typesId, id, name) {
    const type = await Type.findOrFail(typesId);
    const attribute = await type
      .attributes()
      .where({ id })
      .first();
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
