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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }
    });

    User.associate = function (models) {
        User.belongsToMany(models.User, {
            as: 'following',
            through: 'follow_relations',
            foreignKey: 'followerId',
            otherKey: 'followingId'
        });
        User.belongsToMany(models.User, {
            as: 'follower',
            through: 'follow_relations',
            foreignKey: 'followingId',
            otherKey: 'followerId'
        });
        // add User.id named authorId as foreign key to Photo
        User.hasMany(models.Photo, {as: 'photos', foreignKey: 'authorId'});
        User.hasMany(models.Photo, {as: 'likedPhotos', foreignKey: 'loverId'});
    };

    return User;
};