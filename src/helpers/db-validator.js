import User from "../user/user.model.js"
import Category from "../category/category.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const roleBlock = (value) => {
    if (value) {
        throw new Error("No puedes ingresar el role ya que se asigna por default");
        
    }
}



export const categoryExists = async (categoryName = "") => {
    const existe = await Category.findOne({categoryName})
    if(existe){
        throw new Error(`The category name ${categoryName} is already registered`)
    }
}

export const categoryIDExists = async (_id = " ") => {
    const existe = await Category.findById(_id)
    if(!existe){
        throw new Error("No existe la categoria con el ID proporcionado")
    }
}


