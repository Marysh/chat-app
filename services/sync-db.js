const db = require("../models/index");
module.exports.syncDb = () => {
    let seeders = [{
        model: 'Users',
        data: [
            {name: 'Peter'},
            {name: 'Andrew'},
        ]
    }, {
        model: 'ChatRoom',
        data: [
            {name: 'Main'},
        ]
    }];

    db.sequelize.sync({alter: true})
        .then((res) => {
            seeders.forEach((seeder) => {
                seeder.data.forEach(async row => {
                    let rowExist = await db[seeder.model].findByPk(row.id);
                    if (!rowExist) db[seeder.model].create(row);
                });
            });
            return res;
        })
};
