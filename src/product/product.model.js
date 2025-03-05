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
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"],
        default: "SIN_CATEGORIA"
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