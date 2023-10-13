exports.seed = async function (knex) {
    await knex('users').truncate()
    await knex('users').insert([
      {
        username: 'Easton',
        password: '$2a$08$CvpHYKUsiDdQSdQSCg5oV.jM2hMR3IJHIZGPh7PrzAquybMxPU0r6',
      },
      {
        username: 'Bri',
        password: '$2a$08$2kQMzbEjr6Hg.7Qb80gr3eKH5rsAmLRnO83V1bHOM4QJrx4jj.1jG',
      },
      {
        username: 'Dan',
        password: '$2a$08$YemLy9L6AqZc652CC46Uuu1StKrYKIBZOQz2qpsPjfiPtU7zH56Y.',
      },
    ])
  }