
const users = [{name:'sazu',age:21},{name:'tasin',age:12}]

const HandleAllUsers = (req,res) => {
    res.status(200).send({
        messeage: "get all users",
        users
    })
}

export {HandleAllUsers}