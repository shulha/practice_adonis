/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UsersAlterSchema extends Schema {
  up() {
    this.table('users', table => {
      table
        .string('email', 254)
        .notNullable()
        .unique();
      table.string('password', 60).notNullable();
    });
  }

  down() {}
}

module.exports = UsersAlterSchema;
