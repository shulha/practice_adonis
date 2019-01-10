/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class BaseModel extends Model {
  static boot() {
    super.boot();
    this.addTrait('App/Models/Traits/Repository');
  }
}

module.exports = BaseModel;
