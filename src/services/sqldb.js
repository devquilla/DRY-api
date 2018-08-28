import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import { sequelize } from '../config'

const database = new Sequelize(sequelize.database, sequelize.username, sequelize.password, sequelize.options)
let db = {}

const apiDir = path.normalize(`${__dirname}/../api`)
const files = []
debugger;
// loop through all files in api directory.
const sortDir = (maniDir) => {
   const folders = []
   const CheckFile = filePath => (fs.statSync(filePath).isFile())
   const sortPath = (dir) => {
      fs
         .readdirSync(dir)
         .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
         .forEach((res) => {
            const filePath = path.join(dir, res)

            const isModelFile = (res.toString() === 'model.js')
            if (CheckFile(filePath)) {
               if (isModelFile) files.push(filePath)
            } else {
               folders.push(filePath)
            }
         })
   }
   folders.push(maniDir)
   let i = 0
   do {
      sortPath(folders[i])
      i += 1
   } while (i < folders.length)
}
sortDir(apiDir)
// import model files and save model names
files
   .forEach((file) => {
      console.info(`Loading model file ${file}`);
      const model = database.import(file);
      db[model.name] = model;
   });

// calling all the associate function, in order to make the association between the models
Object.keys(db).forEach((modelName) => {
   if (db[modelName].associate) {
      db[modelName].associate(db);
   }
})

db.sequelize = database;
db.Sequelize = Sequelize;

module.exports = db
