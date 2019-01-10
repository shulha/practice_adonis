class Type {
  static async updateType(id, name) {
    const type = await this.findOrFail(id);
    type.name = name;
    await type.save();
  }
}

module.exports = Type;
