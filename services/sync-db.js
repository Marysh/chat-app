const db = require("../models/index");
module.exports.syncDb = () => {
    let seeders = [{
        model: 'Users',
        data: [
            {id: 1, name: 'Peter'},
            {id: 2, name: 'Andrew'},
            {id: 3, name: 'Kate'},
            {id: 4, name: 'Ras'},
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
