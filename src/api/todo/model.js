export default function (sequelize, DataTypes) {
   return sequelize.define('Todo', {
      _id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      name: DataTypes.STRING,
      info: DataTypes.STRING,
      desc: DataTypes.STRING,
      active: DataTypes.BOOLEAN
   });
}
