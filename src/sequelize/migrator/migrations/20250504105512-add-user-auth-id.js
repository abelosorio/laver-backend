import { DataTypes } from 'sequelize'

export function up ({ context: sequelize }) {
  return sequelize.getQueryInterface().createTable('user_auth_id', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      field: 'user_id',
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    authId: {
      field: 'auth_id',
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
  return sequelize.getQueryInterface().dropTable('user_auth_id')
}
