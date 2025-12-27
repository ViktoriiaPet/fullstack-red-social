import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const Locations = sequelize.define(
    "Locations",
    {
      idLocation: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      description: { type: DataTypes.STRING(255) },
      locationMaps: { type: DataTypes.STRING(255), allowNull: false },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      deleted_at: { type: DataTypes.DATE },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "Locations",
      timestamps: false,
    }
  );

  return Locations;
};
