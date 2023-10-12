exports.seed = async function (knex) {
    await knex('users').truncate()
    await knex('users').insert([
      {
        username: 'Easton',
        password: '1234',
      },
      {
        username: 'Bri',
        password: '2222',
      },
      {
        username: 'Dan',
        password: '3333',
      },
    ])
  }