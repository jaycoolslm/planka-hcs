module.exports.up = async (knex) => {
  return knex.schema.table('user_account', (table) => {
    table.string('hederaAccount');
  });
};

module.exports.down = (knex) => {
  return knex.schema.table('user_account', (table) => {
    table.dropColumn('hederaAccount');
  });
};
