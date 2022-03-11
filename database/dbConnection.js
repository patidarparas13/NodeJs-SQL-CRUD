const Sequelize = require('sequelize')
const dbModels = {}

const connectWithDB = async () => {
    try {
        const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
            host: process.env.HOST,
            port: process.env.PORT,
            dialect: 'mysql',
            operatorAliases: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }

        })
        dbModels.Sequelize = Sequelize;
        dbModels.sequelize = sequelize;
        await sequelize.authenticate().then(() => console.log(`My SQL Connected`))
        dbModels.users = await require("./models/users")(sequelize, Sequelize);
        // await dbModels.sequelize.sync({ }).then(() => {
        //     console.log("Drop and re-sync db.");
        //   });
        return { isValid: true, cursor: dbModels }
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = {
    connectWithDB,
    dbModels
}
