const BaseModel = require('./BaseModel');

class Product extends BaseModel {
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
  user() {
    return this.belongsTo('App/Models/User');
  }

  /**
   * @returns {BelongsTo}
   */
  type() {
    return this.belongsTo('App/Models/Type');
  }

  /**
   * @returns {BelongsToMany}
   */
  attributes() {
    return this.belongsToMany('App/Models/Attribute').withPivot(['value']);
  }
}

module.exports = Product;
