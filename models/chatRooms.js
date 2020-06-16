const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const ChatRoom = sequelize.define('ChatRoom', {
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
        tableName: 'chat_rooms',

    });

    ChatRoom.associate = (models) => {

        ChatRoom.belongsToMany(models.Users, {through: 'users_rooms'});
        ChatRoom.belongsToMany(models.Messages, {through: 'users_rooms_messages'});
    };


    return ChatRoom;
};
