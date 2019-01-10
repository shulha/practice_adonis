const BaseModel = require('./BaseModel');

class Attribute extends BaseModel {
  /**
   * Disable the created at time stamp.
   *
   * @returns {null}
   */
  static get createdAtColumn() {
    return null;
  }

  /**
   * Disable the updated at time stamp.
   *
   * @returns {null}
   */
  static get updatedAtColumn() {
    return null;
  }

  /**
   * @returns {BelongsTo}
   */
  type() {
    return this.belongsTo('App/Models/Type');
  }
}

module.exports = Attribute;
