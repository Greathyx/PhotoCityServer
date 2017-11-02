module.exports = function (sequelize, DataTypes) {

    var Photo = sequelize.define("Photo", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        origin: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        liked_times: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        sImg: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        bImg: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    });

    // Photo.associate = function(models) {
    //
    // };

    return Photo;
};