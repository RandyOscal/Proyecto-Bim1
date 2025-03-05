import User from "../user/user.model.js"
import Category from "../category/category.model.js"
import Product from "../product/product.model.js"

//Usuarios

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

// Categorias

export const categoryExists = async (categoryName = "") => {
    const existe = await Category.findOne({categoryName})
    if(existe){
        throw new Error(`The category name ${categoryName} is already registered`)
    }
}

export const categoryIDExists = async (cid = " ") => {
    const existe = await Category.findById(cid)
    if(!existe){
        throw new Error("No existe la categoria con el ID proporcionado")
    }
}


//Productos

export const productExists = async (productName = "") => {
    const existe = await Product.findOne({productName})
    if(existe){
        throw new Error(`The product name ${productName} is already registered`)
    }
}

export const productNameExists = async (productName = " ") => {
    const existe = await Product.findOne(productName)
    if(!existe){
        throw new Error("No existe el producto con el nombre proporcionado")
    }
}

export const productIDExists = async (pid = " ") => {
    const existe = await Product.findById(pid)
    if(!existe){
        throw new Error("No existe el producto con el ID proporcionado")
    }
}


