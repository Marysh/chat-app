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
        },
        ownerId: {
            type: Sequelize.INTEGER
        }
    }, {
        // timestamps: true,
        tableName: 'chat_rooms',

    });

    ChatRoom.associate = (models) => {
        ChatRoom.belongsToMany(models.Users, {through: 'users_rooms'});
    };

    return ChatRoom;
};
