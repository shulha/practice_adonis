/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductSchema extends Schema {
  up() {
    this.create('types', table => {
      table.increments();
      table.string('name', 50).notNullable();
    });

    this.create('products', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .index();
      table
        .integer('type_id')
        .unsigned()
        .notNullable()
        .index();
      table.string('name', 50).notNullable();
      table
        .integer('price')
        .notNullable()
        .default(0);
      table.timestamp('created_at').defaultTo(this.fn.now());

      table
        .foreign('user_id')
        .references('id')
        .on('users')
        .onDelete('cascade');
      table
        .foreign('type_id')
        .references('id')
        .on('types')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('products');
    this.drop('types');
  }
}

module.exports = ProductSchema;
