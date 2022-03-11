module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fullName:{
            type:Sequelize.STRING
        },
        emailId:{
            type:Sequelize.STRING,
            allowNull: false
        }, 
        mobileNumber:{
            type:Sequelize.STRING
        },
        gender:{
            type:Sequelize.STRING
        },
        dob:{
            type:Sequelize.DATE
        },
        profileImage:{
            type:Sequelize.STRING
        },
        registerDate:{
            type:Sequelize.DATE
        }
    });
    return Users;
};
