import { DataTypes } from 'sequelize'

export function up ({ context: sequelize }) {
  return sequelize.getQueryInterface().createTable('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
    }
  })
}

export function down ({ context: sequelize }) {
  return sequelize.getQueryInterface().dropTable('user')
}
