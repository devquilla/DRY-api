import http from 'http'
import { env, port, ip, apiRoot } from './config'
import express from './services/express'
import sqldb from "./services/sqldb";
import seedDatabaseIfNeeded from "./services/seed";
import api from './api'

const app = express(apiRoot, api)

const server = http.createServer(app)

function startServer() {
   server.listen(port, ip, () => {
      console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
   })
}

sqldb.sequelize.sync()
   .then(seedDatabaseIfNeeded)
   .then(startServer)
   .catch(err => {
      console.log('Server failed to start due to error: %s', err);
   });

export default app
