const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const Users = sequelize.define('Users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.CHAR,
            allowNull: false
        }
    }, {
        // timestamps: true,
        tableName: 'users'
    });

    Users.associate = models => {
        Users.belongsToMany(models.ChatRoom, {through: 'users_rooms'});
        Users.hasMany(models.Messages, { foreignKey: 'userId' });

    };

    return Users;
};

