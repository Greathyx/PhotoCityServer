module.exports = function (sequelize, DataTypes) {

    var Tag = sequelize.define("Tag", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }
    });

    Tag.associate = function (models) {
        Tag.belongsToMany(models.Photo, {
            as: 'photos',
            through: 'photo_tag',
            foreignKey: 'tagId',
            otherKey: 'photoId'
        });
    };

    return Tag;
};