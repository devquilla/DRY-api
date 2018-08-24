/**
 * Populate DB with sample data on server start
 * to disable, edit ../config, and set `seedDB: false`
 */

import sqldb from './sqldb'
import { seedDB } from '../config'

export default function seedDatabaseIfNeeded() {
   if (!seedDB) return Promise.resolve()

   let promises = []

   return Promise.all(promises)

}
