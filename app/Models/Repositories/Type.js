class Type {
  static async createType(name) {
    const type = new this();
    type.name = name;
    await type.save();
  }

  static async updateType(id, name) {
    const type = await this.findOrFail(id);
    type.name = name;
    await type.save();
  }
}

module.exports = Type;
