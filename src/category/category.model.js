import { Schema, model} from "mongoose";

const categorySchema = Schema({
    categoryName:{
        type: String,
        required: [true, "Category is required"]
    },
    description:{
        type: String,
        required: false
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

export default model("Category", categorySchema)