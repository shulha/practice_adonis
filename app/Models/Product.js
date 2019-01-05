/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  static boot() {
    super.boot();
    this.addTrait('App/Models/Traits/Repository');
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
