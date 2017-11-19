module.exports = function (sequelize, DataTypes) {

    var Photo = sequelize.define("Photo", {
        id: {
            // type: DataTypes.INTEGER,
            type: DataTypes.STRING,
            primaryKey: true,
            // autoIncrement: true,
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
        tags: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Photo.associate = function (models) {

        Photo.belongsToMany(models.User, {
            as: 'lovers',
            through: 'photo_lover',
            foreignKey: 'photoId',
            otherKey: 'loverId'
        });
        // use author as alias for User
        // add User.id named authorId as foreign key to Photo
        Photo.belongsTo(models.User, {as: 'author', foreignKey: 'authorId'});
        Photo.belongsTo(models.Post, {as: 'post', foreignKey: 'postId'});
    };

    return Photo;
};