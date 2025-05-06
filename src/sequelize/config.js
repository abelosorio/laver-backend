import * as constants from '~/constants.js'

export default function getConfig () {

  return {
    database: constants.DB_NAME,
    username: constants.DB_USER,
    password: constants.DB_PASSWORD,
    host: constants.DB_HOST,
    port: constants.DB_PORT,
    dialect: constants.DB_DIALECT,
    define: {
      underscored: true, // snake_cased column names
      freezeTableName: true // singular table names
    },
    logging: (sql) => {
      if (!constants.IS_PRODUCTION) console.log(sql)
    }
  }
}
