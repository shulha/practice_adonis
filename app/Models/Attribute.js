/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Attribute extends Model {
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
