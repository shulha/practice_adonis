/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AttributeSchema extends Schema {
  up() {
    this.create('attributes', table => {
      table.increments();
      table.string('name', 50).notNullable();
      table
        .integer('type_id')
        .unsigned()
        .notNullable()
        .index();

      table
        .foreign('type_id')
        .references('id')
        .on('types')
        .onDelete('cascade');
    });

    this.create('attribute_product', table => {
      table.increments();
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .index();
      table
        .integer('attribute_id')
        .unsigned()
        .notNullable()
        .index();
      table
        .jsonb('value')
        .notNullable()
        .default('{}');

      table
        .foreign('product_id')
        .references('id')
        .on('products')
        .onDelete('cascade');
      table
        .foreign('attribute_id')
        .references('id')
        .on('attributes')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('attribute_product');
    this.drop('attributes');
  }
}

module.exports = AttributeSchema;
