const dbConnection = require('../dbConnection')
const {dbModels} = require('../dbConnection')
const Op = dbModels.Sequelize.Op


    const createUser = async (data)=> {
        try {
            console.log(data)
            const createUserInDB = await dbModels.users.create(data)
            return { isValid: true, data: createUserInDB }
        } catch (err) {
            const errorMessage = `Error In Create User Query`
            console.log(errorMessage, err)
            return { isValid: false, err: errorMessage }
        }

    }
    const findUsers=async (data)=>{
        try {
            const { limit, offset } = getPagination(data.page, data.size);
            const findUsersInDB = await dbModels.users.findAndCountAll({where : {
                [Op.or]: [
                  { fullName: { [ Op.like]: `%${data.searchCondition}%` } },
                  { emailId: { [Op.like]: `%${data.searchCondition}%` } },
                  { mobileNumber: { [Op.like]: `%${data.searchCondition}%` } },
                  { gender: { [Op.like]: `%${data.searchCondition}%` } },
                  { dob: { [Op.like]: `%${data.searchCondition}%` } },
                  { registerDate: { [Op.like]: `%${data.searchCondition}%` } }
                ]
              },limit, offset})
              console.log(findUsersInDB)
              const response = getPagingData(findUsersInDB, data.page, limit);
            return { isValid: true, data: response }
        } catch (err) {
            const errorMessage = `Error In find User Query`
            console.log(errorMessage, err)
            return { isValid: false, err: errorMessage }
        }

    }
    const updateUser=async (data)=>{
        try {
            const updateUsersInDB = await dbModels.users.update({ fullName: data.fullName,
             emailId: data.emailId,
             mobileNumber:data.mobileNumber,
             gender: data.gender,
             dob: data.dob,
            },{where : {
               id:data.id
              }})
              console.log(updateUsersInDB)
            return { isValid: true, data: updateUsersInDB }
        } catch (err) {
            const errorMessage = `Error In update User Query`
            console.log(errorMessage, err)
            return { isValid: false, err: errorMessage }
        }

    }
    const deleteUser = async (data) => {
        try {
            const deleteUserInDB = await dbModels.users.destroy({where:{
                id:data.userId
            }})
            return { isValid: true, data: deleteUserInDB }
        } catch (err) {
            const errorMessage = `Error In delete User Query`
            console.log(errorMessage, err)
            return { isValid: false, err: errorMessage }
        }
    }
    const getPagination = (page, size) => {
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0;
        return { limit, offset };
      };
      const getPagingData = (data, page, limit) => {
        var { count: totalItems, rows: userData } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, data:userData, totalPages, currentPage };
      };

module.exports = {
    createUser,
    findUsers,
    deleteUser,
    updateUser
}
