import Sequelize from 'sequelize'
import { sequelize } from '../config'

let db = {
   Sequelize,
   sequelize: new Sequelize(sequelize.uri, sequelize.options)
};

// Insert models below

module.exports = db;
