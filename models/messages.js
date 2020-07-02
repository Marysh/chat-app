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
            allowNull: false
        },
        text: {
            type: Sequelize.CHAR,
            allowNull: false
        },
    }, {
        tableName: 'messages',

    });

    Messages.associate = (models) => {
        Messages.belongsTo(models.Users, {foreignKey: 'userId'});
        Messages.belongsTo(models.ChatRoom, {foreignKey: 'chatId'});
    };


    return Messages;
};
