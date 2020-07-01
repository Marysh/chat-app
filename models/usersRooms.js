const Sequelize = require('sequelize');

module.exports = function (sequelize) {

    const UsersRooms = sequelize.define('UsersRooms', {
    }, {timestamps: false, tableName: 'users_rooms'});

    return UsersRooms;
};
