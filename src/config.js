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

const config = {
   all: {
      root: path.join(__dirname, '..'),
      env: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 9000,
      ip: process.env.IP || '0.0.0.0',
      apiRoot: process.env.API_ROOT || '/api',
   },
   test: {

   },
   development: {

   },
   production: {
      ip: process.env.IP || undefined,
      port: process.env.PORT || 8080,
   }
}

module.exports = Object.assign(config.all, config[config.all.env])
export default module.exports