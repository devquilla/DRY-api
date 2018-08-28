/* eslint-disable no-unused-vars */
import path from 'path'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
   if (!process.env[name]) {
      throw new Error('You must set the ' + name + ' environment variable')
   }
   return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
   const dotenv = require('dotenv-safe')
   dotenv.load({
      path: path.join(__dirname, '../.env'),
      sample: path.join(__dirname, '../.env.example')
   })
}

const postgres = 'postgres'
const HOST = postgres,
   DIALECT = postgres,
   USERNAME = postgres

const config = {
   all: {
      root: path.join(__dirname, '..'),
      env: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 9000,
      ip: process.env.IP || '0.0.0.0',
      apiRoot: process.env.API_ROOT || '/api',

      // Should we populate the DB with sample data?
      seedDB: false,
   },

   test: {
      sequelize: {
         database: 'test_db',
         username: USERNAME,
         password: '',
         options: {
            host: HOST,
            dialect: DIALECT,
            operatorsAliases: false,
         }
      },
   },

   development: {
      sequelize: {
         database: 'dev_db',
         username: USERNAME,
         password: '',
         options: {
            host: HOST,
            dialect: DIALECT,
            operatorsAliases: false,
         }
      },

      // Seed database on startup
      seedDB: true,
   },

   production: {
      ip: process.env.IP || undefined,
      port: process.env.PORT || 8080,

      // Sequelize connection options
      sequelize: {
         database: process.env.DB_NAME || 'localhost',
         username: process.env.DB_USER,
         password: process.env.DB_PASS,
         options: {
            host: process.env.DB_HOST || HOST,
            dialect: DIALECT,
            operatorsAliases: false,
         }
      },
   }

}

module.exports = Object.assign(config.all, config[config.all.env])
export default module.exports
