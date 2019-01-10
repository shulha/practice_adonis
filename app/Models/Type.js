const BaseModel = require('./BaseModel');

class Type extends BaseModel {
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
   * @returns {HasMany}
   */
  products() {
    return this.hasMany('App/Models/Product');
  }

  /**
   * @returns {HasMany}
   */
  attributes() {
    return this.hasMany('App/Models/Attribute');
  }
}

module.exports = Type;
