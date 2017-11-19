module.exports = function (sequelize, DataTypes) {

    var Post = sequelize.define("Post", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Post.associate = function (models) {
        // use author as alias for User
        // add User.id named authorId as foreign key to Photo
        Post.belongsTo(models.User, {as: 'author', foreignKey: 'authorId'});
        Post.hasMany(models.Photo, {as: 'photos', foreignKey: 'postId'});
    };

    return Post;
};