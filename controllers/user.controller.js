const UserQueries = require('../database/queries/userQueries')

const createUserController = async (req,res,next) =>{
    try{
        const {fullName,emailId,mobileNumber,gender,dob,profileImage} = req.body
        const registerDate = new Date().toISOString()
        const createUserInDB =await UserQueries.createUser({fullName,emailId,mobileNumber,gender,dob,profileImage,registerDate})
        if(!createUserInDB.isValid){
            return res.status(500).send({isValid:false,message:"Something Went Wrong!"})
        }
        return res.status(200).send({isValid:true,message:"User Created Successfully",data:createUserInDB.data})

    }catch(err){
        console.log(err)
        return res.status(500).send({isValid:false,message:"Something Went Wrong!"})
    }
}
const findUsersController = async (req,res,next) =>{
    try{
        const {searchCondition,page,size} = req.body
        const findUsersInDB =await UserQueries.findUsers({searchCondition,page,size})
        if(!findUsersInDB.isValid){
            return res.status(500).send({isValid:false,message:"Something Went Wrong!"})
        }
        return res.status(200).send({isValid:true,message:"User Fetched Successfully",data:findUsersInDB.data})

    }catch(err){
        console.log(err)
        return res.status(500).send({isValid:false,message:"Something Went Wrong!"})
    }
}
const updateUserController = async (req,res,next) =>{
    try{
        const {id,fullName,emailId,mobileNumber,gender,dob,profileImage} = req.body
        const updateUserInDB =await UserQueries.updateUser({id,fullName,emailId,mobileNumber,gender,dob,profileImage})
        if(!updateUserInDB.isValid){
            return res.status(500).send({isValid:false,message:"Something Went Wrong!"})
        }
        return res.status(200).send({isValid:true,message:"User Fetched Successfully",data:updateUserInDB.data})
    }catch(err){
        return res.status(500).send({isValid:false,message:"Something Went Wrong!"})
    }
}
const deleteUserController = async (req,res,next) =>{
    try{
        const {userId} = req.body
        const deleteUserInDB =await UserQueries.deleteUser({userId})
        if(!deleteUserInDB.isValid){
            return res.status(500).send({isValid:false,message:"Something Went Wrong!"})
        }
        return res.status(200).send({isValid:true,message:"User Deleted Successfully",data:deleteUserInDB.data})

    }catch(err){
        console.log(err)
        return res.status(500).send({isValid:false,message:"Something Went Wrong!"})
    }
}

module.exports = {
    createUserController,
    findUsersController,
    updateUserController,
    deleteUserController
}
