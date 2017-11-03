module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            // validate: {
            //     isEmail: false
            // }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            // validate: {
            //     isEmail: true
            // }
        }
    });

    // User.associate = function(models) {
    //
    // };

    return User;
};