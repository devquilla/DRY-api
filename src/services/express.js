import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../config'

export default (apiRoot, routes) => {
   const app = express()

   /* istanbul ignore next */
   if (env === 'production' || env === 'development') {
      app.use(cors())
      app.use(helmet())
      app.use(compression())
      app.use(morgan('dev'))
   }

   app.use(bodyParser.urlencoded({ extended: false }))
   app.use(bodyParser.json())
   app.use(apiRoot, routes)
   app.use(bodyErrorHandler())

   return app
}
