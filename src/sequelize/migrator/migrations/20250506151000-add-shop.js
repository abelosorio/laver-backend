import { DataTypes } from 'sequelize'

export function up ({ context: sequelize }) {
  return sequelize.getQueryInterface().createTable('shop', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicture: {
      field: 'profile_picture',
      type: DataTypes.STRING,
      allowNull: false
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
  return sequelize.getQueryInterface().dropTable('shop')
}
