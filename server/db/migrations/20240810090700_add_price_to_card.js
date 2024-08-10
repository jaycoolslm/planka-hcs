module.exports.up = async (knex) => {
  return knex.schema.table('card', (table) => {
    table.string('price');
  });
};

module.exports.down = (knex) => {
  return knex.schema.table('card', (table) => {
    table.dropColumn('price');
  });
};
