/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AttributeProductAlterColumnTypeSchema extends Schema {
  up() {
    this.table('attribute_product', table => {
      table
        .string('value', 60)
        .notNullable()
        .default('')
        .alter();
    });
  }

  down() {
    this.table('attribute_product', table => {
      table
        .jsonb('value')
        .notNullable()
        .default('{}')
        .alter();
    });
  }
}

module.exports = AttributeProductAlterColumnTypeSchema;
