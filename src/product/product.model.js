import { Schema, model} from "mongoose";

const productSchema = Schema({
    productName:{
        type: String,
        required: [true, "The product name is required"],
    },
    description:{
        type: String,
        required: [true, "Description is required"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    stock:{
        type: Number,
        required: [true, "Stock is required"],
    },
    price:{
        type: String,
        required: [true, "Price is required"]
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Producto", productSchema)