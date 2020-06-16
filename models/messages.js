const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const Messages = sequelize.define('Messages', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        text: {
            type: Sequelize.CHAR,
            allowNull: false
        }
    }, {
        tableName: 'messages',

    });

    Messages.associate = (models) => {
        Messages.belongsToMany(models.ChatRoom, {through: 'users_rooms_messages'});
    };


    return Messages;
};
