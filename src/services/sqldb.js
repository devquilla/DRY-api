import Sequelize from 'sequelize'
import { sequelize } from '../config'

let db = {
   Sequelize,
   sequelize: new Sequelize(sequelize.database, sequelize.username, sequelize.password, sequelize.options)
};

// Insert models below

module.exports = db;
